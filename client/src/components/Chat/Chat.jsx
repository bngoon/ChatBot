import React, { useState } from 'react';
import './Chat.css'; // Ensure this path is correct

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, fromUser: true }]);
      setMessage('');
      
      // Simulate a response from the chatbot
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: `You said: ${message}`, fromUser: false }
        ]);
      }, 1000);
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
