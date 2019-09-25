import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit('sendMessage', message, () => setMessage(''));
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input sendMessage={sendMessage} setMessage={setMessage} message={message} />
      </div>
      <div className="textContainer">
        <h1>Realtime Chat Application 💬</h1>
        <h2>Made with love using Socket.IO ❤️</h2>
        <h2>Try it out right now! ⬅️</h2>
        {
          users
            ? (
              <div>
                <h2>Currently in this room:</h2>
                <h2>{users.map(({name}) => <div>{name}</div>)}</h2>
              </div>
            )
            : null
        }
      </div>
    </div>
  );
}

export default Chat;
