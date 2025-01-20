'use client';
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/sections/AnimatedSection";
import WaveDivider from "@/components/sections/WaveDivider";
import Link from "next/link";
import Workshops from "@/components/sections/Workshops";
import Image from "next/image";
import { teamMembers } from "@/lib/utils";
import { CalendarPlus, DollarSign, Mail } from 'lucide-react';
import header from "@/../public/landing/header.svg";
import Logo from "@/components/logo";

export default function Landing() {
  return (
    <Navbar className="bg-gray-50" footer={true}>
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row h-[60vh]  mt-52 sm:mt-32 items-center justify-center gap-24 px-4">
        <div className="flex flex-col">
          <span className="text-3xl font-bold max-w-md mb-1">Teach kids coding in a way thats fun!</span>
          <span className="text-md font-medium max-w-md">
            Cosiva is dedicated to teaching kids coding through fun, hands-on projects, while preparing them for the future with concepts like AI and other emerging technologies.
          </span>
          <div className="mt-4 gap-2 flex">
            <Button size={"lg"}><CalendarPlus />Sign up for an event today!</Button>
          </div>
        </div>
        <Image
          src={header}
          alt="Header"
          className="rounded-lg w-96 object-cover"
        />
      </div>

      {/* Sponsors Section */}
      <div className="flex justify-center items-center my-12 px-4">
        <Logo />
      </div>
      <div id="about" />

      {/* About Us */}
      <WaveDivider direction="top" fillColor="#f0ecec" />
      <div className="bg-[#f0ecec]">
        <AnimatedSection className="flex flex-col lg:flex-row justify-center items-center w-full py-16 px-4 gap-8 md:gap-16 sm:px-12 lg:gap-32">
          <div className="flex flex-col items-start max-w-lg">
            <span className="text-2xl font-bold text-gray-800">About Us</span>
            <span className="text-gray-600 text-md mt-2">
              Cosiva is a student led nonprofit organization.
              Our mission is to make coding education engaging and future-focused by introducing kids to concepts like AI and other cutting-edge technologies in a way that is engaging and easy to understand.
              We run many free or low cost <Link className="text-orange-400 underline" href={"/#workshops"}>workshops</Link> across Forsyth County
              where we aim to carry out our mission.
            </span>
            <div className="flex mt-8 gap-2">
              <Button className="flex gap-1"><DollarSign />Sponsor us!</Button>
              <Button variant={"outline"}><Mail />Contact us!</Button>
            </div>
          </div>
          <div className="flex flex-col items-center">
          <span className="font-semibold mb-6 text-2xl">Our team</span>
          <div className="flex flex-row gap-8">
            {teamMembers.map((member, index) => (
              <Link key={index} className="flex flex-col items-center text-center hover:scale-105 transition-all" href={member.url} target="_blank">
                <Image
                  src={member.image}
                  alt={`Team Member: ${member.name}`}
                  className="rounded-full w-40 aspect-square object-cover shadow-lg"
                />
                <span className="text-lg font-semibold mt-4">{member.name}</span>
                <span className="text-orange-500 font-medium">{member.role}</span>
              </Link>
            ))}
          </div>
          
          </div>

        </AnimatedSection>
      </div>
      <WaveDivider direction="bottom" fillColor="#f0ecec" />

      <div id="workshops" />
      <div className="flex flex-col w-full py-24 justify-center items-center px-4">
        <AnimatedSection className="flex flex-col justify-center items-center">
          <span className="text-2xl md:text-3xl font-bold text-center">Our Workshops</span>
          <span className="text-gray-600 text-md text-center max-w-2xl mt-2">
            Our kid-focused workshops make learning fun and personal. Kids will learn real programming languages like Python through our own <Link className="text-orange-500 underline" href={`/editor`}>web-based editor</Link> while
            building projects that make use of emerging concepts and receiving step-by-step guidance to build future-ready skills from our instructors.
          </span>
        </AnimatedSection>
        <AnimatedSection className="flex justify-center w-full mt-8 gap-8 md:gap-16">
          <Workshops />
        </AnimatedSection>
      </div>

      <WaveDivider direction="top" fillColor="rgb(255, 255, 255)" />
    </Navbar>
  );
}

