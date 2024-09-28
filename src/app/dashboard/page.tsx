"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImg from '../../assets/images/logosaas.png';
import { motion } from 'framer-motion';

interface Community {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  messageCount: number;
}

interface Stats {
  number_of_messages: number;
  number_of_nfts_minted: number;
  points_earned: number;
  community_id: number;
}
  


const CommunityStats = ({ stats }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Community Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white/70">Number of Messages</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">{stats.number_of_messages}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white/70">NFTs Minted</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">{stats.number_of_nfts_minted}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white/70">Points Earned</h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">{stats.points_earned}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white/70">Community ID</h3>
          <p className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">{stats.community_id}</p>
        </div>
      </div>
    </div>
  );
};

const CommunityInfo = ({ community }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        {community.community_name}
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white/70">Community ID</h3>
          <p className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            {community.community_id}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white/70">Total Members</h3>
          <p className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            {community.users.length}
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white/70">Community Description</h3>
        <p className="text-white/70">{community.community_description}</p>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [username, setUsername] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [hasCommunity, setHasCommunity] = useState(false);
  const [communityStats, setCommunityStats] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth');
    } else {
      const { username, has_community } = JSON.parse(user);
      console.log("User data:", user);
      console.log("Username:", username);
      console.log("Has community:", has_community);
      setUsername(username);
      setHasCommunity(has_community);

      // Fetch user's communities and stats
      fetchCommunities();
    }
  }, [router]);

  const fetchCommunities = async () => {
    try {
      const { walletAddress } = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch('http://localhost:3001/api/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress}),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Response of communities:", data);
      
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setCommunities(data);
        setHasCommunity(data.length > 0);
        if (data.length > 0) {
          fetchCommunityStats(data[0].id);
        }
      } else {
        console.error('Fetched communities data is not an array:', data);
        setCommunities([]);
        setHasCommunity(false);
      }
    } catch (error) {
      console.error('Error fetching communities:', error);
      setCommunities([]);
      setHasCommunity(false);
    }
  };

  const fetchCommunityStats = async (communityId: number) => {
    try {
      const { walletAddress } = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch('http://localhost:3001/api/community-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress, communityId }),
      });
      const data = await response.json();
      setCommunityStats(data.Stats);
    } catch (error) {
      console.error('Error fetching community stats:', error);
    }
  };

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            Welcome to Your Dashboard
          </h2>
          {!hasCommunity && (
            <div className="flex justify-center space-x-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/create_community')}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-300"
              >
                Create Your Community
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/import_community')}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition duration-300"
              >
                Import Your Community
              </motion.button>
            </div>
          )}
          
          {hasCommunity ? (
            communities.length > 0 ? (
              communities.map((community) => (
                <motion.div
                  key={community._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-8"
                >
                  <CommunityInfo community={community} />
                  {communityStats && <CommunityStats stats={communityStats} />}
                </motion.div>
              ))
            ) : (
              <p className="text-center text-xl">Loading communities...</p>
            )
          ) : (
            <p className="text-center text-xl">You haven&apos;t created or imported any communities yet.</p>
          )}
        </motion.div>
      </main>
    </div>
  );
}