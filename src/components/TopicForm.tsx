import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHashtag, FaInfoCircle, FaList, FaPlus, FaTimes } from 'react-icons/fa';

interface Topic {
  topicName: string;
  topicDescription: string;
  topicRules: string;
}

export const TopicForm = ({ onSubmit, topics }: { onSubmit: (data: Topic) => void, topics: Topic[] }) => {
  const [formData, setFormData] = useState<Topic>({
    topicName: '',
    topicDescription: '',
    topicRules: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      topicName: '',
      topicDescription: '',
      topicRules: '',
    });
  };

  return (
    <div className="space-y-8">
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="topicName" className="block text-lg font-semibold text-indigo-300 mb-2">
              <FaHashtag className="inline-block mr-2" />
              Topic Name
            </label>
            <input
              type="text"
              name="topicName"
              id="topicName"
              value={formData.topicName}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-800 border-2 border-indigo-500 text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-4 text-lg transition-all duration-300"
              placeholder="Enter topic name"
            />
          </div>
          <div>
            <label htmlFor="topicDescription" className="block text-lg font-semibold text-indigo-300 mb-2">
              <FaInfoCircle className="inline-block mr-2" />
              Description
            </label>
            <input
              type="text"
              name="topicDescription"
              id="topicDescription"
              value={formData.topicDescription}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-800 border-2 border-indigo-500 text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-4 text-lg transition-all duration-300"
              placeholder="Brief description"
            />
          </div>
          <div>
            <label htmlFor="topicRules" className="block text-lg font-semibold text-indigo-300 mb-2">
              <FaList className="inline-block mr-2" />
              Rules
            </label>
            <input
              type="text"
              name="topicRules"
              id="topicRules"
              value={formData.topicRules}
              onChange={handleChange}
              required
              className="w-full rounded-md bg-gray-800 border-2 border-indigo-500 text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-4 text-lg transition-all duration-300"
              placeholder="Topic rules"
            />
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 text-xl font-bold shadow-lg flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Add Topic
          </button>
        </motion.div>
      </motion.form>

      {topics.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-indigo-300 mb-4">Added Topics</h3>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-left text-indigo-300">Topic Name</th>
                  <th className="px-4 py-2 text-left text-indigo-300">Description</th>
                  <th className="px-4 py-2 text-left text-indigo-300">Rules</th>
                  <th className="px-4 py-2 text-left text-indigo-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {topics.map((topic, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-gray-700"
                    >
                      <td className="px-4 py-2 text-white">{topic.topicName}</td>
                      <td className="px-4 py-2 text-white">{topic.topicDescription}</td>
                      <td className="px-4 py-2 text-white">{topic.topicRules}</td>
                      <td className="px-4 py-2">
                        <button className="text-red-500 hover:text-red-600 transition-colors duration-300">
                          <FaTimes />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};