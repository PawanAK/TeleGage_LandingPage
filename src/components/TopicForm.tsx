import { useState } from 'react';

export const TopicForm = ({ onSubmit, topics }) => {
  const [formData, setFormData] = useState({
    topicName: '',
    topicDescription: '',
    topicRules: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      topicName: '',
      topicDescription: '',
      topicRules: '',
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Add Topics</h2>
      <div className="overflow-x-auto">
        <table className="w-full mb-4 text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2 text-left">Topic Name</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Rules</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic, index) => (
              <tr key={index} className="border-b border-gray-600">
                <td className="p-2">{topic.topicName}</td>
                <td className="p-2">{topic.topicDescription}</td>
                <td className="p-2">{topic.topicRules}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="topicName" className="block text-sm font-medium text-gray-300 mb-1">
            Topic Name
          </label>
          <input
            type="text"
            name="topicName"
            id="topicName"
            value={formData.topicName}
            onChange={handleChange}
            required
            className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="topicDescription" className="block text-sm font-medium text-gray-300 mb-1">
            Topic Description
          </label>
          <input
            type="text"
            name="topicDescription"
            id="topicDescription"
            value={formData.topicDescription}
            onChange={handleChange}
            required
            className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="topicRules" className="block text-sm font-medium text-gray-300 mb-1">
            Topic Rules
          </label>
          <input
            type="text"
            name="topicRules"
            id="topicRules"
            value={formData.topicRules}
            onChange={handleChange}
            required
            className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
          >
            Add Topic
          </button>
        </div>
      </form>
    </div>
  );
};