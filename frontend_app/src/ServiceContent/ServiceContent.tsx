import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const ServiceContent = () => {
    const commands = [
        {
            command: 'clear',
            callback: ({ resetTranscript }: any) => resetTranscript()
        },
        {
            command: 'open *',
            callback: (site: any) => {
                window.open('http://' + site)
            }
        },
        {
            command: 'stop',
            callback: ({ resetTranscript }: any) => resetTranscript()
        },
        {
            command: 'change background colour to *',
            callback: (colour: any) => {
                document.body.style.color = colour;
            }
        }
    ]
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })}>Start</button>
            <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
}

export default ServiceContent
