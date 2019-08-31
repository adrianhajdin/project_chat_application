import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import queryString from 'query-string';

import Message from '../Message/Message';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';


  useEffect(() => {
    const params = queryString.parse(location.search);

    socket = io(ENDPOINT);

    socket.emit('join', params);

    console.log('[REACH INITIALIZATION USE EFFECT]')
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message)
    });

    socket.on('receiveMessage', (message) => {
      setMessages([...messages, message]);
    });

    console.log('[REACH EVENTS USE EFFECT]')

    return () => socket.off();
  }, [messages])

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
          <input id="commonSearchTerm" type="text" placeholder="Message" value={message} onChange={({ target: { value } }) => setMessage(value)} />
          <button id="searchButton" type="submit" onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
