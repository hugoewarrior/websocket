import React, { useState } from "react";
import { Route, HashRouter, Switch } from 'react-router-dom';
import { UserGreeting } from "./components/user_greeting";
import { ChatRoom } from './components/chatroom';

function App() {
  return (
    <>
      <HashRouter>
        <Switch>
          <Route exact path="/"component={UserGreeting} />
          <Route exact path="/chatroom" component={ChatRoom} />
        </Switch>
      </HashRouter>
    </>
  );
}

export default App;