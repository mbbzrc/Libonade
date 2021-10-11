import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/account">
        <div>Account</div>
      </Link>
      <Link to="/game">
        <div>Single Player</div>
      </Link>
      <Link to="/game">
        <div>Pass &amp; Play</div>
      </Link>
    </>
  );
};
