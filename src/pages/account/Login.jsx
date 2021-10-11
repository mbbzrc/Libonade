import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { loginUser } from "../../api";

import { useSetUser } from "../../hooks";

import { LocalError } from "../../components";

export const Login = ({ form, setForm, handleFormChange }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    return setForm({ username: "", password: "", email: "" });
  }, []);

  const setUser = useSetUser();

  const history = useHistory();

  const checkForm = () => {
    if (form.username.length < 1) return false;
    if (form.password.length < 1) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!checkForm()) throw new Error("Please complete all fields!");
      const loggedInUser = await loginUser({
        username: form.username,
        password: form.password,
      });
      setUser(loggedInUser);
      history.push("/account");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
      console.error(error);
    }
  };

  return (
    <>
      <h2>log in</h2>
      <form>
        <label htmlFor="username">
          <span>username </span>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="enter username"
            value={form.username}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="password">
          <span>password </span>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="enter password"
            value={form.password}
            onChange={handleFormChange}
          />
        </label>
        <input type="submit" value="Log In" onClick={handleSubmit} />
      </form>
      {error && <LocalError message={error} />}
    </>
  );
};
