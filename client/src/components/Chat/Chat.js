import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { Container, Paper, Input, Button } from '@material-ui/core';

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
    <Container className="container">
      <Paper elevation={6} className="paper">
        <div className="messages">
          <h1>Messages</h1>
          {messages.map((message, i) => <Message key={i} message={message} />)}
        </div>

        <form className="form">
          <Input className="input" fullWidth type="text" placeholder="Message" value={message} onChange={({ target: { value } }) => setMessage(value)} />
          <Button color="primary" variant="outlined" fullWidth type="submit" onClick={sendMessage}>Send</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Chat;
