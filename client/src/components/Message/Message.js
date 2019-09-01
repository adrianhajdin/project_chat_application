import React from 'react';

import './Message.css';

const Message = ({ message: { text, user } }) => {
  return (
    <div className="message">
      {user} - {text}
    </div>
  );
}

export default Message;
