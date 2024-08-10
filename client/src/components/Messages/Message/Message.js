import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const capitalizeName = (name) => {
  let data = name
  let char = data.slice(0,1).toUpperCase()
  return name.replace(data.charAt(0),char)
}

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{capitalizeName(trimmedName)}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{capitalizeName(user)}</p>
          </div>
        )
  );
}

export default Message;