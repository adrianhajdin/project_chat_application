import React from 'react';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  console.log(name, user)

  if(user === name) {
    isSentByCurrentUser = true;
    console.log('[Message was sent by YOU]')
  }

  return (
    isSentByCurrentUser
    ? (
      <div className="messageContainerTwo">
        <div className="messageBoxTwo">
          <p className="messageTextTwo">{text}</p>
        </div>
        </div>
      )
      : (
          <div className="messageBoxOne">
            <p className="messageTextOne">{text}</p>
          </div>
      )
  );
}

export default Message;