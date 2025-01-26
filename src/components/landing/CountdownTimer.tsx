"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const targetDate = new Date("2025-12-31T00:00:00")

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            const difference = targetDate.getTime() - now.getTime()

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                })
            } else {
                clearInterval(timer)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return (
        <div className="flex flex-col w-full justify-center items-center max-w-4xl mx-auto">
            <span className="mb-4">Time until our official Launch</span>
            <div className="flex ">
                <div className="flex space-x-4">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="flex flex-col items-center">
                            <div className="text-4xl font-bold">{value}</div>
                            <div className="text-sm uppercase">{unit}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

