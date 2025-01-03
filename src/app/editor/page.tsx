"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SaveIcon, PlayIcon, BotOffIcon, RefreshCwIcon } from "lucide-react";
import { initCodeEditorTheme, snippets, codeEditorThemeRules, defaultCode } from "@/lib/editor";
import usePythonRunner from "@/hooks/usePythonRunner";
import { Highlight } from "prism-react-renderer";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then(mod => mod.Editor),
  { ssr: false }
);

const CodeEditor = () => {
  const { theme } = useTheme();
  const { pyodide, runPythonCode } = usePythonRunner();
  const [editorContent, setEditorContent] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("snippets");
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    // Only run client-side code
    if (typeof window !== "undefined") {
      try {
        const savedCode = localStorage.getItem('savedCode');
        setEditorContent(savedCode ?? defaultCode);
      } catch (e) {
        console.warn("Local storage access denied:", e);
        setEditorContent(defaultCode);
      }
    }
  }, []);

  const onSpeechChange = async (transcript: string) => {
    await runPythonCode(editorContent, `onSpeak(${transcript})`);
  };

  const speech = useSpeechRecognition(onSpeechChange);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Initialize theme after Monaco is mounted
    initCodeEditorTheme(monaco);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorContent(value);
      try {
        localStorage.setItem('savedCode', value);
      } catch (e) {
        console.warn("Failed to save to localStorage:", e);
      }
    }
  };

  const handleSnippetDragStart = (e: React.DragEvent<HTMLDivElement>, snippetCode: string) => {
    e.dataTransfer.setData("text/plain", snippetCode);
  };

  const handleSnippetDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pastedText = e.dataTransfer.getData("text/plain");

    if (editorRef.current && monacoRef.current) {
      const position = editorRef.current.getPosition();
      if (position) {
        const monaco = monacoRef.current;
        editorRef.current.executeEdits("", [
          {
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            ),
            text: pastedText,
            forceMoveMarkers: true,
          },
        ]);
      }
    }
  };

  const handleRunCode = async () => {
    setActiveTab("output");
    let output: string[] = [];

    if (pyodide !== null) {
      pyodide.globals.set("log", (msg: string) => {
        output.push(msg);
      });
    }

    if (editorContent.includes("def onSpeak")) {
      speech.startListening();
    }

    await runPythonCode(editorContent, "onStart()");
    setOutput(output.join("\n"));
  };

  const handleResetCode = () => setEditorContent(defaultCode);
  const handleConnect = () => setEditorContent("# Write your code here");

  return (
    <Navbar className="flex py-32 p-8 flex-wrap justify-center gap-2 bg-g">
      <div className="h-full w-3/5">
        <Card
          className="h-full py-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleSnippetDrop}
        >
          <MonacoEditor
            language="javascript"
            value={editorContent}
            theme={theme === "light" ? "moon-light" : "moon"}
            height="100%"
            options={{ minimap: { enabled: false } }}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
          />
        </Card>
      </div>
			<div className="h-full w-1/4">
				<Card className="h-full relative">
					<Tabs
						defaultValue="snippets"
						value={activeTab}
						onValueChange={(value) => setActiveTab(value)}
						className="w-full h-full"
					>
						<TabsList className="flex items-center rounded-sm">
							<TabsTrigger value="snippets">Snippets</TabsTrigger>
							<TabsTrigger value="output">Output</TabsTrigger>
						</TabsList>
						<TabsContent value="snippets" className="h-[50%]">
							<div className="flex justify-center">
								<div className="p-3 flex flex-col h-[60vh] overflow-hidden overflow-y-auto">
									{snippets.map((snippet, index) => (
										<CodeEditorSnippet code={snippet.code} name={snippet.name} handleSnippetDragStart={handleSnippetDragStart} key={index} />
									))}
								</div>
							</div>
						</TabsContent>
						<TabsContent value="output" className="max-h-[90%]">
							<div className="p-4 flex-grow">
								<ScrollArea className="h-full font-mono">
									<span className="whitespace-pre-wrap">{output}</span>
								</ScrollArea>
							</div>
						</TabsContent>
					</Tabs>

					<div className="absolute bottom-4 right-4 left-4 flex justify-center gap-2">
						<Button onClick={handleConnect}>
							<BotOffIcon className="h-6 w-6" />
						</Button>
						<Button onClick={handleRunCode}>
							<PlayIcon className="h-6 w-6" />
						</Button>
						<Button onClick={handleResetCode}>
							<RefreshCwIcon className="h-6 w-6" />
						</Button>
					</div>
				</Card>
			</div>
		</Navbar>
	);
};

interface CodeEditorSnippetProps {
	code: string,
	name: string,
	handleSnippetDragStart: CallableFunction
}

function CodeEditorSnippet({ code, name, handleSnippetDragStart }: CodeEditorSnippetProps) {

	const applyCustomHighlighting = (style: React.CSSProperties, tokenTypes: string[]) => {
		const tokenType = tokenTypes[0] || "";
		const rule = codeEditorThemeRules.find((r) => r.token === tokenType);
		return {
			...style,
			color: rule ? `#${rule.foreground}` : `#000000`,
		};
	};

	return (
		<Card
			draggable
			onDragStart={(e) => handleSnippetDragStart(e, code)}
			className="mb-2 justify-start p-3 hover:cursor-pointer w-fit"
		>
			<Highlight code={code} language="python">
				{({ className, style, tokens, getTokenProps }: any) => (
					<pre>
						{tokens.map((line: any, index: number) => (
							<div key={index}>
								{line.length > 1 && line.map((token: any, index: number) => {
									const tokenStyle = applyCustomHighlighting({
										...style,
										backgroundColor: "white"
									}, token.types);
									return <span {...getTokenProps({ token, index })} style={tokenStyle} key={index} />
								})}
							</div>
						))}
					</pre>
				)}
			</Highlight>
		</Card>
	)
}

export default CodeEditor;
