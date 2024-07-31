import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the chatbot application! Use the link below to start chatting.</p>
      <Link to="/chat">Go to Chatbot</Link>
    </div>
  );
}