import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const GameLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { baseURL } = config;
    const validateForm = () => {
        let formIsValid = true;
        const newErrors = { username: '', password: '' };

        if (!username) {
            newErrors.username = 'Username is required';
            formIsValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "username": username,
                "password": password
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${baseURL}/api/client/login`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Login failed');
                    }
                    return response.json();
                })
                .then(result => {
                    localStorage.setItem('userToken', result.token);
                    navigate('/gameplay');
                })
                .catch(error => setLoginError(error.toString()));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="bg-white rounded-full p-3 shadow-lg animate-bounce">
                        <LockClosedIcon className="h-12 w-12 text-indigo-600" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Game Login</h2>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform transition-transform duration-300 hover:scale-105"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username && (
                                    <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transform transition-transform duration-300 hover:scale-105"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        {loginError && (
                            <div className="text-red-600 text-sm">
                                {loginError}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-transform duration-300 hover:scale-105"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GameLogin;
