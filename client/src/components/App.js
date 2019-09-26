import React from 'react';

import Chat from './Chat/Chat';
import Join from './Join/Join';

import { BrowserRouter as Router, Route , Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
