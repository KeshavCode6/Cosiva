"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const tabContent = [
  {
    title: "Maze Workshop",
    content: (
      <span>
        Kids will learn how to guide a robot through a maze using Python, learning sequencing and basic computer science principles. This easy workshop is perfect for beginners.
      </span>
    ),
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Musician Workshop",
    content: (
      <span>
        Kids will learn how to program a robot to play music and dance, while exploring concepts like sequencing and iteration. This fun, beginner-friendly workshop introduces the basics of robotics and text-to-speech.
      </span>
    ),
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Assistant Workshop",
    content: (
      <span>
        Using Python and speech recognition, kids learn how to create a robot they can control with their voice, learning about control flow and how voice assistants work. This medium-difficulty workshop offers a deeper dive into programming.
      </span>
    ),
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    title: "Pet Workshop",
    content: (
      <span>
        Kids learn how to create a robot "pet" that moves, does tricks and makes sounds. By using the Python random library and voice control, they'll explore iteration and control flow in this challenging workshop designed for advanced learners.
      </span>
    ),
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
];

export default function Workshops() {
  return (
    <Card className="w-full max-w-5xl px-4">
      <Tabs defaultValue="tab0" className="w-full">
        <div className='p-4 flex justify-center'>
          <TabsList className="flex flex-wrap w-fit">
            {tabContent.map((tab, index) => (
              <TabsTrigger key={index} value={`tab${index}`}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabContent.map((tab, index) => (
          <TabsContent key={index} value={`tab${index}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5}}
            >
              <CardContent className="p-6 flex justify-center">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className='flex flex-col'>
                    <span className="text-lg sm:text-2xl font-bold">{tab.title}</span>
                    <span className="text-black mt-2">{tab.content}</span>
                  </div>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                      className='rounded-xl w-96 h-60' 
                      src={tab.videoUrl} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </CardContent>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}

interface WorkshopTabCodeLineProps {
  children: string
}

function WorkshopTabCodeLine({ children }: WorkshopTabCodeLineProps) {
  return (
    <span className='bg-secondary p-1 rounded-[5px] text-black hover:bg-secondary/95 transition-all hover:cursor-pointer'>
      {children}
    </span>
  )
}

