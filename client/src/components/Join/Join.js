import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>

        <Link to="/info">
          <Button
            class ="button"
            style={{
            borderRadius: 7,
            backgroundColor: "#333339",
            fontSize: "12px" }}
            >About Us
          </Button>
        </Link>

      </div>
    </div>
  );
}
