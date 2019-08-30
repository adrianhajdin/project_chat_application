import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Message from '../Message/Message';
import './Chat.css'

const socket = io('localhost:5000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('enter', (welcomeMessage) => {
      console.log(welcomeMessage);
    });

    socket.on('message', (message) => {
      console.log(message);
    });

    socket.on('receiveMessage', (message) => {
      console.log('receiveMessage', message)
      setMessages([...messages, message]);
    });


    return () => socket.off('receiveMessage');
  }, [messages])

  const handleChange = ({ target: { value } }) => setMessage(value);

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit('sendMessage', message, () => {
      console.log('Message sucessfully sent!')
    });

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
