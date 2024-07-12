import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import { useNavigate } from 'react-router-dom';
import config from '../config';

const MasterDashboard = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBets, setTotalBets] = useState(0);
    const [userBetAmount, setUserBetAmount] = useState(0);
    const [brokerage, setBrokerage] = useState(0);
    const [profileData, setProfileData] = useState(null);
    const [clients, setClients] = useState([]);
    const { baseURL } = config;
    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('masterAdminToken');
            if (!token) {
                console.error('No token found in local storage');
                setError('User is not authenticated');
                return;
            }

            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.username);
                const response = await fetch(
                    `${baseURL}/api/masteruser/profile/${decodedToken.username}`,
                    requestOptions
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const result = await response.json();
                setProfileData(result); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProfileData();
    }, []);

    useEffect(() => {
        const fetchClientsData = async () => {
            const token = localStorage.getItem('masterAdminToken');
            if (!token) {
                console.error('No token found in local storage');
                setError('User is not authenticated');
                return;
            }

            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            try {
                const response = await fetch(`${baseURL}/api/masteruser/clients/${profileData?.code}`, requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch clients data');
                }
                const result = await response.json();
                setClients(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (profileData) {
            fetchClientsData();
        }
    }, [profileData]);

    const handleLogout = () => {
        localStorage.removeItem('masterAdminToken');
        navigate('/masterlogin');
    };

    const capitalizeFirstLetter = (str) => {
        return str.replace(/\b\w/g, char => char.toUpperCase());
      };
    return (
        <>
            <nav className="bg-gray-800 p-4 flex justify-between items-center">
                <div className="text-white text-xl font-bold">BW Game</div>
                <div className="flex items-center space-x-4">
                    <span className="text-white">Welcome, {username}</span>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-xxl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {profileData ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-teal-800 text-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">Your Code</h3>
                                <p className="text-2xl">{profileData.code}</p>
                            </div>
                            <div className="bg-lime-800 text-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">Your Percentage</h3>
                                <p className="text-2xl">{profileData.percentage}%</p>
                            </div>
                            <div className="bg-yellow-800 text-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">Your Brokarge</h3>
                                <p className="text-2xl">{profileData.brokarge}%</p>
                            </div>
                            <div className="bg-fuchsia-800 text-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">Create Date</h3>
                                <p className="text-2xl">{new Date(profileData.createDate).toLocaleString()}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-700">Loading profile data...</p>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-xxl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold">Total Users</h3>
                            <p className="text-2xl">{totalUsers}</p>
                        </div>
                        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold">Total Bets</h3>
                            <p className="text-2xl">{totalBets}</p>
                        </div>
                        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold">User Bet Amount</h3>
                            <p className="text-2xl">{userBetAmount}</p>
                        </div>
                        <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold">Brokerage</h3>
                            <p className="text-2xl">{brokerage}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Client List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">S.No</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Code</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Budget</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Username</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Create Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Update Date</th>
            </tr>
          </thead>
          <tbody className='text-left'>
            {clients.map((client, index) => (
              <tr key={client._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 capitalize">{index + 1}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 capitalize">{client.code}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 capitalize">₹{client.budget}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 capitalize">{client.status}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 capitalize">{client.username}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 capitalize">{new Date(client.createDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 capitalize">{new Date(client.updateDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </>
    );
};

export default MasterDashboard;
