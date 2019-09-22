import React from 'react';
import { Link } from "react-router-dom";

import onlineIcon from '../../onlineIcon.png';
import closeIcon from '../../closeIcon.png';

import './InfoBar.css';

const InfoBar = () => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon}/>
      Adrian Hajdin
    </div>
    <div className="rightInnerContainer">
    <Link to="/join"><img src={closeIcon}/></Link>
    </div>
  </div>
);

export default InfoBar;