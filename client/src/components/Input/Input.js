import React from 'react';

import './Input.css';

const Input = ({ sendMessage, setMessage, message }) => (
  <form>
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
  </form>
);

export default Input;