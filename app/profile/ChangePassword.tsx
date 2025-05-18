'use client';

import { useState } from 'react';

export default function ChangePassword() {
  const [editMode, setEditMode] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

    if (currentPassword == newPassword) {
      setErrorMsg('Current password and New passwords cannot be same');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setErrorMsg('Password must be at least 6 characters and contain at least one special character.');
      return;
    }

    // Simulate password update
    setEditMode(false);
    setSuccessMsg('Password updated successfully!');
    setErrorMsg('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCancel = () => {
    setEditMode(false);
    setErrorMsg('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-900 p-6 rounded shadow">
      <div className="border-b border-gray-300 dark:border-gray-700 mb-4 pb-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Change Password</h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="text-sm text-ihYellow font-medium hover:underline"
            >
              Edit
            </button>
          )}
        </div>
      </div>    
      {successMsg && (
        <div className="text-green-600 text-sm mb-4">{successMsg}</div>
      )}
      {errorMsg && (
        <div className="text-red-600 text-sm mb-4">{errorMsg}</div>
      )}

      {editMode && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition dark:bg-gray-700 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-ihYellow text-white px-4 py-2 rounded hover:bg-ihYellowDark transition"
            >
              Update Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
