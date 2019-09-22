import React from 'react';

import './Message.css';

const Message = ({ message: { text, user } }) => {
  return (
    <div className="messageBoxOne">
      <p className="messageTextOne">{text}</p>
    </div>
  );
}

export default Message;