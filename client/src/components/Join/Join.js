import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css'

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1>Join</h1>
          <div>
            <input placeholder="Name" className="joinInput" type="text" onChange={(event) => {setName(event.target.value)}} />
          </div>
          <div>
            <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => {setRoom(event.target.value)}} />
          </div>
          <Link to={`/chat?name=${name}&room=${room}`}>
            <button className="button mt-20" type="submit">Sign In</button>
          </Link>
      </div>
    </div>
  );
}
