import React, { useState, useEffect } from 'react';
import TopNavBar from './NavBar';
import BottomNavBar from './BottomNavBar';
import config from '../config';
const CurrentBetsTable = () => {
    const [currentBets, setCurrentBets] = useState([]);
    const { baseURL } = config;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = getUserIdFromToken();
                if (!userId) {
                    console.error('User ID not found in token');
                    return;
                }

                const response = await fetch(`${baseURL}/api/bets/client-bets/${userId}/current`, {
                    method: "GET",
                    redirect: "follow"
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCurrentBets(data.currentBets);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            console.error('No token found in localStorage');
            return null;
        }

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decoded = JSON.parse(atob(base64));
            return decoded.id;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    return (
        <>
            <TopNavBar />
            <div className="container mx-auto py-8 mt-8">
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-600">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Game ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Color</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Game Mode</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentBets.map(bet => (
                                <tr key={bet._id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 whitespace-nowrap">{bet.gameId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{bet.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bet.color === 'Color1' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {bet.color}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{bet.gameMode}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(bet.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <BottomNavBar />
        </>
    );
};

export default CurrentBetsTable;
