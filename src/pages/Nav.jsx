import React from "react";

import { useHistory, useLocation } from "react-router-dom";

import { useUser, useSetUser } from "../hooks";

export const Nav = () => {
  const user = useUser();
  const setUser = useSetUser();

  const history = useHistory();
  const { pathname: url } = useLocation();

  const handleGoBack = () => {
    history.goBack();
  };

  const handleGoHome = () => {
    history.push("/home");
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/home");
    setUser(null);
  };

  return (
    <div>
      {url != "/home" && (
        <>
          <span className="material-icons" onClick={handleGoBack}>
            arrow_back_ios_new
          </span>
          <span className="material-icons" onClick={handleGoHome}>
            home
          </span>
        </>
      )}
      {user && (
        <span className="material-icons" onClick={handleLogout}>
          logout
        </span>
      )}
    </div>
  );
};
