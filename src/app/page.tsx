'use client';
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/sections/AnimatedSection";
import WaveDivider from "@/components/sections/WaveDivider";
import Link from "next/link";
import Workshops from "@/components/sections/Workshops";
import Image from "next/image";
import { teamMembers } from "@/lib/landing";
import { CalendarPlus, DollarSign, Mail } from "lucide-react";

export default function Landing() {
  return (
    <Navbar className="bg-gray-50">
      {/* Hero Section */}
      <div className="flex h-[60vh] mt-24 items-center justify-center">
        <div className="flex flex-col">
          <p className="text-2xl font-bold max-w-xl mb-1">Teach your kids coding in a way that is fun!</p>
          <p className="text-md font-medium max-w-md">
            Cosvia is dedicated to teaching kids coding through fun, hands-on projects, while preparing them for the future with concepts like AI and other emerging technologies.
          </p>
          <div className="mt-4 gap-2 flex">
            <Button size={"lg"}><CalendarPlus />Sign up for an event today!</Button>
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="flex flex-col justify-center items-center mb-16 px-4">
        <p className="font-bold text-center">Our partners</p>
        <div className="flex gap-8 flex-wrap justify-center">
          <img alt="Sponsor" className="w-24 h-16 object-contain" />
        </div>
      </div>
      <div id="about" />

      {/* About Us */}
      <WaveDivider direction="top" fillColor="rgba(0,0,0,0.05)" />
      <div style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
        <AnimatedSection className="flex flex-col lg:flex-row justify-center items-center w-full py-16 px-4 gap-8 md:gap-16 sm:px-12 lg:gap-32">
          <div className="flex flex-col items-start max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800">About Us</h2>
            <p className="text-gray-600 text-md">
              Cosvia is a student led nonprofit organization.
              Our mission is to make coding education engaging and future-focused by introducing kids to concepts like AI and other cutting-edge technologies in a way that is engaging and easy to understand.
              We run many free or low cost <Link className="text-orange-400 underline" href={"/#workshops"}>workshops</Link> across Forsyth County
              where we aim to carry out our mission.
            </p>
            <div className="flex mt-8 gap-2">
              <Button className="flex gap-1"><DollarSign />Help fund us!</Button>
              <Button variant={"outline"}><Mail />Contact us!</Button>
            </div>
          </div>

          <div className="flex flex-row gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <Image
                  src={member.image}
                  alt={`Team Member: ${member.name}`}
                  className="rounded-lg w-40 aspect-square object-cover shadow-lg"
                />
                <Link className="text-xl font-semibold mt-4 hover:underline" href={`mailto:${member.name}@cosiva.org`}>{member.name}</Link>
                <p className="text-orange-500">{member.role}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
      <WaveDivider direction="bottom" fillColor="rgba(0,0,0,0.05)" />
      <div id="workshops" />
      <div className="flex flex-col w-full py-24 justify-center items-center px-4">
        <AnimatedSection className="flex flex-col justify-center items-center">
          <p className="text-2xl md:text-3xl font-bold text-center">Our Workshops</p>
          <p className="text-gray-600 text-md text-center max-w-2xl">
            Our kid-focused workshops make learning fun and personal. Kids will learn real programming languages like Python through our own <Link className="text-orange-500 underline" href={`/editor`}>web-based editor</Link> while
            building projects that make use of emerging concepts and recieving step-by-step guidance to build future-ready skills from our instructors.
          </p>
        </AnimatedSection>
        <AnimatedSection className="flex justify-center w-full mt-4 gap-8 md:gap-16">
          <Workshops />
        </AnimatedSection>
      </div>
    </Navbar>
  );
}
