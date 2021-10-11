import React from "react";

import { useHistory, useLocation } from "react-router-dom";

import { useUser, useSetUser } from "../hooks";

//
import { log } from "../api";
//

export const Nav = () => {
  const user = useUser();
  const setUser = useSetUser();

  const history = useHistory();
  const { pathname: url } = useLocation();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/home");
    setUser(null);
  };

  return (
    <div>
      {url != "/home" && (
        <span className="material-icons" onClick={handleGoBack}>
          arrow_back_ios_new
        </span>
      )}
      {user && (
        <span className="material-icons" onClick={handleLogout}>
          logout
        </span>
      )}
    </div>
  );
};
