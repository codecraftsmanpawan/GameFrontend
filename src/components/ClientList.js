import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'; // Importing icons from react-icons
import config from '../config';
const ClientList = () => {
  const { baseURL } = config;
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${baseURL}/api/client`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setClients(result);
        setFilteredClients(result);
      })
      .catch((error) => setError(error));
  }, []);

  useEffect(() => {
    setFilteredClients(
      clients.filter(
        (client) =>
          client.username.toLowerCase().includes(search.toLowerCase()) ||
          client.code.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, clients]);

  const handleView = (id) => {
    console.log(`View client with ID: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit client with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete client with ID: ${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-white">Client List</h1>
        <p className="text-gray-400">Manage your clients effectively</p>
      </header>
      <div className="max-w-4xl w-full mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        {error && <div className="text-red-500">Error: {error.message}</div>}
        <input
          type="text"
          placeholder="Search by username or code"
          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden"
        >
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Master Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Create Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, index) => (
              <motion.tr
                key={client._id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-gray-200"
              >
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider flex items-center">
                  {index + 1}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {client.code}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {client.budget}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {client.masterCode}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {client.status}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {client.username}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {new Date(client.createDate).toLocaleString()}
                </td>
                <td className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider flex items-center space-x-2">
                  <button
                    onClick={() => handleView(client._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <AiOutlineEye />
                  </button>
                  <button
                    onClick={() => handleEdit(client._id)}
                    className="text-yellow-500   hover:text-yellow-700"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default ClientList;
