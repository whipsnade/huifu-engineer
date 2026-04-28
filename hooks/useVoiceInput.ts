import { useState, useCallback } from 'react';

export const useVoiceInput = (onResult: (text: string) => void) => {
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('您的浏览器不支持语音输入功能');
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'zh-CN';
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((result: any) => result[0])
                .map((result: any) => result.transcript)
                .join('');
            
            if (event.results[0].isFinal) {
                onResult(transcript);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsRecording(false);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognition.start();
    }, [onResult]);

    return { isRecording, startRecording };
};
