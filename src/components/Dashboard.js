import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGamepad, faUserCheck, faUserClock } from '@fortawesome/free-solid-svg-icons';
import 'chart.js/auto';
import 'animate.css';
import config from '../config'; 

const Dashboard = () => {
  const { baseURL } = config;
  // Mock data (replace with actual data retrieval logic)
  const totalMasterUsers = 10;
  const totalUsers = 100;
  const totalGames = 50;
  const totalActiveGames = 30;
  const totalInactiveGames = 20;
  const totalPendingUsers = 5;

  // Data for the line chart
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total Users',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Total Games',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
      },
    ],
  };

  // Data for the pie chart
  const pieChartData = {
    labels: ['Master Users', 'Users', 'Active Games', 'Inactive Games', 'Pending Users'],
    datasets: [
      {
        label: 'Distribution',
        data: [totalMasterUsers, totalUsers, totalActiveGames, totalInactiveGames, totalPendingUsers],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-r from-gray-800 to-gray-800 p-4 mt-16 overflow-hidden">
      <div className="w-full max-w-screen-xll bg-gray-900 text-white rounded-lg shadow-lg p-8 animate__animated animate__fadeInDown overflow-hidden">
        {/* <h2 className="text-4xl font-bold text-center text-blue-400 mb-8 animate__animated animate__bounceInDown">Dashboard</h2> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Master Users */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 animate__animated animate__fadeInLeft overflow-hidden">
            <div className="flex items-center justify-center text-3xl text-blue-400 mb-2">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3 className="text-xl font-semibold text-center text-blue-400 mb-2">Total Master Users</h3>
            <p className="text-4xl font-bold text-center text-white">{totalMasterUsers}</p>
          </div>

          {/* Total Users */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 animate__animated animate__fadeInRight overflow-hidden">
            <div className="flex items-center justify-center text-3xl text-blue-400 mb-2">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3 className="text-xl font-semibold text-center text-blue-400 mb-2">Total Users</h3>
            <p className="text-4xl font-bold text-center text-white">{totalUsers}</p>
          </div>

          {/* Total Games */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 animate__animated animate__fadeInLeft overflow-hidden">
            <div className="flex items-center justify-center text-3xl text-blue-400 mb-2">
              <FontAwesomeIcon icon={faGamepad} />
            </div>
            <h3 className="text-xl font-semibold text-center text-blue-400 mb-2">Total Games</h3>
            <p className="text-4xl font-bold text-center text-white">{totalGames}</p>
          </div>

          {/* Total Active Games */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 animate__animated animate__fadeInRight overflow-hidden">
            <div className="flex items-center justify-center text-3xl text-blue-400 mb-2">
              <FontAwesomeIcon icon={faGamepad} />
            </div>
            <h3 className="text-xl font-semibold text-center text-blue-400 mb-2">Total Active Games</h3>
            <p className="text-4xl font-bold text-center text-white">{totalActiveGames}</p>
          </div>

          {/* Total Inactive Games */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 animate__animated animate__fadeInLeft overflow-hidden">
            <div className="flex items-center justify-center text-3xl text-blue-400 mb-2">
              <FontAwesomeIcon icon={faGamepad} />
            </div>
            <h3 className="text-xl font-semibold text-center text-blue-400 mb-2">Total Inactive Games</h3>
            <p className="text-4xl font-bold text-center text-white">{totalInactiveGames}</p>
          </div>

          {/* Total Pending Users */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 animate__animated animate__fadeInRight overflow-hidden">
            <div className="flex items-center justify-center text-3xl text-blue-400 mb-2">
              <FontAwesomeIcon icon={faUserClock} />
            </div>
            <h3 className="text-xl font-semibold text-center text-blue-400 mb-2">Total Pending Users</h3>
            <p className="text-4xl font-bold text-center text-white">{totalPendingUsers}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 animate__animated animate__fadeInUp overflow-hidden">
            <h3 className="text-2xl font-bold text-center text-blue-400 mb-4">User and Game Trends</h3>
            <Line data={lineChartData} />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 animate__animated animate__fadeInUp overflow-hidden">
            <h3 className="text-2xl font-bold text-center text-blue-400 mb-4">Distribution of Users and Games</h3>
            <Pie data={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
