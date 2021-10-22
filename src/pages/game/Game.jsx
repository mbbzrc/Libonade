import React from "react";

import { Switch, Route } from "react-router-dom";

import { Start } from "./index";

export const Game = ({ players }) => {
  return (
    <Switch>
      <Route path="/game">
        <Start players={players} />
      </Route>
    </Switch>
  );
};
