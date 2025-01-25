"use client";;
import { LessonSlide, LessonSlideInlineCode, LessonSlideCodeEditor, LessonSlideCodeBlock } from "@/components/LessonSlide";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ChevronLeftIcon, ChevronRightIcon, TrophyIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import Confetti from "react-confetti";

export default function Lesson() {
    
  const [lessonSlideElems, setLessonSlideElems] = useState<ReactNode[]>([

    <LessonSlide
      title="Welcome to Cosiva!"
      description="We believe learning should be both fun and manageable, which is why we’ll be teaching you Python through microlearning. This is a method that focuses on small, digestible chunks of content, making it easy to learn at your own pace without feeling overwhelmed. The best part? You only need to dedicate just 15 minutes a day!"
    >
        Try printing <LessonSlideInlineCode>Hello world!</LessonSlideInlineCode> using Python!

        <LessonSlideCodeBlock children={
`import random

num = random.randint(1, 4)
print("Your number is", str(num))
`
        }/>

        <LessonSlideCodeEditor/>
    </LessonSlide>,

    <LessonSlide
      title="Why Microlearning?"
      description="Microlearning is the key to mastering Python effectively. It’s all about taking small, focused steps that add up over time. Instead of overwhelming yourself with long sessions, you’ll be able to focus on one concept at a time. This approach helps boost retention and makes learning much more enjoyable."
    />,
    <LessonSlide
      title="Your Daily Journey"
      description="Every day, you’ll be introduced to a new concept or practice problem that takes no more than 15 minutes to complete. You’ll progress at your own pace, building a solid foundation of Python programming skills. And with each day’s challenge, you’ll feel a sense of accomplishment!"
    />,
    <LessonSlide
      title="Interactive Learning"
      description="Learning Python with Cosiva is not just about reading. We offer hands-on exercises, interactive quizzes, and real-world applications that help you solidify what you’ve learned. You’ll actively engage with the material, making learning much more effective and fun."
    />,
    <LessonSlide
      title="Let’s Get Started!"
      description="Now that you know the basics of our approach, it’s time to dive in. Get ready to learn Python in a fun and manageable way. We’re here to support you every step of the way. Just remember, consistency is key — 15 minutes a day is all it takes to make great progress"
    />,
  ]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [lessonCompleted, setLessonCompleted] = useState<boolean>(false);

  const nextSlide = () => {

    if (currentSlideIndex >= lessonSlideElems.length - 1) {

      setLessonCompleted(true);
      return;
    }

    setCurrentSlideIndex((o) => o + 1);
  };

  const previousSlide = () => {
    if (currentSlideIndex <= 0) {
      location.href = "/learn";
      return;
    }

    setCurrentSlideIndex((o) => o - 1);
  };

  return (
    <Navbar footer>
      <div className="w-screen h-screen flex flex-col justify-center items-center ">
        <div className="max-w-[40rem]">
          {!lessonCompleted ? (

            <div>

              <Progress
                value={(currentSlideIndex / lessonSlideElems.length) * 100}
                className="h-2"
              />

              <div
                key={currentSlideIndex}
                className="flex flex-col animate-flyInFromRight mt-4"
              >
                {lessonSlideElems[currentSlideIndex]}
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  className="w-fit"
                  variant="secondary"
                  onClick={previousSlide}
                >
                  <ChevronLeftIcon />
                  Back
                </Button>
                <Button className="w-fit" onClick={nextSlide}>
                  Next
                  <ChevronRightIcon />
                </Button>

              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center gap-y-4 w-[30rem]">
              <TrophyIcon size={60} />
              <span className="w-40 text-center">
                <Confetti numberOfPieces={100}/>
                Kudos! You just completed today's lesson!
              </span>
              <Link href="/learn">
                <Button>
                    <ArrowLeft/>
                    Back to dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}
