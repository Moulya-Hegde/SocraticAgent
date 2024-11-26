import React, { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaCopy, FaVolumeUp } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai'; // Import the checkmark icon


function ChatWindow({ messages }) {
  const chatWindowRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [aiWords, setAiWords] = useState({});
  const lastAiMessageRef = useRef(null);
  const [copyStatus, setCopyStatus] = useState({ index: null, isCopied: false, iconType: null });

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    
    const newMessage = messages[messages.length - 1];
    console.log(newMessage)
    if (newMessage && newMessage.sender === 'ai' && newMessage.text) {
      // Only proceed if newMessage.text is a valid string
      if (newMessage.text !== lastAiMessageRef.current) {
        lastAiMessageRef.current = newMessage.text;
        const words = newMessage.text.split(' '); // Safely split the string
        let wordIndex = 0;
  
        const intervalId = setInterval(() => {
          setAiWords((prev) => ({
            ...prev,
            [newMessage.text]: words.slice(0, wordIndex + 1).join(' '),
          }));
          wordIndex++;
  
          if (wordIndex === words.length) {
            clearInterval(intervalId);
          }
        }, 50);
  
        return () => clearInterval(intervalId);
      }
    }
  }, [messages]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus({ index, isCopied: true, iconType: 'check' }); // Change icon type to check
      setTimeout(() => {
        setCopyStatus({ index: null, isCopied: false, iconType: null }); // Reset after 2 seconds
      }, 2000);
    });
  };

  const handleTextToSpeech = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div
      ref={chatWindowRef}
      className="flex-grow chat-window p-0 rounded-lg shadow-lg h-full overflow-y-auto"
    >
      <div className="flex flex-col space-y-4 p-4">
        {messages.map((message, index) => (
          <div key={index} className="relative">
            <div
              className={`p-2 break-words whitespace-pre-wrap rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-100 text-gray-800 dark:bg-blue-200 dark:text-gray-900 self-end ml-auto max-w-[50%] w-fit'
                  : 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white self-start flex items-center max-w-[50%] w-fit'
              }`}
            >
              {message.sender === 'user'
                ? message.text
                : aiWords[message.text] || ''}

              {message.sender === 'ai' && (
                <div className="flex items-center ml-2">
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaChevronDown color="#E2DFD0" className={`transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedIndex === index && (
                    <div className="flex flex-col items-end space-y-2 ml-2">
                      <button
                        className="flex items-center text-gray-600 hover:text-gray-800 bg-transparent"
                        onMouseOver={(e) => (e.currentTarget.title = "Copy Text")}
                        onClick={() => handleCopy(message.text, index)} // Copy text
                      >
                        {copyStatus.index === index && copyStatus.iconType === 'check' ? (
                          <AiFillCheckCircle className="text-gray-400" />
                        ) : (
                          <FaCopy color='#E2DFD0'/>
                        )}
                        {copyStatus.index === index && copyStatus.isCopied && (
                          <span className="text-gray-400 ml-1">Copied!</span>
                        )}
                      </button>
                      <button
                        className="flex items-center text-gray-600 hover:text-gray-800 bg-transparent"
                        onMouseOver={(e) => (e.currentTarget.title = "Text to Speech")}
                        onClick={() => handleTextToSpeech(message.text)} // Text to speech
                      >
                        <FaVolumeUp color='#E2DFD0'/>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatWindow;
