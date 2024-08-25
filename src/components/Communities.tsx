import { useState, useEffect } from 'react';
import axios from 'axios';

interface Community {
  id: string;
  title: string;
  memberCount: number;
  messageCount: number;
  activeUsers: number;
  moderationActions: number;
}

export const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>([
    { id: '1', title: 'Crypto Enthusiasts', memberCount: 5000, messageCount: 150000, activeUsers: 1200, moderationActions: 50 },
    { id: '2', title: 'NFT Collectors', memberCount: 3000, messageCount: 80000, activeUsers: 800, moderationActions: 30 },
    { id: '3', title: 'DeFi Traders', memberCount: 2000, messageCount: 100000, activeUsers: 950, moderationActions: 40 },
    { id: '4', title: 'Blockchain Developers', memberCount: 1500, messageCount: 50000, activeUsers: 600, moderationActions: 20 },
  ]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Communities</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">Title</th>
              <th className="p-3">Members</th>
              <th className="p-3">Messages</th>
              <th className="p-3">Active Users</th>
              <th className="p-3">Moderation Actions</th>
            </tr>
          </thead>
          <tbody>
            {communities.map((community) => (
              <tr key={community.id} className="border-b border-gray-700">
                <td className="p-3">{community.title}</td>
                <td className="p-3">{community.memberCount.toLocaleString()}</td>
                <td className="p-3">{community.messageCount.toLocaleString()}</td>
                <td className="p-3">{community.activeUsers.toLocaleString()}</td>
                <td className="p-3">{community.moderationActions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};