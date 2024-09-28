"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Bell, Home, Users, MessageSquare, Activity, Settings, LogOut } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mockChartData = [
  { name: 'Jan', messages: 400, points: 240, nfts: 20 },
  { name: 'Feb', messages: 300, points: 139, nfts: 15 },
  { name: 'Mar', messages: 200, points: 980, nfts: 30 },
  { name: 'Apr', messages: 278, points: 390, nfts: 25 },
  { name: 'May', messages: 189, points: 480, nfts: 18 },
  { name: 'Jun', messages: 239, points: 380, nfts: 22 },
]

const CommunityStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.number_of_messages}</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.points_earned}</div>
          <p className="text-xs text-muted-foreground">+180.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">NFTs Minted</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.number_of_nfts_minted}</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}

const CommunityInfo = ({ community }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{community.community_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Community ID</h3>
            <p className="text-lg font-semibold">{community.community_id}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Total Members</h3>
            <p className="text-lg font-semibold">{community.users.length}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
          <p className="text-sm">{community.community_description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function Dashboard() {
  const [username, setUsername] = useState('')
  const [communities, setCommunities] = useState([])
  const [hasCommunity, setHasCommunity] = useState(false)
  const [communityStats, setCommunityStats] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
    } else {
      const { username, has_community } = JSON.parse(user)
      setUsername(username)
      setHasCommunity(has_community)
      fetchCommunities()
    }
  }, [router])

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
    <div className="flex h-screen bg-background">
      <main className="flex-1 p-8 overflow-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={username} />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              onClick={() => {
                localStorage.removeItem('user')
                router.push('/auth')
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        
        {!hasCommunity && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex justify-center space-x-4">
                <Button onClick={() => router.push('/create_community')}>
                  Create Your Community
                </Button>
                <Button variant="outline" onClick={() => router.push('/import_community')}>
                  Import Your Community
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {hasCommunity ? (
          communities.length > 0 ? (
            communities.map((community) => (
              <motion.div
                key={community._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <CommunityInfo community={community} />
                {communityStats && <CommunityStats stats={communityStats} />}
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="messages" stroke="#8884d8" />
                        <Line type="monotone" dataKey="points" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="nfts" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder.svg" alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="text-sm font-medium">New member joined</p>
                          <p className="text-sm text-muted-foreground">2 minutes ago</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder.svg" alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="text-sm font-medium">NFT minted</p>
                          <p className="text-sm text-muted-foreground">15 minutes ago</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder.svg" alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <p className="text-sm font-medium">New message posted</p>
                          <p className="text-sm text-muted-foreground">1 hour ago</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-xl">Loading communities...</p>
          )
        ) : (
          <p className="text-center text-xl">You haven't created or imported any communities yet.</p>
        )}
      </main>
    </div>
  )
}