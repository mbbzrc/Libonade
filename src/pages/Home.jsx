import React from "react";
import { Link } from "react-router-dom";

export const Home = ({ setPlayers }) => {
  const handleNewGame = (number) => {
    setPlayers(number);
  };

  return (
    <>
      <h1>Home Page</h1>
      <Link to="/account">
        <div>Account</div>
      </Link>
      <Link to="/game">
        <div onClick={() => handleNewGame(1)}>Single Player</div>
      </Link>
      <Link to="/game">
        <div onClick={() => handleNewGame(2)}>Pass &amp; Play</div>
      </Link>
    </>
  );
};
