import React from 'react';
import { Link } from "react-router-dom";
import './Info.css';


export default function Info(){
    return (
        // Create information page about details on the project
        <div className="OuterContainer">
            <div className='InnerContainer'>
                <div className='text'>
                    <h1>About Us.</h1>
                    <p className='about'> Facilitating the growth and knowledge of learning developers.
                        <br></br> <br></br>
                        Created by Adrian Hajdin, this project was built corresponding to a Youtube tutorial on how to build and deploy a real-time chat application. 
                        Covered topics include React.js, Node.js, Express.js, and Socket.io. 
                        <br></br> <br></br>
                        Want to contribute? Find the open source project <span role="img" aria-label="emoji">➡️</span> 
                        <Link to={{ pathname: "https://github.com/adrianhajdin/project_chat_application" }} target="_blank" style={{ color: '#7CDDFF' }}>
                            Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
