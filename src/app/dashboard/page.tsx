"use client";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logoImg from '../../assets/images/logosaas.png';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, LogOut, MessageSquare, Award, Zap, Users, Activity, User, Heart, Wallet, Copy, CodeSquare, ImageIcon, Minus, Plus } from 'lucide-react';
import NFTPackForm  from '@/components/NFTPackForm';
import AddNFTPackModal from '@/components/AddNFTPackModal';
import NFTPacksDisplay from '@/components/NFTPacksDisplay';
import { format, parseISO } from 'date-fns';
import React from 'react';

interface Community {
  _id: string;
  community_id: string;
  community_name: string;
  community_description: string;
  users: any[];
  title: string;  // Add this line
  memberCount: number;  // Add this line if it's used in the Communities component
}

interface Stats {
  number_of_messages: string;
  number_of_nfts_minted: string;
  points_earned: string;
  actions: Array<{
    message: string;
    timestamp: string;
    username: string;
  }>;
  users_to_be_kicked_out: string[];
}

interface ChartDataPoint {
  timestamp: Date;
  points: number;
}

const mockChartData = [
  { name: 'Jan', messages: 400, points: 240, nfts: 20 },
  { name: 'Feb', messages: 300, points: 139, nfts: 15 },
  { name: 'Mar', messages: 200, points: 980, nfts: 30 },
  { name: 'Apr', messages: 278, points: 390, nfts: 25 },
  { name: 'May', messages: 189, points: 480, nfts: 18 },
  { name: 'Jun', messages: 239, points: 380, nfts: 22 },
];


const CommunityStats = ({ stats }: { stats: Stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
      <MessageSquare className="text-pink-500 w-8 h-8 mr-4" />
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white/70">Messages</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">{stats.number_of_messages}</p>
      </div>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
      <Award className="text-purple-500 w-8 h-8 mr-4" />
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white/70">NFTs Minted</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">{stats.number_of_nfts_minted}</p>
      </div>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
      <Zap className="text-indigo-500 w-8 h-8 mr-4" />
      <div>
        <h3 className="text-lg font-semibold mb-2 text-white/70">Points Earned</h3>
        <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">{stats.points_earned}</p>
      </div>
    </div>
  </div>
);

const CommunityInfo = ({ community }: { community: Community }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 hover:shadow-xl transition-shadow duration-300">
    <div className="flex flex-row justify-center items-center mb-4">
      <h2 className="text-2xl font-bold text-white mr-4">Community Name:</h2>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
        {community.community_name}
      </h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-gray-700 p-4 rounded-lg flex items-center">
        <Activity className="text-pink-500 w-8 h-8 mr-4" />
        <div>
          <h3 className="text-lg font-semibold mb-1 text-white/80">Community ID</h3>
          <p className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            {community.community_id}
          </p>
        </div>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg flex items-center">
        <Users className="text-purple-500 w-8 h-8 mr-4" />
        <div>
          <h3 className="text-lg font-semibold mb-1 text-white/80">Total Members</h3>
          <p className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            {community.users.length}
          </p>
        </div>
      </div>
    </div>
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-white/80">Description </h3>
      <p className="text-white/80 leading-relaxed">{community.community_description}</p>
    </div>
  </div>
);


const ActivityChart = ({ actions }: { actions: Stats['actions'] }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const processedData = actions.reduce((acc: ChartDataPoint[], action) => {
      const timestamp = parseISO(action.timestamp);
      let pointChange = 0;

      if (action.message.includes('awarded')) {
        pointChange = parseInt(action.message.match(/\d+/)?.[0] || '0', 10);
      } else if (action.message.includes('deducted')) {
        pointChange = -parseInt(action.message.match(/\d+/)?.[0] || '0', 10);
      }

      const lastPoint = acc[acc.length - 1]?.points || 0;
      acc.push({
        timestamp,
        points: lastPoint + pointChange
      });

      return acc;
    }, []);

    setChartData(processedData);
  }, [actions]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
        <Activity className="text-purple-500 w-6 h-6 mr-2" />
        Activity Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="timestamp" 
            stroke="#888" 
            tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM dd HH:mm')}
          />
          <YAxis stroke="#888" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy HH:mm:ss')}
          />
          <Line type="monotone" dataKey="points" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};



const RecentActivity = ({ actions }: { actions: Stats['actions'] }) => {
  const getActionIcon = (message: string) => {
    if (message.includes('deducted')) return <Minus className="text-red-500 w-6 h-6" />;
    if (message.includes('awarded')) return <Plus className="text-green-500 w-6 h-6" />;
    if (message.includes('Minted')) return <ImageIcon className="text-purple-500 w-6 h-6" />;
    return <Activity className="text-blue-500 w-6 h-6" />;
  };

  const getActionColor = (message: string) => {
    if (message.includes('deducted')) return 'bg-red-900/30';
    if (message.includes('awarded')) return 'bg-green-900/30';
    if (message.includes('Minted')) return 'bg-purple-900/30';
    return 'bg-blue-900/30';
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
        <Bell className="text-pink-500 w-6 h-6 mr-2" />
        Recent Activity
      </h2>
      <ul className="space-y-4">
        {actions.slice(0, 5).map((activity, index) => (
          <li key={index} className={`flex items-center p-3 rounded-lg ${getActionColor(activity.message)}`}>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
              {getActionIcon(activity.message)}
            </div>
            <div className="flex-grow">
              <p className="text-white">{activity.message}</p>
              <p className="text-sm text-white/70">{format(new Date(activity.timestamp), 'PPpp')}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ml-4">
              <User className="text-white w-6 h-6" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UsersToBeKickedOut = ({ users }: { users: string[] }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
      <Users className="text-red-500 w-6 h-6 mr-2" />
      Users to be Kicked Out
    </h2>
    <ul className="space-y-2">
      {users.map((user, index) => (
        <li key={index} className="bg-gray-700 p-2 rounded-lg text-white">
          {user}
        </li>
      ))}
    </ul>
  </div>
);

export default function DashboardPage() {
  const [username, setUsername] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [hasCommunity, setHasCommunity] = useState(false);
  const [communityStats, setCommunityStats] = useState<Stats | null>(null);
  const router = useRouter();
  const [isNFTPackModalOpen, setIsNFTPackModalOpen] = useState(false);
  const [showNFTs, setShowNFTs] = useState(false);

  const fetchCommunities = useCallback(async () => {
    try {
      const { walletAddress } = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch('https://telegage-server.onrender.com/api/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setCommunities(data);
        setHasCommunity(data.length > 0);
        if (data.length > 0) fetchCommunityStats(data[0].id);
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
  }, []);

  const fetchCommunityStats = async (communityId: number) => {
    try {
      const { walletAddress } = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await fetch('https://telegage-server.onrender.com/api/community-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, communityId }),
      });
      const data = await response.json();
      console.log("Community Statsssssssssss:", data);
      setCommunityStats(data.Stats);
    } catch (error) {
      console.error('Error fetching community stats:', error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth');
    } else {
      const { username, has_community, walletAddress } = JSON.parse(user);
      setUsername(username);
      setWalletAddress(walletAddress);
      setHasCommunity(has_community);
      fetchCommunities();
    }
  }, [router, walletAddress, fetchCommunities]);

  const handleNFTPackSubmit = async (formData: any) => {
    console.log("Dashboard - Received form data:", JSON.stringify(formData));
  
    try {
      // Assuming communities is an array and the first community's id should be used
      const communityId = communities[0]?.community_id;
      if (!communityId) {
        throw new Error('No community found');
      }

      console.log("Dashboard - Community ID:", communityId);

      const formDataWithCommunityId = { ...formData, community_id: communityId.toString() };

      const response = await fetch('https://telegage-server.onrender.com/api/create-nft-pack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithCommunityId),
      });
      console.log("Response status:", response.status);
      if (response.ok) {
        const result = await response.json();
        console.log("NFT Pack created successfully:", result);
        // Handle success (e.g., show a success message, update UI)
      } else {
        console.error('Failed to create NFT Pack');
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error creating NFT Pack:', error);
      // Handle error (e.g., show error message to user)
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
          <div className="flex items-center space-x-4">
           
            <div className="flex items-center bg-gray-800 rounded-full px-3 py-2 hover:bg-gray-700 transition-colors duration-300">
              <Wallet size={18} className="mr-2 text-gray-300" />
              <span className="text-sm font-medium truncate max-w-[150px] text-gray-200">{walletAddress}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(walletAddress)}
                className="ml-2 text-gray-400 hover:text-gray-200 focus:outline-none"
                title="Copy wallet address"
              >
                <Copy size={14} />
              </button>
            </div>
            <button 
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/auth');
              }}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-2 rounded-full hover:opacity-90 transition duration-300"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!hasCommunity && (
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
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
          
          {hasCommunity && communityStats && (
            <>
              <CommunityInfo community={communities[0]} />
              <CommunityStats stats={communityStats} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ActivityChart actions={communityStats.actions} />
                <RecentActivity actions={communityStats.actions} />
              </div>
              {communityStats.users_to_be_kicked_out.length > 0 && (
                <UsersToBeKickedOut users={communityStats.users_to_be_kicked_out} />
              )}
            </>
          )}
          
          {hasCommunity && (
            <>
              <div className="mt-8 flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNFTPackModalOpen(true)}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-300"
                >
                  Add NFT Pack
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNFTs(!showNFTs)}
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-300"
                >
                  {showNFTs ? 'Hide NFTs' : 'Display NFTs'}
                </motion.button>
              </div>
              <AddNFTPackModal
                isOpen={isNFTPackModalOpen}
                onClose={() => setIsNFTPackModalOpen(false)}
                onSubmit={handleNFTPackSubmit}
              />
              {showNFTs && <NFTPacksDisplay communityId={communities[0]?.community_id}/>}
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}