"use client";

import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { initCodeEditorTheme, libCode, defaultCode } from "@/lib/editorConstants";
import { useSpeechRecognition } from "@/lib/hooks/useSpeechRecognition";
import dynamic from "next/dynamic";
import { Card } from "../ui/card";

const MonacoEditor = dynamic(
    () => import("@monaco-editor/react").then(mod => mod.Editor),
    { ssr: false }
);

const Editor = React.forwardRef((props: { setActiveTab: any, setOutput: any,  setIsRunning: any, isRunning: any, output: string[] }, ref) => {
    const [editorContent, setEditorContent] = useState("");
    const editorRef = useRef<any>(null);
    const monacoRef = useRef<any>(null);


    const runCode = (code: string, method: string, preserveOutput: boolean = false): void => {
        try {
            const outputArray = Array.isArray(props.output) ? props.output : [];
            const funcCall = `var output = ["${preserveOutput ? outputArray.join(`","`) : ""}"]; ${libCode};\n${code}\n${method};\nreturn [output, sysCalls];`
            console.log(funcCall)
            const output = new Function(funcCall)();
            props.setOutput(output[0]);
   
            if (output[1]) {
                if (output[1].includes("stt")) {
                    speech.startListening();
                }
            }
        } catch (error: any) {
            const errorName = error.name || "Error";
            const errorMessage = error.message || "Unknown error occurred";
            props.setOutput([`${errorName}: ${errorMessage}`]);
        }
        props.setActiveTab("output")
    };
   

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
        initCodeEditorTheme(monaco);
    };

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setEditorContent(value);
            try {
                localStorage.setItem("savedCode", value);
            } catch (e) {
                console.warn("Failed to save to localStorage:", e);
            }
        }
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
        if(!props.isRunning){
            runCode(editorContent, "onStart()");
            props.setIsRunning(true);
        }
        else{
            props.setIsRunning(false);
            speech.stopListening();
        }
    };

    const handleResetCode = () => setEditorContent(defaultCode);
    const handleConnect = () => {};

    useImperativeHandle(ref, () => ({
        runCode: () => handleRunCode(),
        resetCode: () => handleResetCode(),
        connect: () => handleConnect(),
        getEditorContent: () => editorContent,
        setEditorContent: (value: string) => setEditorContent(value),
    }));

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const savedCode = localStorage.getItem("savedCode");
                setEditorContent(savedCode ?? defaultCode);
            } catch (e) {
                console.warn("Local storage access denied:", e);
                setEditorContent(defaultCode);
            }
        }
    }, []);


    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
            }
            if (event.ctrlKey && event.key === 'p') {
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const speech = useSpeechRecognition(async (transcript: string) => {
        runCode(editorContent, `onSpeak("${transcript.toString()}")`, true);
    });

    const [device, setDevice] = useState(null);
    const [characteristic, setCharacteristic] = useState(null);

    return (
        <Card
            className="h-full py-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleSnippetDrop}
        >
            <MonacoEditor
                language="javascript"
                value={editorContent}
                theme="moon-light"
                height="100%"
                options={{ minimap: { enabled: false } }}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
            />
        </Card>
    );
});

Editor.displayName = "Editor";
export default Editor;
