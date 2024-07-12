import React, { useState } from 'react';

const PasswordChangePopup = ({ closePopup }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        // Implement password change logic here
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        // Assume API call is successful
        alert('Password changed successfully');
        closePopup();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Old Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleChangePassword}
                        className="bg-indigo-600 text-white py-2 px-4 rounded shadow hover:bg-indigo-700 transition duration-200"
                    >
                        Change Password
                    </button>
                    <button
                        onClick={closePopup}
                        className="bg-gray-600 text-white py-2 px-4 rounded shadow hover:bg-gray-700 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordChangePopup;
