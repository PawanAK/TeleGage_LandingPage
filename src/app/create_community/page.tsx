"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommunityForm } from '@/components/CommunityForm';
import { TopicForm } from '@/components/TopicForm';

export default function CreateCommunityPage() {
  const [step, setStep] = useState(1);
  const [communityData, setCommunityData] = useState({});
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  const handleCommunitySubmit = (data) => {
    setCommunityData(data);
    setStep(2);
  };

  const handleTopicSubmit = (data) => {
    setTopics([...topics, data]);
  };

  const handleFinish = async () => {
    console.log('Community Data:', communityData);
    console.log('Topics:', topics);
    router.push('/dashboard');
  };

  return (
    <div className="bg-black text-white min-h-screen bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A45EDB_82%)]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Create Your Community
        </h1>
        {step === 1 ? (
          <CommunityForm onSubmit={handleCommunitySubmit} />
        ) : (
          <>
            <TopicForm onSubmit={handleTopicSubmit} topics={topics} />
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
              >
                Finish
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}