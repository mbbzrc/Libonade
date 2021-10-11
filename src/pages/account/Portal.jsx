import React from "react";

import { Link } from "react-router-dom";

export const Portal = () => {
  return (
    <div>
      <Link to="/account/login">
        <span className="material-icons">login</span> Log in
      </Link>
      <Link to="/account/register">
        <span className="material-icons">person_add</span> Register
      </Link>
    </div>
  );
};
