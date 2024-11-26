import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const Sidebar = ({ previousChats, onChatClick, onNewChat, onDeleteChat }) => {
  return (
    <div className="h-full bg-gray-200 dark:bg-gray-900 shadow-md p-4 relative">
      <p className="text-gray-800 dark:text-white">Previous Chats</p>
      <button
        onClick={onNewChat}
        className="absolute top-4 right-4 text-blue-500 hover:text-blue-700 focus:outline-none"
      >
        <FontAwesomeIcon icon={faPlus} size="lg" />
      </button>
      <ul>
        {console.log(previousChats)}
        {previousChats.length > 0 ? (
          previousChats.map((chat) => (
            <li key={chat.conversationId} className="flex justify-between items-center">
              <button
                className="w-full text-left py-2 px-4 border-b border-gray-300 dark:border-gray-700 truncate"
                onClick={() => onChatClick(chat.conversationId)}
              >
                {chat.firstMessage || 'Empty Conversation'}
              </button>
              <button
                className="text-red-500 hover:opacity-55 p-2"
                onClick={() => onDeleteChat(chat.conversationId)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </li>
          ))
        ) : (
          <li>
            <p className="py-2 px-4 text-gray-600 dark:text-gray-400">No previous chats available.</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
