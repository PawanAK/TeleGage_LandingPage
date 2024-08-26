"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImg from '../../assets/images/logosaas.png';

const DashboardSummary = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-white/70">Total Members</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">5,000</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-white/70">Active Users</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">1,200</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-white/70">Total Messages</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">150,000</p>
      </div>
    </div>
  );
};

const CommunityStats = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Community Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white/70">Top Contributors</h3>
          <ul className="space-y-2">
            <li className="text-white">@user1 - 500 Points</li>
            <li className="text-white">@user2 - 450 Points</li>
            <li className="text-white">@user3 - 400 Points</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white/70">Recent Moderation Actions</h3>
          <ul className="space-y-2">
            <li className="text-white">Removed spam message</li>
            <li className="text-white">Muted @spammer for 24 hours</li>
            <li className="text-white">Deleted off-topic thread</li>
          </ul>
        </div>
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
    <div className="bg-black text-white min-h-screen bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A45EDB_82%)]">
      <header className="bg-gray-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image src={logoImg} alt="TeleGage Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold ml-2">TeleGage Dashboard</h1>
          </div>
          <div>
            <span className="mr-4">Welcome, {username}</span>
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/auth');
              }}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8 px-4">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => router.push('/create_community')}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-300"
          >
            Create Your Community
          </button>
          <button
            onClick={() => router.push('/import_community')}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-300"
          >
            Import Your Community
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">Crypto Enthusiasts Community</h2>
        <DashboardSummary />
        <CommunityStats />
      </main>
    </div>
  );
}