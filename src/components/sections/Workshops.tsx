"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabContent = [
  {
    title: "Beginner Program",
    content: "Our beginner program is designed for those new to fitness. It focuses on building foundational strength and establishing healthy habits.",
    videoUrl: "https://www.example.com/beginner-program-video"
  },
  {
    title: "Intermediate Program",
    content: "The intermediate program is perfect for those with some fitness experience. It incorporates more complex exercises and higher intensity workouts.",
    videoUrl: "https://www.example.com/intermediate-program-video"
  },
  {
    title: "Advanced Program",
    content: "Our advanced program is challenging and designed for fitness enthusiasts. It includes high-intensity workouts and specialized training techniques.",
    videoUrl: "https://www.example.com/advanced-program-video"
  }
]

export default function Workshops() {
  return (
    <Card className="w-full max-w-5xl px-4">
      <Tabs defaultValue="tab0" className="w-full">
        <div className='flex w-full items-center justify-center p-4'>
        <TabsList className="flex">
          {tabContent.map((tab, index) => (
            <TabsTrigger key={index} value={`tab${index}`}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        </div>
        {tabContent.map((tab, index) => (
          <TabsContent key={index} value={`tab${index}`}>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold">{tab.title}</h2>
                  <p className="text-gray-600">{tab.content}</p>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={tab.videoUrl} 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-lg"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}

