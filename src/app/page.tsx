"use client";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/landing/AnimatedSection";
import Image from "next/image";
import { CalendarPlus, DollarSign, Mail } from "lucide-react";
import header from "../../public/landing/header.svg"
import CountdownTimer from "@/components/landing/CountdownTimer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { benefits, faqs, features } from "@/components/landing/lib/landing";
export default function Landing() {

  return (
    <Navbar footer>
      <div className="flex flex-col sm:flex-row h-[60vh]  mt-52 sm:mt-32 items-center justify-center gap-24 px-4">
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
      <div className="w-full px-4 pb-8 mb-16">
        <CountdownTimer />
      </div>

      <div className="flex flex-col items-center justify-center py-32">
        <span className="font-bold text-3xl">Learn Coding, the easy way</span>
        <span className="mb-8 max-w-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
        <AnimatedSection className="flex items-center justify-center gap-8">
          <div className="flex flex-col justify-center w-[25vw] gap-2">
            {features.map((card, index) => (
              <Card
                key={index}
                className="w-full h-32 flex items-center justify-between p-4 px-8"
              >
                <div className="flex flex-col max-w-[80%]">
                  <span className="font-bold">{card.title}</span>
                  <p>{card.description}</p>
                </div>
                <div className="bg-primary rounded-lg text-white flex items-center justify-center w-12 h-12">
                  {card.icon}
                </div>
              </Card>
            ))}
          </div>
          <div className="bg-orange-500 w-72 h-96 rounded-lg" />
        </AnimatedSection>
      </div>

      <div className="flex flex-col items-center justify-center py-32 bg-gray-50 bg-cover">
        <span className="font-bold text-3xl">Why Cosiva?</span>
        <span className="mb-8 max-w-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
        <AnimatedSection className="flex flex-col lg:flex-row justify-center items-center w-full sm:px-12">
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col justify-center items-center h-64 w-72"
              >
                <CardHeader className="flex flex-col items-center">
                  <div className="bg-primary rounded-lg aspect-square text-white flex items-center justify-center w-12">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <span className="font-semibold text-xl">{feature.title}</span>
                  <span className="max-w-72 text-center text-base">{feature.description}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </div>


      <AnimatedSection className="flex flex-col items-center justify-center w-full pb-4 pt-32">
        <span className="text-3xl font-bold text-center">FAQs</span>
        <Card className="p-8 mt-4 h-[45vh]">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="w-[35vw]">
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </AnimatedSection>

      <div className="flex flex-col w-full items-center justify-center h-80 mb-16" >
        <Card className="p-8 px-16 md:px-64 bg-cover" style={{ backgroundImage: "url(/landing/cta.svg)" }}>
          <AnimatedSection className="flex flex-col w-full items-center justify-center ">
            <p className="text-white font-bold text-xl">Start your kid's future today with Cosiva!</p>
            <p className="text-white max-w-xl mb-4 text-center">Pre-Enroll now by clicking the button below! Cosiva is completely free and commitement free!</p>
            <Button size={"lg"} variant={"outline"}>
              <CalendarPlus />
              Pre-Enroll right now for FREE!
            </Button>
          </AnimatedSection>
        </Card>
      </div>
      <hr />
    </Navbar >
  );
}
