import React, { useState } from "react";
import io from "socket.io-client";

import Message from '../Message/Message';
import './Chat.css'

const socket = io('localhost:5000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  socket.on('RECEIVE_MESSAGE', (data) => {
    setMessages([...messages, data]);

  });

  socket.on('INIT', (data) => {
    console.log(data);
  })

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit('SEND_MESSAGE', message);

    setMessage('');
  }

  return (
    <div className="container">
      <div className="rectangle">
        <div className="messages">
          <h1>Messages</h1>
          {messages.map((message, i) => <Message key={i} message={message} />)}
        </div>

        <form className="form">
          <input id="commonSearchTerm" type="text" placeholder="Message" value={message} onChange={handleChange} />
          <button id="searchButton" type="submit" onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
