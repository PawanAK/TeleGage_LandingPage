"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopicForm } from '@/components/TopicForm';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaTelegram } from 'react-icons/fa';

export default function ImportCommunityPage() {
  const [step, setStep] = useState(1);
  const [groupLink, setGroupLink] = useState('');
  const [topics, setTopics] = useState<any[]>([]);
  const router = useRouter();

  const handleGroupLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleTopicSubmit = (data: any) => {
    setTopics([...topics, data]);
  };

  const handleTopicRemove = (index: number) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const handleFinish = async () => {
    console.log('Group Link:', groupLink);
    console.log('Topics:', topics);
    router.push('/dashboard');
  };

  const progressPercentage = step === 1 ? 50 : 100;

  return (
    <div className="bg-black text-white min-h-screen bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A45EDB_82%)]">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full mb-8"
        />
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
        >
          {step === 1 ? 'Import Your Community' : 'Add Topics'}
        </motion.h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
          >
            {step === 1 ? (
              <form onSubmit={handleGroupLinkSubmit} className="space-y-6">
                <div>
                  <label htmlFor="groupLink" className="block text-lg font-semibold text-indigo-300 mb-2">
                    <FaTelegram className="inline-block mr-2" />
                    Paste Your Group Link
                  </label>
                  <input
                    type="text"
                    name="groupLink"
                    id="groupLink"
                    value={groupLink}
                    onChange={(e) => setGroupLink(e.target.value)}
                    required
                    className="w-full rounded-md bg-gray-800 border-2 border-indigo-500 text-white shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500 p-4 text-lg transition-all duration-300"
                    placeholder="https://t.me/your_group_link"
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-lg hover:opacity-90 transition-all duration-300 text-xl font-bold shadow-lg"
                  >
                    Next
                  </button>
                </motion.div>
              </form>
            ) : (
              <>
                <TopicForm onSubmit={handleTopicSubmit} topics={topics} onRemove={handleTopicRemove} />
                <div className="mt-8 flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStep(1)}
                    className="flex items-center bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    <FaArrowLeft className="mr-2" />
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFinish}
                    className="flex items-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 px-6 rounded-lg hover:opacity-90 transition duration-300"
                  >
                    Finish
                    <FaCheck className="ml-2" />
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}