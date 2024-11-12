import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import './AllConversations.css';

const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

let socket;

const AllConversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('newMessage', ({ conversationId, message }) => {
      setConversations(conversations => {
        const updatedConversations = conversations.map(conversation => {
          if (conversation.id === conversationId) {
            return { ...conversation, hasNewMessage: true };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="allConversations">
      {conversations.map(conversation => (
        <div
          key={conversation.id}
          className={`conversation ${conversation.hasNewMessage ? 'bold' : ''}`}
        >
          {conversation.name}
        </div>
      ))}
    </div>
  );
};

export default AllConversations;
