// src/components/MessageInput.js

import React from 'react';

function MessageInput({ isSidebarOpen }) {
  return (
    <div className={`flex items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-md transition-all duration-500 w-full`}>
      <textarea
        className={`flex-grow h-12 p-2 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-500 resize-none transition-all duration-500 ${isSidebarOpen ? 'w-[calc(100%-80px)]' : 'w-full'}`}
        placeholder="Type your message..."
      />
      <button className="ml-4 w-20 h-12 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md transition-colors">
        Send
      </button>
    </div>
  );
}

export default MessageInput;
