'use client'

import React, { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SaveIcon, PlayIcon, BotOffIcon } from 'lucide-react'
import { initCodeEditorTheme, snippets } from '@/lib/editor'
import { loader } from "@monaco-editor/react"
import * as monaco from "monaco-editor"
import { countCharacterOccurrences } from '@/lib/utils'
import usePythonRunner from '@/hooks/usePythonRunner'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const CodeEditorLayout: React.FC = () => {
  const [code, setCode] = useState('# Write your code here\ndef main():\n\tlog("Starting Robot!")\n\t')
  const [output, setOutput] = useState('')
  const [tab, setTab] = useState('snippets')

  const { theme } = useTheme()
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { pyodide, runPythonCode } = usePythonRunner();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loader.init().then(initCodeEditorTheme)
    }
  }, [])


  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleSnippetClick = (snippetCode: string) => {
    const editor = editorRef.current
    if (editor) {
      const model = editor.getModel()
      const selection = editor.getSelection()

      if (model && selection) {
        const { endLineNumber } = selection

        model.applyEdits([
          {
            range: new monaco.Range(endLineNumber + 1, 1, endLineNumber + 1, 1),
            text: `${snippetCode}`,
          },
        ])

        editor.setPosition({
          lineNumber: endLineNumber + countCharacterOccurrences(snippetCode, "\n") + 1,
          column: snippetCode.length + 1,
        })

        editor.focus()
      }
    } else {
      setCode((prevCode) => `${prevCode}\n${snippetCode}`)
    }
  }

  const handleRunCode = async () => {
    setTab("output")
    let output : string[] = []
    if (pyodide !== null) {
      pyodide.globals.set("log", (msg: string) => {output.push(msg);});
    }

    await runPythonCode(code, "main()")
    setOutput(output.join("\n"));
  }

  const handleSaveCode = () => alert('Code saved!') // Replace with actual save logic
  const handleConnect = () => setCode('// Write your code here')

  return (
    <Navbar className="flex h-screen p-8 items-center justify-center gap-2">
      <div className='h-full w-3/5'>
        <Card className='h-full py-4'>
          <Editor
            language="python"
            value={code}
            theme={theme === "light" ? "moon-light" : "moon"}
            height="100%"
            options={{ minimap: { enabled: false } }}
            width="100%"
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
          />
        </Card>
      </div>
      <div className='h-full w-1/4'>
        <Card className="h-full relative">
          <Tabs defaultValue="snippets" value={tab} onValueChange={(tab) => { setTab(tab) }} className="w-full h-full">
            <TabsList className='flex items-center rounded-sm'>
              <TabsTrigger value="snippets">Snippets</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            <TabsContent value="snippets" className="h-[50%]">
              <div className="h-full p-4 flex flex-col items-center">
                {snippets.map((snippet, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSnippetClick(snippet.code)}
                    className="mb-2 justify-start w-96"
                    variant={"outline"}
                  >
                    {snippet.name}
                  </Button>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="output" className="max-h-[90%]">
              <div className="p-4 flex-grow">
                <ScrollArea className="h-full">
                  <pre className="whitespace-pre-wrap">{output}</pre>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>

          <div className="absolute bottom-4 right-4 left-4 flex justify-center gap-2">
            <Button onClick={handleConnect} >
              <BotOffIcon className="h-6 w-6" />
            </Button>
            <Button onClick={handleRunCode} disabled={false}>
              <PlayIcon className="h-6 w-6" />
            </Button>
            <Button onClick={handleSaveCode} >
              <SaveIcon className="h-6 w-6" />
            </Button>
          </div>
        </Card>
      </div>
    </Navbar>
  )
}

export default CodeEditorLayout