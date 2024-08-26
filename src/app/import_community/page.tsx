"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopicForm } from '@/components/TopicForm';

export default function ImportCommunityPage() {
  const [step, setStep] = useState(1);
  const [groupLink, setGroupLink] = useState('');
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  const handleGroupLinkSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleTopicSubmit = (data) => {
    setTopics([...topics, data]);
  };

  const handleFinish = async () => {
    console.log('Group Link:', groupLink);
    console.log('Topics:', topics);
    router.push('/dashboard');
  };

  return (
    <div className="bg-black text-white min-h-screen bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A45EDB_82%)]">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          {step === 1 ? 'Import Your Community' : 'Add Topics'}
        </h1>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          {step === 1 ? (
            <form onSubmit={handleGroupLinkSubmit} className="space-y-6">
              <div>
                <label htmlFor="groupLink" className="block text-sm font-medium text-gray-300 mb-1">
                  Paste Your Group Link
                </label>
                <input
                  type="text"
                  name="groupLink"
                  id="groupLink"
                  value={groupLink}
                  onChange={(e) => setGroupLink(e.target.value)}
                  required
                  className="w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3"
                />
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
          ) : (
            <>
              <TopicForm onSubmit={handleTopicSubmit} topics={topics} />
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleFinish}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 px-6 rounded-lg hover:opacity-90 transition duration-300"
                >
                  Finish
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}