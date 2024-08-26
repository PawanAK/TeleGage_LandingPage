import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaTelegram, FaUsers, FaInfoCircle } from 'react-icons/fa';

interface FormData {
  telegramUsername: string;
  communityName: string;
  communityDescription: string;
}

interface CommunityFormProps {
  onSubmit: (data: FormData) => void;
}

export const CommunityForm = ({ onSubmit }: CommunityFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    telegramUsername: '',
    communityName: '',
    communityDescription: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="telegramUsername" className="block text-lg font-semibold text-indigo-300 mb-2">
          <FaTelegram className="inline-block mr-2" />
          Your Telegram Username
        </label>
        <input
          type="text"
          name="telegramUsername"
          id="telegramUsername"
          value={formData.telegramUsername}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-gray-800 border-2 border-indigo-500 text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-4 text-lg transition-all duration-300"
          placeholder="@yourusername"
        />
      </div>
      <div>
        <label htmlFor="communityName" className="block text-lg font-semibold text-indigo-300 mb-2">
          <FaUsers className="inline-block mr-2" />
          Community Name
        </label>
        <input
          type="text"
          name="communityName"
          id="communityName"
          value={formData.communityName}
          onChange={handleChange}
          required
          className="w-full rounded-md bg-gray-800 border-2 border-indigo-500 text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-4 text-lg transition-all duration-300"
          placeholder="Enter your community name"
        />
      </div>
      <div>
        <label htmlFor="communityDescription" className="block text-lg font-semibold text-indigo-300 mb-2">
          <FaInfoCircle className="inline-block mr-2" />
          Community Description
        </label>
        <textarea
          name="communityDescription"
          id="communityDescription"
          value={formData.communityDescription}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-md bg-gray-800 border-2 border-indigo-500 text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-4 text-lg transition-all duration-300"
          placeholder="Describe your community..."
        ></textarea>
        <p className="text-sm text-gray-400 mt-2">
          {formData.communityDescription.length}/500 characters
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 text-xl font-bold shadow-lg"
        >
          Create Community
        </button>
      </motion.div>
    </motion.form>
  );
};