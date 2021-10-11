import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Home, Account } from "./index";
import { UserProvider } from "../hooks";

export const App = () => {
  return (
    <UserProvider>
      <Router>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
      </Router>
    </UserProvider>
  );
};
