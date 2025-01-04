"use client";

import React, { useRef, useState } from "react";
import Navbar from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	PlayIcon,
	BotOffIcon,
	RefreshCwIcon,
	StopCircleIcon,
} from "lucide-react";
import { CodeEditorSnippet } from "@/components/editor/Snippet";
import Editor from "@/components/editor/Editor";
import { snippets } from "@/lib/editorConstants";

const CodeEditor = () => {
	const editorRef = useRef<any>(null);
	const [activeTab, setActiveTab] = useState("snippets");
	const [output, setOutput] = useState<string[]>([""]);
	const [isRunning, setIsRunning] = useState<boolean>(false);

	const handleRunCode = () => {
		if (editorRef.current) {
			editorRef.current.runCode();
		}
	};

	const handleResetCode = () => {
		if (editorRef.current) {
			editorRef.current.resetCode();
		}
	};

	const [bluetoothDevice, setBluetoothDevice] = useState<any>(null);

	const handleConnect = async () => {
		try {
			//@ts-ignore
			const device = await navigator.bluetooth.requestDevice({
				acceptAllDevices: false,
				filters: [{ namePrefix: "BBC micro:bit" }],
			});
			
			setBluetoothDevice(device);

			const server = await device.gatt.connect()

			console.log("Connected to micro:bit!");
		} catch (error) {
			console.error("Error connecting to micro:bit:", error);
		}
	};

	const handleSnippetDragStart = (
		e: React.DragEvent<HTMLDivElement>,
		snippetCode: string
	) => {
		e.dataTransfer.setData("text/plain", snippetCode);
	};

	return (
		<Navbar className="flex py-32 p-8 flex-wrap justify-center gap-2 bg-g">
			<div className="h-full w-3/5">
				<Editor
					ref={editorRef}
					setActiveTab={setActiveTab}
					output={output}
					setOutput={setOutput}
					isRunning={isRunning}
					setIsRunning={setIsRunning}
				/>
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
										<CodeEditorSnippet
											code={snippet.code}
											handleSnippetDragStart={
												handleSnippetDragStart
											}
											key={index}
										/>
									))}
								</div>
							</div>
						</TabsContent>
						<TabsContent value="output" className="max-h-[90%]">
							<div className="p-4 flex-grow">
								<ScrollArea className="h-full font-mono">
									<span className="whitespace-pre-wrap">
										{output.join("\n")}
									</span>
								</ScrollArea>
							</div>
						</TabsContent>
					</Tabs>

					<div className="absolute bottom-4 right-4 left-4 flex justify-center gap-2">
						<Button onClick={handleConnect}>
							<BotOffIcon className="h-6 w-6" />
						</Button>
						<Button onClick={handleRunCode}>
							{isRunning ? (
								<StopCircleIcon />
							) : (
								<PlayIcon className="h-6 w-6" />
							)}
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

export default CodeEditor;
