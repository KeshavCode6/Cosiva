"use client"

import Navbar from "@/components/navbar/navbar"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/landing/AnimatedSection"
import Image from "next/image"
import { CalendarPlus, DollarSign, Mail } from "lucide-react"
import header from "../../public/landing/header.svg"
import CountdownTimer from "@/components/landing/CountdownTimer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { benefits, faqs, features } from "@/lib/landing"

export default function Landing() {
  return (
    <Navbar footer>
      <div className="flex flex-col lg:flex-row min-h-[60vh] mt-32 items-center justify-center gap-8 lg:gap-24 px-4 lg:px-8">
        <div className="flex flex-col max-w-xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Teach kids coding in a way that's fun!</h1>
          <p className="text-sm sm:text-base lg:text-lg font-medium mb-6">
            Cosiva is dedicated to teaching kids coding through fun, hands-on projects, while preparing them for the
            future with concepts like AI and other emerging technologies.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              <CalendarPlus className="mr-2 h-4 w-4" />
              Pre-Enroll right now for FREE!
            </Button>
          </div>
        </div>
        <Image
          src={header || "/placeholder.svg"}
          alt="Header"
          className="rounded-lg w-full max-w-md lg:max-w-lg object-cover"
        />
      </div>

      <div className="w-full px-4 py-8 mb-16">
        <CountdownTimer />
      </div>

      <div className="bg-primary w-full py-16 flex justify-center items-center">
        <div className="text-white text-center">
          <AnimatedSection className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
            {[
              { value: "1M+", label: "Active Users" },
              { value: "5M+", label: "Blog Posts" },
              { value: "100K+", label: "Daily Visitors" },
              { value: "50+", label: "Categories" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-2xl sm:text-3xl lg:text-5xl font-bold">{stat.value}</p>
                <p className="text-base sm:text-lg lg:text-xl mt-2">{stat.label}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-48 relative px-4 lg:px-8" id="about">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 text-center">Learn Coding, the easy way</h2>
        <p className="mb-8 max-w-lg text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <AnimatedSection className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="flex flex-col justify-center w-full lg:w-1/2 gap-4">
            {features.map((card, index) => (
              <Card key={index} className="w-full flex items-center justify-between p-4">
                <div className="flex flex-col max-w-[80%]">
                  <span className="font-bold">{card.title}</span>
                  <p className="text-sm">{card.description}</p>
                </div>
                <div className="bg-primary rounded-lg text-white flex items-center justify-center w-12 h-12">
                  {card.icon}
                </div>
              </Card>
            ))}
          </div>
          <div className="bg-orange-500 w-full lg:w-72 h-64 lg:h-96 rounded-lg" />
        </AnimatedSection>
        <img
          src="/landing/aboutus.svg"
          className="hidden lg:block absolute right-10 bottom-3 max-w-[15vw]"
          alt="Team illustration"
        />
      </div>

      <div className="flex flex-col items-center justify-center py-16 lg:py-32 bg-gray-50 bg-cover relative px-4 lg:px-8" id="whyus">
        <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 text-center">Why Cosiva?</h2>
        <p className="mb-8 max-w-lg text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <AnimatedSection className="flex flex-col lg:flex-row justify-center items-center w-full relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((feature, index) => (
              <Card key={index} className="flex flex-col justify-center items-center h-auto sm:h-64 w-full sm:w-72">
                <CardHeader className="flex flex-col items-center">
                  <div className="bg-primary rounded-lg aspect-square text-white flex items-center justify-center w-12">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <h3 className="font-semibold text-lg sm:text-xl mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
        <img
          src="/landing/whyus.svg"
          className="hidden lg:block absolute left-10 bottom-3 w-[15vw]"
          alt="FAQs illustration"
        />
      </div>

      <AnimatedSection className="flex flex-col items-center justify-center w-full pt-16 lg:pt-36 pb-32 lg:pb-[19rem] relative px-4 lg:px-8" id="faqs">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8">FAQs</h2>
        <Card className="p-4 sm:p-8 w-full max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
        <img
          src="/landing/faqs/faq1.svg"
          className="hidden lg:block absolute right-10 bottom-3 w-[15vw]"
          alt="Question illustration"
        />
        <img
          src="/landing/faqs/faq2.svg"
          className="hidden lg:block absolute left-10 bottom-3 w-[15vw]"
          alt="Questions illustration"
        />
      </AnimatedSection>

      <div
        className="flex flex-col w-full items-center justify-center py-16 lg:py-32 bg-cover bg-center px-4 lg:px-8"
        style={{ backgroundImage: "url(/landing/calltoaction.svg)" }}
      >
        <AnimatedSection className="flex flex-col w-full items-center justify-center">
          <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl mb-4 text-center">
            Start your kid's future today with Cosiva!
          </h2>
          <p className="text-white max-w-xl mb-6 text-center text-sm sm:text-base">
            Pre-Enroll now by clicking the button below! Cosiva is completely free and commitment-free!
          </p>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Pre-Enroll right now for FREE!
          </Button>
        </AnimatedSection>
      </div>
    </Navbar>
  )
}

