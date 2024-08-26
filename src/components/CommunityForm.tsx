import { useState } from 'react';

export const CommunityForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    telegramUsername: '',
    communityName: '',
    communityDescription: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="telegramUsername" className="block text-sm font-medium text-gray-300 mb-1">
          Your Telegram Username
        </label>
        <input
          type="text"
          name="telegramUsername"
          id="telegramUsername"
          value={formData.telegramUsername}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        />
      </div>
      <div>
        <label htmlFor="communityName" className="block text-sm font-medium text-gray-300 mb-1">
          Community Name
        </label>
        <input
          type="text"
          name="communityName"
          id="communityName"
          value={formData.communityName}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        />
      </div>
      <div>
        <label htmlFor="communityDescription" className="block text-sm font-medium text-gray-300 mb-1">
          Community Description
        </label>
        <textarea
          name="communityDescription"
          id="communityDescription"
          value={formData.communityDescription}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 text-lg font-semibold"
        >
          Next
        </button>
      </div>
    </form>
  );
};