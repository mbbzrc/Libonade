import React from "react";

import { useUser, useSetUser } from "../../hooks";

export const User = () => {
  const { username, email } = useUser();
  const setUser = useSetUser();

  const handleClick = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <button onClick={handleClick}>Log Out</button>
      <h2>{username}</h2>
      <p>{email}</p>
      <h3>Saved Libonades</h3>
      {/* // map saved libonades here */}
    </div>
  );
};
