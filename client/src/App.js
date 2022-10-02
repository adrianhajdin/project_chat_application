import React from 'react';


// REAL PROJECT
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import Info from './components/Information/Info';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (

    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/info" component={Info} />
    </Router>

  );
}

export default App;
