"use client";
import { useState, useEffect } from 'react';
import { Communities } from '@/components/Communities';
import { useRouter } from 'next/navigation';

const DashboardSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Total Communities</h3>
        <p className="text-3xl font-bold">4</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Total Members</h3>
        <p className="text-3xl font-bold">11,500</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Total Messages</h3>
        <p className="text-3xl font-bold">380,000</p>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth');
    } else {
      setUsername(JSON.parse(user).username);
    }
  }, [router]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TeleGage Dashboard</h1>
          <div>
            <span className="mr-4">Welcome, {username}</span>
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/auth');
              }}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <DashboardSummary />
        <Communities />
      </main>
    </div>
  );
}