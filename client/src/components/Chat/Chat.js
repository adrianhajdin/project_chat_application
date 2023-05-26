import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = process.env.REACT_APP_SERVER_ADDRESS;

let socket;


// The ID of function that tills the server that this user stoped typing.
// This function is executed after 1sc from the last change on the msg input field.
let stopedTypingFunId;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState('');

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
  }, [location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });


    socket.on('startedTyping', ({userName}) => {
      // notify all the users in the room except the typing user
      const { name } = queryString.parse(location.search);
      if (userName !== name) {
        setTypingUser(userName);
      }
    });



    socket.on('stopedTyping', ({userName}) => {
      setTypingUser((currentTypingUser) =>  (userName === currentTypingUser ?
          '' : // the current typing stoped typing
          currentTypingUser)  // the msg is irrelavent to the current typing user
        );
    });

    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [location.search]);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const theUserIsTyping = (msgLen) => {
    clearTimeout(stopedTypingFunId);

    if (msgLen%15 === 0 || msgLen === 1) {    // Send an update to the server every  
      socket.emit('startedTyping', name);     // 3 words and at the beginning.
    }

    stopedTypingFunId = setTimeout(() => {
      socket.emit('stopedTyping', name);
    }, 1000);
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} typingUser={typingUser} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} theUserIsTyping={theUserIsTyping} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
