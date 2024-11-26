import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios'; // Import axios for API calls
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow'; // Import ChatWindow component
import MessageInput from './MessageInput'; // Import MessageInput component
import NewHeader from './NewHeader';
import '../styles/home.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = (newMessage) => {
    if (newMessage.trim() !== '') {
      const userMessage = { sender: 'user', text: newMessage };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
  
      // Make a POST request to the backend API
      setLoading(true); // Set loading to true while waiting for response
      axios.post('http://localhost:5000/api/chat', { message: newMessage },{ headers: { 'Content-Type': 'application/json' }, withCredentials: true })
        .then((response) => {
          const aiResponse = { sender: 'ai', text: response.data.response };
          setMessages((prevMessages) => [...prevMessages, aiResponse]);
  
          // You can update the chat list or handle any additional logic here
          updateChatList(newMessage);
        })
        .catch((error) => {
          console.error('Error fetching AI response:', error);
          const aiResponse = { sender: 'ai', text: 'Sorry, something went wrong.' };
          setMessages((prevMessages) => [...prevMessages, aiResponse]);
        })
        .finally(() => {
          setLoading(false); // Reset loading state
        });
    }
  };
  

  const updateChatList = () => {
    loadPreviousChats();
  };

  const loadPreviousChats = () => {
    setLoading(true); // Set loading to true while fetching chats
    axios.get('http://localhost:5000/api/conversations',{withCredentials:true})
      .then(response => {
        setPreviousChats(response.data);
      })
      .catch(error => console.error('Error loading chats:', error))
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  useEffect(() => {
    loadPreviousChats();
  }, []);

  const displayFullChat = (chatId) => {
    setCurrentConversationId(chatId); // Set the current conversation ID
    axios.get(`http://localhost:5000/api/conversation/${chatId}`, { withCredentials: true })
      .then(response => {
        // Extract the conversation messages
        const formattedMessages = response.data.conversation.map(entry => [
          { sender: 'user', text: entry.user }, // Format for the user message
          { sender: 'ai', text: entry.ai },     // Format for the AI response
        ]).flat();

        // Set the formatted messages in the state
        setMessages(formattedMessages);
      })
      .catch(error => {
        console.error('Error loading chat:', error);
      });
};


const handleNewConversation = () => {
  axios.post('http://localhost:5000/api/start_new_conversation', {}, { withCredentials: true })
    .then((response) => {
      // Clear previous messages in the chat window
      setMessages([]);

      // Set the current conversation ID based on the response
      setCurrentConversationId(response.data._id);

      // Load previous chats, including the new conversation
      loadPreviousChats();
    })
    .catch((error) => {
      console.error('Error starting a new conversation:', error);
    });
};

  // Function to handle chat deletion
  const handleDeleteChat = (chatId) => {
    axios.delete(`http://localhost:5000/api/conversation/${chatId}`, { withCredentials: true })
      .then(() => {
        // Update the sidebar by filtering out the deleted conversation
        setPreviousChats((prevChats) => prevChats.filter(chat => chat.conversationId !== chatId));
      })
      .catch((error) => {
        console.error('Error deleting chat:', error);
      });
};


  return (
    <div className='home-body'>
      <div className="flex flex-col h-screen">
      <NewHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-grow relative overflow-hidden">
        <div
          className={`transition-transform duration-1000 ease-in-out h-full ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-10 absolute`}
          style={{ width: '250px' }}
        >
          <Sidebar 
            previousChats={previousChats} 
            onChatClick={displayFullChat} 
            onNewChat={handleNewConversation} 
            onDeleteChat={handleDeleteChat}  // Pass the delete handler
          />
        </div>

        <div
          className={`flex-grow transition-all duration-1000 ease-in-out flex flex-col ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}
          style={{
            marginLeft: isSidebarOpen ? '250px' : '0',
          }}
        >
          <div className="flex flex-col flex-grow h-full min-h-0">
            <ChatWindow messages={messages} loading={loading} /> {/* Pass loading state to ChatWindow */}
            <MessageInput isSidebarOpen={isSidebarOpen} onSendMessage={handleSendMessage} />
            
          </div>
        </div>
      </div>
    </div>

    </div>
  );
}

export default App;
