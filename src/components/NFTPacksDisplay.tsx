"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

interface NFTPack {
  _id: string
  imageUrl: string
  altText: string
  title: string
  price: number
  keywords: string
  id: string
}

export default function NFTPacksGallery() {
  const [packs, setPacks] = useState<NFTPack[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPack, setSelectedPack] = useState<NFTPack | null>(null)

  useEffect(() => {
    const fetchNFTPacks = async () => {
      try {
        const response = await fetch('/api/getPacks')
        if (!response.ok) {
          throw new Error('Failed to fetch NFT packs')
        }
        const data = await response.json()
        setPacks(data)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setIsLoading(false)
      }
    }

    fetchNFTPacks()
  }, [])

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  )

  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">NFT Packs Gallery</h1>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {packs.map((pack) => (
          <motion.div
            key={pack._id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPack(pack)}
          >
            <img
              src={pack.imageUrl}
              alt={pack.altText}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h2 className="text-white text-lg font-semibold mb-2">{pack.title}</h2>
              <p className="text-white font-bold">${pack.price.toFixed(2)}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedPack} onOpenChange={(open) => !open && setSelectedPack(null)}>
        <DialogContent className="max-w-3xl">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {selectedPack && (
            <motion.div 
              className="grid gap-4 py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-video">
                <img
                  src={selectedPack.imageUrl}
                  alt={selectedPack.altText}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold">{selectedPack.title}</h2>
              <p className="text-xl font-semibold">Price: ${selectedPack.price.toFixed(2)}</p>
              <div className="flex flex-wrap gap-2">
                {selectedPack.keywords.split(',').map((keyword, index) => (
                  <Badge key={index} variant="secondary">{keyword.trim()}</Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">ID: {selectedPack.id}</p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}