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
    <div>
      {topics.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-white">Existing Topics</h3>
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-gray-600">
                  <th className="p-3 text-left">Topic Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Rules</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic, index) => (
                  <tr key={index} className="border-b border-gray-500">
                    <td className="p-3">{topic.topicName}</td>
                    <td className="p-3">{topic.topicDescription}</td>
                    <td className="p-3">{topic.topicRules}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
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
            className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
          />
        </div>
        <div>
          <label htmlFor="topicRules" className="block text-sm font-medium text-gray-300 mb-1">
            Topic Rules
          </label>
          <textarea
            name="topicRules"
            id="topicRules"
            value={formData.topicRules}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 text-lg font-semibold"
          >
            Add Topic
          </button>
        </div>
      </form>
    </div>
  );
};