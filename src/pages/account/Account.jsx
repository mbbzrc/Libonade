import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import { Portal, Login, Register, User, Update } from "./index";

import { useUser } from "../../hooks";

export const Account = () => {
  const [form, setForm] = useState({ username: "", password: "", email: "" });

  const user = useUser();

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Switch>
      {!user && (
        <Route path="/account/login">
          <Login
            form={form}
            setForm={setForm}
            handleFormChange={handleFormChange}
          />
        </Route>
      )}
      {!user && (
        <Route path="/account/register">
          <Register
            form={form}
            setForm={setForm}
            handleFormChange={handleFormChange}
          />
        </Route>
      )}
      <Route path="/account/update">
        <Update
          form={form}
          setForm={setForm}
          handleFormChange={handleFormChange}
        />
      </Route>
      <Route path="/account">
        {user ? (
          <>
            <User />
            {/* <UserStories /> */}
          </>
        ) : (
          <Portal />
        )}
      </Route>
    </Switch>
  );
};
