import React, { useState, useEffect } from "react";
import { Container, Paper, Input, Button, Typography } from '@material-ui/core';
import queryString from 'query-string';
import io from "socket.io-client";

import Message from '../Message/Message';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [message, setMessage] = useState({ text: '', delivered: false, read: false });
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const params = queryString.parse(location.search);

    socket = io(ENDPOINT);

    socket.emit('join', params);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit('sendMessage', message, () => {
      setMessage({ ...message, text: message.text, delivered: true});
      setMessage({ text: ''});
    });
  }

  return (
    <Container className="container">
      <Paper elevation={6} className="paper">
        <div className="messages">
          <Typography variant="h4" gutterBottom>Messages</Typography>
          {messages.map(({text}, i) => <Message key={i} message={text} />)}
        </div>

        <form className="form">
          <Input className="input" fullWidth type="text" placeholder="Message" value={message.text} onChange={({ target: { value } }) => setMessage({text: value})} />
          <Button color="primary" variant="outlined" fullWidth type="submit" onClick={sendMessage}>Send</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Chat;
