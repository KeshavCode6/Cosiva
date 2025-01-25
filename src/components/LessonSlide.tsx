"use client";;
import { ReactNode, useEffect, useState } from "react";
import { Card } from "./ui/card";
import dynamic from "next/dynamic";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import { Button } from "./ui/button";
import { PlayIcon } from "lucide-react";

hljs.registerLanguage("python", python);

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface LessonSlideProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function LessonSlide({title, description, children}: LessonSlideProps) {

  return (
    <div>
      <div className="flex flex-col gap-y-2">
        <span className="font-semibold text-xl text-primary">{title}</span>
        <span className="text-sm">{description}</span>
      </div>

      {children && <Card className="my-4 text-sm p-6 space-y-4 shadow-none">
        {children}
      </Card>}
    </div>
  );
}

interface LessonSlideCodeEditorProps {
  expectedOutput?: string;
}

export function LessonSlideCodeEditor({ expectedOutput }: LessonSlideCodeEditorProps) {

  const [code, setCode] = useState<string>("");
  const [output, setOutput] = useState<string | null>(null);

  return (
    <Card className="h-40 p-2 flex flex-row shadow-none">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={65}>
          <MonacoEditor
            height="100%"
            defaultLanguage="python"
            value={"# Code goes here"}
            theme="vs-light"
            options={{
              minimap: {
                enabled: false
              }, 
              renderWhitespace: "none"
            }}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel>
          <div className="pl-4 h-full flex flex-col">
            <pre>
                {output || <span className="text-muted-foreground italic">Output will appear here</span>}
            </pre>
            <div className="mt-auto w-fit self-center flex flex-wrap gap-2 justify-center">
              <Button size="sm" variant="outline">
                <PlayIcon/>
                Run
              </Button>
            </div>
            
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Card>
  );
}

interface LessonSlideCodeBlockProps {
    children: string;
}

export function LessonSlideInlineCode({ children } : LessonSlideCodeBlockProps) {
    return <pre className="bg-neutral-100 w-fit rounded-[5px] px-1 inline">{children}</pre>
}

export function LessonSlideCodeBlock({ children } : LessonSlideCodeBlockProps) {

  return (
    <pre className="bg-neutral-100 rounded-[7px] px-2 py-1 select-none">
      <code dangerouslySetInnerHTML={{ __html: hljs.highlight(children, { language: 'python' }).value }}/>
    </pre>
  )
}