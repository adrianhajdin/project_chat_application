import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
    />
    <button className="sendButton" onClick={()=> sendMessage(message)}>Send</button>
  </form>
)

export default Input;