'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Card } from '../ui/card';
import networking from '@/../public/programs/networking.svg';
import realworld from '@/../public/programs/realworld.svg';
import ranking from '@/../public/programs/ranking.svg';
import compete from '@/../public/programs/compete.svg';

export default function Programs() {
    const images: { [key: string]: string } = {
        networking,
        compete,
        realworld,
        ranking,
    };

    const className = "flex flex-col lg:flex-row items-center gap-8 h-full"

    return (
        <Card className="w-full max-w-5xl mx-auto p-8">
            <Tabs defaultValue="networking" className="w-full">
                <div className="flex items-center w-full justify-center mb-6">
                    <TabsList>
                        <TabsTrigger value="networking">Networking</TabsTrigger>
                        <TabsTrigger value="compete">Competitions</TabsTrigger>
                        <TabsTrigger value="realworld">Real-World</TabsTrigger>
                        <TabsTrigger value="ranking">Ranking</TabsTrigger>
                    </TabsList>
                </div>
                <div className="h-[500px]"> {/* Fixed height container for consistent card sizes */}
                    <TabsContent value="networking" className={className}>
                        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-semibold mb-4">National Networking Opportunities</h3>
                            <p className="text-lg">
                                NSACC connects students nationwide through events such as Blind Networking Sessions,
                                pairing complementary skills (e.g., frontend with backend developers) to foster
                                collaborative and impactful projects.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
                            <Image
                                src={images.networking}
                                alt="Program Preview"
                                className="object-contain rounded-lg transition-all duration-200"
                                width={400}
                                height={400}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="compete" className={className}>
                        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-semibold mb-4">Competitions for Prizes</h3>
                            <p className="text-lg">
                                NSACC offers unique app development and tech challenges covering topics from data
                                analysis to creative problem-solving. Each project is evaluated on a numerical scale,
                                providing clear feedback on performance. Topics are carefully selected to challenge
                                participants with real-world problems and inspire creative solutions. Winners are awarded
                                exciting prizes based on their scores.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
                            <Image
                                src={images.compete}
                                alt="Program Preview"
                                className="object-contain rounded-lg transition-all duration-200"
                                width={400}
                                height={400}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="realworld" className={className}>
                        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-semibold mb-4">Real-World Experience Hub</h3>
                            <p className="text-lg">
                                Collaborate with nonprofits and organizations to develop tech solutions that address
                                real challenges. You'll work on projects like building apps or websites to help
                                organizations deliver on their mission, gaining hands-on experience while making a direct
                                impact.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
                            <Image
                                src={images.realworld}
                                alt="Program Preview"
                                className="object-contain rounded-lg transition-all duration-200"
                                width={400}
                                height={400}
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="ranking" className={className}>
                        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-semibold mb-4">Project-Based Ranking</h3>
                            <p className="text-lg">
                                Compete in projects and earn points to climb NSACC's rankings. The top members are
                                rewarded with cash prizes and exclusive opportunities, incentivizing continuous
                                participation and high-quality work.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/2 h-full flex items-center justify-center">
                            <Image
                                src={images.ranking}
                                alt="Program Preview"
                                className="object-contain rounded-lg transition-all duration-200"
                                width={400}
                                height={400}
                            />
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </Card>
    );
}

