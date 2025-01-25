"use client";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { LandingAnimatedSection } from "@/components/landing/LandingAnimatedSection";
import LandingWaveDivider from "@/components/landing/LandingWaveDivider";
import Link from "next/link";
import Image from "next/image";
import { CalendarPlus, DollarSign, Mail } from "lucide-react";
import header from "../../public/landing/header.svg"
import CountdownTimer from "@/components/CountdownTimer";
import LandingSteps from "@/components/landing/LandingSteps";
import WhyUs from "@/components/landing/LandingWhyUs";

export default function Landing() {

  return (
    <Navbar className="bg-gray-50" footer>
      <div className="flex flex-col sm:flex-row h-[50vh] 2xl:h-[60vh]  mt-52 sm:mt-32 items-center justify-center gap-24 px-4">
        <div className="flex flex-col">
          <span className="text-3xl font-bold max-w-md mb-1">
            Teach kids coding in a way thats fun!
          </span>
          <span className="text-md font-medium max-w-md">
            Cosiva is dedicated to teaching kids coding through fun, hands-on
            projects, while preparing them for the future with concepts like AI
            and other emerging technologies.
          </span>
          <div className="mt-4 gap-2 flex">
            <Button size={"lg"}>
              <CalendarPlus />
              Pre-Enroll right now for FREE!
            </Button>
          </div>
        </div>
        <Image
          src={header}
          alt="Header"
          className="rounded-lg w-96 object-cover"
        />
      </div>
      <div className="w-full px-4 pb-8">
        <CountdownTimer />
      </div>
      <div id="about" />
      <WaveDivider direction="top" fillColor="#eaeaea" />
      <div className="bg-[#eaeaea] pb-16">
        <AnimatedSection className="flex flex-col lg:flex-row justify-center items-center w-full py-16 px-4 gap-8 md:gap-16 sm:px-12 lg:gap-32">
          <div className="flex flex-col items-start max-w-lg">
            <span className="text-2xl font-bold text-gray-800">About Us</span>
            <span className="text-gray-600 text-md mt-2">
              Cosiva is a student led nonprofit organization. Our mission is to
              make coding education engaging and future-focused by introducing
              kids to concepts like AI and other cutting-edge technologies in a
              way that is engaging and easy to understand. We run many free or
              low cost{" "}
              <Link className="text-orange-400 underline" href={"/#workshops"}>
                workshops
              </Link>{" "}
              across Forsyth County where we aim to carry out our mission.
            </span>
            <div className="flex mt-8 gap-2">
              <Button className="flex gap-1">
                <DollarSign />
                Sponsor us!
              </Button>
              <Button variant={"outline"}>
                <Mail />
                Contact us!
              </Button>
            </div>
          </div>
          <div className="bg-primary w-96 h-72 rounded-lg" />

        </AnimatedSection>
      </div>
      <WaveDivider direction="bottom" fillColor="#eaeaea" />


      <div className="flex flex-col items-center justify-center py-24">
        <span className="font-bold text-3xl">Why Cosiva?</span>
        <span className="mb-8 max-w-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
        <WhyUs />
      </div>

      <div id="workshops" />
      <div className="flex flex-col w-full py-24 mb-16 justify-center items-center px-32 2xl:px-4 bg-slate-100">
        <AnimatedSection className="flex flex-col justify-center items-center">
          <span className="text-2xl md:text-3xl font-bold text-center">
            How does Cosiva work?
          </span>
          <span className="text-gray-600 text-md text-center max-w-2xl mt-2">
            Our kid-focused workshops make learning fun and personal. Kids will
            learn real programming languages like Python through our own{" "}
            <Link className="text-orange-500 underline" href={`/editor`}>
              web-based editor
            </Link>{" "}
            that is designed to be intuitive and engaging.
          </span>
        </AnimatedSection>
        <Steps />
      </div>

      <WaveDivider direction="top" fillColor="rgb(255, 255, 255)" />
    </Navbar>
  );
}
