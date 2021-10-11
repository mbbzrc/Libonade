import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { registerUser } from "../../api";

import { useSetUser } from "../../hooks";

import { LocalError } from "../../components/LocalError";

export const Register = ({ form, setForm, handleFormChange }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    return setForm({ username: "", password: "", email: "" });
  }, []);

  const setUser = useSetUser();

  const history = useHistory();

  const checkForm = () => {
    if (form.username.length < 1) return false;
    if (form.password.length < 1) return false;
    if (form.email.length < 1) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!checkForm()) throw new Error("Please complete all fields!");
      const newUser = await registerUser(form);
      setUser(newUser);
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

  // https://paladini.dev/posts/how-to-make-an-extremely-reusable-tooltip-component-with-react--and-nothing-else/

  return (
    <>
      <h2>create an account</h2>
      <form>
        <label htmlFor="username">
          <span>
            username <span className="material-icons">help_outline</span>
          </span>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="enter a username"
            value={form.username}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="password">
          <span>
            password <span className="material-icons">help_outline</span>
          </span>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="enter a password"
            value={form.password}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="email">
          <span>email</span>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="enter an email address"
            value={form.email}
            onChange={handleFormChange}
          />
        </label>
        <input type="submit" onClick={handleSubmit} />
      </form>
      {error && <LocalError message={error} />}
    </>
  );
};
