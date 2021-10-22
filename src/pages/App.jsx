import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Home, Nav, Account, Game } from "./index";
import { UserProvider } from "../hooks";

export const App = () => {
  const [players, setPlayers] = useState(0);

  return (
    <UserProvider>
      <Router>
        <Nav />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home setPlayers={setPlayers} />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/game">
          <Game players={players} />
        </Route>
      </Router>
    </UserProvider>
  );
};
