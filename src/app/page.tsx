"use client"
import { AnimatedSection } from "@/components/custom/AnimatedSection";
import Programs from "@/components/custom/Programs";
import WaveDivider from "@/components/custom/WaveDivider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Home() {
  
  return (
    <Navbar min={true}>
      <div className="w-full max-w-screen flex flex-col justify-center items-center min-h-[65vh] px-4 py-8 md:py-0">
        <div className="flex flex-col lg:flex-row items-center md:gap-32 mt-16 lg:mt-0 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="flex gap-2 md:w-[387px] font-bold text-2xl md:text-3xl mb-2 text-center">
              <span className="self-center">
                Your Path to success
              </span>
            </h1>
            <p className="mb-4 text-wrap max-w-96 text-sm text-center md:text-left">
              Join NSACC, a nonprofit organization committed to shaping the next generation of tech leaders and professionals.
              Gain hands-on experience, develop practical skills in computer science, and forge meaningful connections while
              competing and collaborating with driven individuals at nationwide events.
            </p>
            <div className="flex flex-row gap-2 justify-center md:justify-start">
              <Button asChild>
                <Link target='_blank' href="https://forms.gle/9cAKaWxixZu7WHP5A">Join Waitlist</Link>
              </Button>
              <Button variant={"outline"} asChild>
                <Link href="#about">See more</Link>
              </Button>
            </div>
          </div>
          <div>
            <img alt="People working together" src="hero.svg" className="md:max-w-[550px] max-w-[350px]" />
          </div>
        </div>
      </div>
      {/* Sponsors */}
      <div className="flex flex-col justify-center items-center my-8 px-4 opacity-0">
        <p className="font-medium text-center">Our partners/sponsors</p>
        <div className="flex gap-8 flex-wrap justify-center">
          <img alt="Sponsor" className="w-24 h-16 object-contain" />
        </div>
      </div>
      <div id="about" />

      {/* About us */}
      <WaveDivider direction="top" fillColor="rgba(0,0,0,0.05)" />
      <div style={{ backgroundColor: "rgba(0,0,0,0.05)" }}>
        <AnimatedSection className="flex flex-col lg:flex-row justify-center items-center min-h-[50vh] w-full py-16 px-4 gap-8 md:gap-16 sm:px-12 lg:gap-32">
          <div className="flex flex-col gap-2 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">About Us</h2>
            <p className="max-w-2xl text-center md:text-left">
              NSACC, the National Student Association of Collaborative & Competitive Computing, is a student-led nonprofit empowering high schoolers passionate about computer science.
              Our mission is to connect students nationwide through <a href="#programs" className="text-orange-400 hover:underline">various programs</a> including collaborative coding, competitions, and project-based learning,
              fostering the next generation of tech innovators. Join us to build skills, create meaningful projects, and network with peers and industry professionals.
              If you are interested in keeping up with NSACC, follow our socials below!
            </p>
          </div>
          <div>
            <video width="400" height="400" controls className="rounded-lg mb-4" poster="thumbnail.png">
              <source src="video.mp4" type="video/mp4"/> 
              Your browser does not support the video tag. 
              <a href="https://youtu.be/ynOryZU1eCE?si=wQ8S7QyO98ve3S6s">Click here to watch it</a>
            </video>
          </div>
        </AnimatedSection>
      </div>
      <div id="programs" />
      <WaveDivider direction="bottom" fillColor="rgba(0,0,0,0.05)" />

      {/* Our Programs */}
      <div className="flex flex-col w-full  justify-center items-center px-4 py-16">
        <AnimatedSection className="flex flex-col justify-center items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Our Programs</h2>
          <p className="max-w-4xl text-center">
            At NSACC, we host various intiatives for free or very affordable costs. If you are interested in helping us
            maintain our programs and achieve our mission, please consider becoming a partner by filling out this
            form <Link href="https://forms.gle/xHVMcjPW9kzxhgfC7" className="text-orange-400 hover:underline" target="_blank">here</Link> or
            through <Link href="/contact" className="text-orange-400 hover:underline">our contact page</Link>
          </p>
        </AnimatedSection>
        <AnimatedSection className="flex justify-center w-full py-8 md:py-16 gap-8 md:gap-16">
          <Programs />
        </AnimatedSection>
      </div>
    </Navbar>
  );
}