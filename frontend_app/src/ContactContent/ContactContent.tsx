import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface ConversationItem {
    role: string;
    message: string;
}

const ContactContent = () => {
    const [conversation, setConversation] = useState<ConversationItem[]>([]);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const handleUserSpeech = async () => {
        const userMessage = transcript.trim();

        if (userMessage) {
            // Add user's message to the conversation
            setConversation((prevConversation) => [
                ...prevConversation,
                { role: 'user', message: userMessage },
            ]);

            // Get GPT-3 response
            const gpt3Response = await getGpt3Response(userMessage);

            // Add GPT-3 response to the conversation
            setConversation((prevConversation) => [
                ...prevConversation,
                { role: 'bot', message: gpt3Response },
            ]);
        }

        // Reset the speech recognition transcript
        resetTranscript();
    };

    const getGpt3Response = async (userMessage: string): Promise<string> => {
        const apiKey = 'apikey';
        const apiUrl = 'https://api.openai.com/v1/chat/completions ';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    prompt: userMessage,
                    max_tokens: 100,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Check if 'choices' property exists and is an array
            if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
                return data.choices[0].text.trim();
            } else {
                throw new Error('Unexpected response structure from GPT-3 API');
            }
        } catch (error: any) {
            console.error('Error fetching GPT-3 response:', error.message);
            return 'Error processing response';
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <div>
                {conversation.map((item, index) => (
                    <div key={index} className={item.role}>
                        {item.message}
                    </div>
                ))}
            </div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })}>Start</button>
            <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <button onClick={handleUserSpeech}>Send</button>
            <p>{transcript}</p>
        </div>
    );
};
export default ContactContent
