import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  if(user === 'admin'){
    return(
      <div className="messageContainer" style={{justifyContent:'center'}}>
        <div className="messageBox" style={{backgroundColor:'rgb(169 159 159 / 40%)'}}>
          <span className="sentText pl-10 ">{user}</span>
          <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    )
  }
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
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
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;