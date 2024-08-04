import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAuth } from '@clerk/clerk-react';
import './Chat.css';  // Ensure you have styles for your chat UI

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth(); // Use Clerk's useAuth hook

  const handleSend = async () => {
    if (message.trim()) {
        // Add the user's message to the chat
        setMessages([...messages, { text: message, fromUser: true }]);
        setMessage('');

        // Indicate that the bot is thinking
        setLoading(true);

        try {
            // Retrieve the token from Clerk
            const token = await getToken({ template: 'default' });
            console.log('Retrieved Token:', token);  // Debugging line

            // Check if token is defined
            if (!token) {
                throw new Error('No token retrieved');
            }

            // Send the message to the backend
            const response = await axios.post('/api/chat/', { message }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Include JWT in the header
                }
            });

            // Add the bot's response to the chat
            setMessages(prevMessages => [
                ...prevMessages,
                { text: response.data.response, fromUser: false }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { text: 'Error: Unable to get a response from the bot', fromUser: false }
            ]);
        } finally {
            setLoading(false);
        }
    }
};



  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromUser ? 'message user-message' : 'message bot-message'}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="message bot-message">
            The bot is thinking...
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
