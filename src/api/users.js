import axios from "axios";

import { BASE_URL } from "./index";

import { createAuthHeader } from "./utils";

export async function registerUser({ username, password, email }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/users/register`, {
      username: username,
      password: password,
      email: email,
    });
    localStorage.setItem("token", JSON.stringify(data.token));
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function loginUser({ username, password }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/users/login`, {
      username: username,
      password: password,
    });
    localStorage.setItem("token", JSON.stringify(data.token));
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function updateUser({ username, password, email }) {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/api/users/account`,
      {
        username: username,
        password: password,
        email: email,
      },
      createAuthHeader()
    );
    return data.updatedUser;
  } catch (error) {
    throw error;
  }
}
