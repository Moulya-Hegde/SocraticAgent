import React, { useState } from 'react';
import { FaMicrophone } from 'react-icons/fa'; // Import voice icon
import { FaRegSmile } from 'react-icons/fa'; // Dummy icon, can be replaced later


function MessageInput({ isSidebarOpen, onSendMessage }) {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [listeningText, setListeningText] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      console.log('Sending message:', inputValue); // Log the message being sent
      onSendMessage(inputValue);
      setInputValue(''); // Clear input after sending
    } else {
      console.warn('Input is empty, not sending message.'); // Warn if input is empty
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => {
      setIsListening(true);
      setListeningText('Listening...');
      console.log('Microphone clicked, starting speech recognition...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Recognized text:', transcript);
      setInputValue(transcript); // Set recognized text to input value
      setListeningText('Speech recognized.'); // Feedback for successful recognition
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListeningText('Error recognizing speech.');
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        setListeningText(''); // Clear message after 3 seconds
      }, 3000);
    };

    recognition.start();
  };

  return (
    <div className={`flex items-center p-4 message-input shadow-lg rounded-md transition-all duration-500 w-full relative`}>
      {/* Dummy Icon (e.g., a smiley icon) to the left of the text area */}
      <FaRegSmile className="text-xl text-gray-600 dark:text-gray-400 mr-2" />

      <textarea
        className={`flex-grow h-12 p-2 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500 resize-none transition-all duration-500 ${isSidebarOpen ? 'w-[calc(100%-80px)]' : 'w-full'}`}
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ borderRadius: '8px' }} // Curved border
      />

      <button 
        className="ml-2 text-xl text-gray-600 dark:text-gray-400 bg-transparent border-none button-hover" // Added button-hover class
        onClick={handleMicClick} // Call the speech-to-text functionality
      >
        <FaMicrophone />
      </button>

      <button 
        onClick={handleSendMessage}
        className="ml-2 w-20 h-12 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md transition-colors button-hover" // Added button-hover class
      >
        Send
      </button>

      {/* Listening Indicator */}
      {isListening && (
        <div className="absolute left-0 right-0 text-center text-green-500">
          {listeningText}
        </div>
      )}
    </div>
  );
}

export default MessageInput;
