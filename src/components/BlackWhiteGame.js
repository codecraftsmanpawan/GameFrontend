import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import config from '../config';
const BlackWhiteGame = () => {
  const { baseURL } = config;
  
  const [gameDetails, setGameDetails] = useState([]);
  const [error, setError] = useState(null);
  const [countdownDisplay, setCountdownDisplay] = useState('');
  const [timeLeft, setTimeLeft] = useState(0); // State to store remaining time
  const [autoResult, setAutoResult] = useState(true); // State to toggle auto/manual result setting
  const [isToggleActive, setIsToggleActive] = useState(false); // State to track toggle button activation

  const colors = {
    "Black": "#000000", // Black
    "White": "#FFFFFF"  // White
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError(new Error('Token not found'));
      return;
    }

    const fetchGameDetails = () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(`${baseURL}/admin/set-winner/admin/ongoing-game-details`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(result => {
          if (!Array.isArray(result)) {
            throw new Error('API response is not an array');
          }
          const filteredDetails = result.filter(game => game.mode === "blackWhite");
          setGameDetails(filteredDetails);
        })
        .catch(error => setError(error));
    };

    fetchGameDetails(); // Initial fetch

    const interval = setInterval(fetchGameDetails, 1000); // Refresh every second

    return () => clearInterval(interval); // Cleanup interval on unmount or re-render
  }, []);

  useEffect(() => {
    if (gameDetails.length > 0) {
      const currentGame = gameDetails[0];
      const { startTime } = currentGame;
      const startTimestamp = new Date(startTime).getTime() / 1000;
      const nowTimestamp = new Date().getTime() / 1000;
      const secondsPassed = nowTimestamp - startTimestamp;
      const remainingSeconds = 120 - secondsPassed;

      setTimeLeft(remainingSeconds); // Set remaining time
      setIsToggleActive(remainingSeconds <= 30); // Activate toggle button in the last 30 seconds

      const timer = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1); // Decrease time every second
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameDetails]);

  useEffect(() => {
    // Update countdown display
    setCountdownDisplay(formatCountdown(timeLeft));
  }, [timeLeft]);

  const formatCountdown = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60); // Round seconds to nearest whole number

    // Format the countdown display
    const minDisplay = minutes > 0 ? `${minutes} min` : '';
    const secDisplay = `${remainingSeconds} sec`;

    return `${minDisplay} ${secDisplay}`;
  };

  const handleToggleResultSetting = () => {
    if (isToggleActive) {
      setAutoResult(!autoResult);
    }
  };

  const handleSetWinner = (color) => {
    if (!autoResult) {
      // Call your API to set the winner here
      const token = localStorage.getItem('token');
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ gameId: currentGame.gameId, winner: color }),
        redirect: "follow"
      };

      fetch(`${baseURL}/admin/set-winner`, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to set winner');
          }
          return response.json();
        })
        .then(result => {
          console.log('Winner set successfully', result);
        })
        .catch(error => setError(error));
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (gameDetails.length === 0) {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-2xl mx-auto my-6 flex justify-center items-center">
        Loading...
        <div className="animate-spin text-5xl">
          ⏳
        </div>
      </div>
    );
  }

  const currentGame = gameDetails[0]; // Assuming only one game is relevant

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-2xl mx-auto my-6">
  <h2 className="text-xl">
  <strong
    style={{
      backgroundColor: currentGame.winnerColor,
      padding: '0.5rem',
      color: currentGame.winnerColor === 'Black' ? 'white' : 'initial'
    }}
  >
    Current Winner: {currentGame.winnerColor}
  </strong>
</h2>

      <div className="flex justify-between mb-2 mt-4">
        <h2 className="text-xl"><strong>Game ID: {currentGame.gameId}</strong></h2>
        <h2 className="text-xl"><strong>Countdown: {countdownDisplay}</strong></h2>
        <button
          onClick={handleToggleResultSetting}
          className={`px-4 py-2 ${isToggleActive ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded-full`}
          disabled={!isToggleActive}
        >
          Switch to {autoResult ? 'Manual' : 'Automatic'}
        </button>
      </div>
      <table className="min-w-full bg-gray-700 mb-4 mt-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Color</th>
            <th className="py-2 px-4 border-b">Total Bet User</th>
            <th className="py-2 px-4 border-b">Total Bet Amount</th>
            <th className="py-2 px-4 border-b">After calculation Bet Amount</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {Object.keys(colors).map((color) => {
            const detail = currentGame.details.find(d => d.color === color) || {};
            const textColor = color === "Black" ? "white" : "black";
            const isActionDisabled = timeLeft > 30 || autoResult; // Disable action if more than 30 seconds left or in auto mode

            const totalBetAmount = detail.clients
              ? detail.clients.reduce((acc, client) => acc + client.betAmount, 0)
              : 0;


            return (
              <tr key={color}>
                <td className="py-2 px-4 border-b" style={{ backgroundColor: colors[color], color: textColor }}>{color}</td>
                <td className="py-2 px-4 border-b">{detail.totalUsers || 0}</td>
                <td className="py-2 px-4 border-b">{totalBetAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{detail.totalFinalAmount || 0}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleSetWinner(color)}
                    className={`px-4 py-2 rounded-full ${color === "Black" ? "text-white" : "text-black"}`}
                    style={{
                      backgroundColor: isActionDisabled ? "red" : colors[color],
                      color: isActionDisabled ? "white" : (color === "Black" ? "white" : "black")
                    }}
                    disabled={isActionDisabled}
                  >
                    Action
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BlackWhiteGame;
