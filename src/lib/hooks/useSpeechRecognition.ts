import { useEffect, useState } from "react";

let recognition: any = null;

if (typeof window !== "undefined") {
    if ("webkitSpeechRecognition" in window) {
        recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
    }
}
export const useSpeechRecognition = (onRecognitionUpdate: (word: string) => Promise<void>) => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = async (event: SpeechRecognitionEvent) => {
            // Extract the most recent word (the last part of the last result)
            const latestResult = event.results[event.results.length - 1];
            const latestWord = latestResult[0].transcript.trim();

            await onRecognitionUpdate(latestWord); // Pass only the latest word
            setText((prevText) => prevText + " " + latestWord); // Optionally append it to the full transcript
        };

        recognition.onerror = async (event: any) => {
            console.error('Speech recognition error:', event.error);
        };
    }, [onRecognitionUpdate]);

    const startListening = () => {
        setText("");
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return { text, isListening, startListening, stopListening, hasRecognition: recognition != null };
};
