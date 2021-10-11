import React from "react";

import { Link } from "react-router-dom";

import { useUser } from "../../hooks";

export const User = () => {
  const { username, email } = useUser();

  return (
    <div>
      <div className="user-details">
        <h2>{username}</h2>
        <p>{email}</p>
      </div>
      <Link to="/account/update">Manage my account</Link>
      <h3>Saved Libonades</h3>
      {/* // map saved libonades here */}
    </div>
  );
};
