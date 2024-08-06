import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim()) {
      const timestamp = new Date().toLocaleString(); // Capture the current timestamp

      // Add the user's message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, fromUser: true, timestamp, source: 'You ' }
      ]);
      setMessage('');

      // Indicate that the bot is thinking
      setLoading(true);

      try {
        // Send the message to the backend
        const response = await axios.post(
          'http://localhost:8000/api/chat/',
          { message },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000, // Set timeout to 10 seconds
          }
        );

        // Log the response for debugging
        console.log('API Response:', response.data);

        // Capture the timestamp for the bot's response
        const botTimestamp = new Date().toLocaleString();

        // Add the bot's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.response, fromUser: false, timestamp: botTimestamp, source: 'Gemini ' }
        ]);
      } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
        const errorTimestamp = new Date().toLocaleString();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Unable to get a response from the bot', fromUser: false, timestamp: errorTimestamp, source: 'Error' }
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromUser ? 'message user-message' : 'message bot-message'}>
            <div className="message-info">
              <span className="message-source">{msg.source}</span>
              <span className="message-timestamp">{msg.timestamp}</span>
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="message bot-message">
            Gemini is thinking...
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
