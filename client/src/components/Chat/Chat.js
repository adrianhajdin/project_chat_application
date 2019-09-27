import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';

import onlineIcon from '../../icons/onlineIcon.png';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

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

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="buttonSend" onClick={e => sendMessage(e)}>Send</button>
          </form>
      </div>
      <div className="textContainer">
        <div>
          <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
          <h2>Created with React, Express, Node and Socket.IO <span role="img" aria-label="emoji">❤️</span></h2>
          <h2>Try it out right now! <span role="img" aria-label="emoji">⬅️</span></h2>
        </div>
        {
          users
            ? (
              <div>
                <h1>People currently chatting:</h1>
                <div className="activeContainer">
                  <h2>
                    {users.map(({name}) => (
                      <div key={name} className="activeContainer">
                        {name}
                        <img alt="Online Icon" src={onlineIcon}/>
                      </div>
                    ))}
                  </h2>
                </div>
              </div>
            )
            : null
        }
      </div>
    </div>
  );
}

export default Chat;
