import { useState, useEffect } from 'react';
import axios from 'axios';

interface Community {
  id: string;
  title: string;
  memberCount: number;
  messageCount: number;
}
  moderationActions: number;
export const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
export const Communities = () => {
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/communities');
        setCommunities(response.data);
      } catch (error) {
        console.error('Failed to fetch communities:', error);
      }
    };
      <h2 className="text-2xl font-bold mb-4">Your Communities</h2>
    fetchCommunities();
  }, []);
          <thead>
  return (
    <div>
      <h2>Your Communities</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Members</th>
            <th>Messages</th>
          </tr>
        </thead>
        <tbody>
          {communities.map((community) => (
            <tr key={community.id}>
              <td>{community.title}</td>
              <td>{community.memberCount}</td>
              <td>{community.messageCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};