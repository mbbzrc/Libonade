import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { LocalError } from "../../components";

import { useUser, useSetUser } from "../../hooks";

import { updateUser } from "../../api";

export const Update = ({ form, setForm, handleFormChange }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    return setForm({ username: "", password: "", email: "" });
  }, []);

  const { username, email } = useUser();
  const setUser = useSetUser();

  const history = useHistory();

  const checkForm = () => {
    if (!form.username && !form.password && !form.email) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!checkForm()) {
        throw new Error("Please enter something to update!");
      }
      const updatedUser = await updateUser(form);
      history.push("/account");
      setUser(updatedUser);

      // toast to confirm successful update
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
    <div>
      <h2>Update account details</h2>
      <div className="user-details">
        <h3>username: {username}</h3>
        <h3>email: {email}</h3>
      </div>
      <form>
        <label htmlFor="username">
          <span>
            username
            <span className="material-icons">help_outline</span>
          </span>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="enter new username"
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
            placeholder="enter new password"
            value={form.password}
            onChange={handleFormChange}
          />
        </label>
        <label htmlFor="email">
          <span>email </span>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="enter new email address"
            value={form.email}
            onChange={handleFormChange}
          />
        </label>
        <input type="submit" value="Update" onClick={handleSubmit} />
      </form>
      {error && <LocalError message={error} />}
    </div>
  );
};
