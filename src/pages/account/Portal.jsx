import React from "react";

import { Link } from "react-router-dom";

export const Portal = () => {
  return (
    <div>
      <Link to="/account/login">Log in</Link>
      <Link to="/account/register">Register</Link>
    </div>
  );
};
