import { useEffect, useState } from "react";

let recognition: any = null;

if (typeof window !== "undefined") {
    if ("webkitSpeechRecognition" in window) {
        recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
    }
}

export const useSpeechRecognition = (onRecognitionUpdate: (transcript: string) => Promise<void>) => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = async(event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join(" ");

            await onRecognitionUpdate(transcript);
            setText(transcript);
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
