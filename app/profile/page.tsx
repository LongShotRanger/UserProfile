'use client';

import { z } from 'zod';
import { useState, useEffect, useRef } from 'react';
import { userProfile, rentalHistory } from '../../lib/mockData';
import ChangePassword from '../profile/ChangePassword';
import { useDarkMode } from '../context/DarkModeContext';


const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  bio: z.string().optional(),
  profile_photo: z.string().url().optional(),
  settings: z.object({
    dark_mode: z.boolean(),
    email_notifications: z.boolean(),
  }),
});



export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(userProfile);
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData | string, string>>>({});
  const { darkMode, toggleDarkMode} = useDarkMode();

  // Sync dark mode state from context and localStorage into formData.settings.dark_mode
  useEffect(() => {
    const saved = localStorage.getItem('dark_mode');
    if (saved !== null) {
      setFormData((prev) => ({
        ...prev,
        settings: { ...prev.settings, dark_mode: darkMode },
      }));
    }
  }, []);

  // Update localStorage and document class on dark_mode changes
  useEffect(() => {
    localStorage.setItem('dark_mode', formData.settings.dark_mode.toString());
    
    if (formData.settings.dark_mode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [formData.settings.dark_mode]);

  const handleSave = () => {
    const result = profileSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(({ path, message }) => {
        const key = path.join('.');
        fieldErrors[key] = message;
      });
      setErrors(fieldErrors);
      return; // stop save if errors
    }

    setErrors({});
    setUser(formData);
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    if (name.includes('.')) {
      const keys = name.split('.');
      setFormData(prev => {
        const copy = { ...prev };
        let obj = copy;
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = type === 'checkbox' ? checked : value;
        return copy;
      });
      setErrors(prev => ({ ...prev, [name]: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancel = () => {
    setFormData(user); // resets form
    setEditMode(false);
  };

  const fullNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && fullNameInputRef.current) {
      fullNameInputRef.current.focus();
    }
  }, [editMode]);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 shadow rounded text-gray-900 dark:text-gray-100 space-y-10">
      {/* Personal Information Section */}
      <section className="border rounded p-6">
        <div className="border-b border-gray-300 dark:border-gray-700 mb-4 pb-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold dark:border-gray-700 pb-2 leading-tight">Personal <br className="block sm:hidden" /> Information</h2>
            {editMode ? (
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 mt-4  max-w-sm">
                <button
                  onClick={handleSave}
                  className="w-full sm:flex-1 sm:w-auto max-w-[180px] bg-ihYellow text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full sm:flex-1 sm:w-auto max-w-[180px] bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-ihYellow text-white px-4 py-2 rounded hover:bg-ihYellowDark  transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ProfilePhotoWithEdit
            photoUrl={formData.profile_photo}
            onPhotoChange={(newUrl) => setFormData((prev) => ({ ...prev, profile_photo: newUrl }))}
            editMode={editMode}
          />
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.full_name}
              inputRef={fullNameInputRef}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              error={errors.email}
            />
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.phone}
            />
            <TextAreaField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!editMode}
              error={errors.bio}
            />
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="border rounded p-6">
        {/* <h2 className="text-2xl font-semibold mb-4">Preferences</h2> */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Preferences</h2>

        <div className="flex flex-col sm:flex-row gap-6">
          <Toggle
            label="Dark Mode"
            checked={darkMode}
            onChange={toggleDarkMode}
            disabled={false}
          />
          <Toggle
            label="Email Notifications"
            checked={formData.settings.email_notifications}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                settings: { ...prev.settings, email_notifications: !prev.settings.email_notifications },
              }))
            }
            disabled={false}  // always enabled
          />
        </div>
      </section>

      {/* Change Password Section */}
      <section className="border rounded p-6">
        <ChangePassword />
      </section>

      {/* Rental History Section */}
      <section className="border rounded p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Rental History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="text-left px-4 py-2 border-b border-gray-300 dark:border-gray-700">Order ID</th>
                <th className="text-left px-4 py-2 border-b border-gray-300 dark:border-gray-700">Items</th>
                <th className="text-left px-4 py-2 border-b border-gray-300 dark:border-gray-700">Dates</th>
                <th className="text-right px-4 py-2 border-b border-gray-300 dark:border-gray-700">Price (₹)</th>
                <th className="text-left px-4 py-2 border-b border-gray-300 dark:border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {rentalHistory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No rental history found.
                  </td>
                </tr>
              ) : (
                rentalHistory.map(({ order_id, items, rental_start_date, rental_end_date, total_price, status }) => (
                  <tr
                    key={order_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">{order_id}</td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                      {items.map(({ name, quantity }) => (
                        <div key={name}>
                          {name} × {quantity}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                      {new Date(rental_start_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })} -{' '}
                      {new Date(rental_end_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700 text-right">{total_price}</td>
                    <td className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                      <StatusBadge status={status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function InputField({ label, name, value, onChange, disabled, error, inputRef }: any) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        ref={inputRef}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, disabled, error }: any) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mt-1 p-2 border rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ${
          error ? 'border-red-500' : ''
        }`}
        rows={3}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}


function Toggle({ label, checked, onChange, disabled }: any) {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="toggle-checkbox h-5 w-5 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-blue-600"
      />
      <span className="text-sm select-none">{label}</span>
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  let bgColor = "bg-gray-300 text-gray-800";

  if (status === "Confirmed") bgColor = "bg-blue-500 text-white";
  else if (status === "Cancelled") bgColor = "bg-red-500 text-white";
  else if (status === "Completed") bgColor = "bg-green-500 text-white";

  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${bgColor}`}
    >
      {status}
    </span>
  );
}

function ProfilePhotoWithEdit({
  photoUrl,
  onPhotoChange,
  editMode,
}: {
  photoUrl: string;
  onPhotoChange: (newUrl: string) => void;
  editMode: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showNote, setShowNote] = useState(false);

  function onEditClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setShowNote(true);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Please upload JPG or PNG files only.');
        e.target.value = '';
        return;
      }
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB.');
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
        setShowNote(false);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="inline-block w-28">
      <div className="relative">
        <img
          src={photoUrl}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />
        {editMode && (
          <button
            onClick={onEditClick}
            className="absolute bottom-1 right-1 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 focus:outline-none"
            aria-label="Edit profile photo"
            title="Edit Photo"
            type="button"
          >
            ✎
          </button>
        )}
      </div>
      {showNote && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          JPG or PNG. Max 1MB
        </p>
      )}
      <input
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        ref={fileInputRef}
        onChange={onFileChange}
      />
    </div>
  );
}