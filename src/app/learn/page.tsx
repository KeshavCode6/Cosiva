import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CheckIcon, CircleHelp, StarIcon } from "lucide-react";
import Link from "next/link";

export default function Learn() {
  return (
    <Navbar footer>
      <div className="flex flex-col justify-center h-screen">
        <div className="flex flex-col items-center gap-y-6">
          <span className="font-bold text-4xl">Welcome, Shaurya</span>

          <div className="w-96 flex flex-col gap-y-2">
            <Progress value={50} className="h-3 " />

            <div className="flex flex-row justify-between w-full text-muted-foreground">
              <span>Newbie</span>
              <span>Rockstar</span>
            </div>
          </div>
        </div>

        <ScrollArea>
          <div className="flex flex-row gap-x-10 py-56 mx-16">
            {Array.from({ length: 20 }).map((_, index) => (
              <LearnLesson key={index} lessonId={index} />
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </Navbar>
  );
}

interface LearnLessonProps {
  lessonId: number;
}

function LearnLesson({ lessonId }: LearnLessonProps) {

  return (
    <Link href={`/learn/${lessonId}`} style={{transform: `translateY(${Math.sin(lessonId) * 100}px)`,}}>
      <HoverCard>
        <HoverCardTrigger>
          <div
            className={`rounded-full h-24 aspect-square text-white flex justify-center items-center hover:cursor-pointer hover:shadow-2xl transition-all bg-gradient-to-r ${lessonId < 6 ? " from-orange-400 to-orange-600" : "to-muted-foreground from-muted-foreground/70"}`}
          >
            {lessonId < 6 ? (
              <CheckIcon size={40} strokeWidth={4} />
            ) : (
              <StarIcon size={40} strokeWidth={1} fill="white" />
            )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className="w-80 flex flex-col text-sm relative"
          side="top"
        >
          <div className="font-semibold mb-1 flex flex-row gap-x-2">
            <CircleHelp />
            <span className="my-auto">Introduction to Cosiva</span>
          </div>
          <span>
            An introduction to Cosiva and its mission to make learning more
            accessible and fun for everyone.
          </span>
        </HoverCardContent>
      </HoverCard>
    </Link>
  );
}
