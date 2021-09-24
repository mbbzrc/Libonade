const client = require("./client");

const { getUserStoriesByUserId } = require("./userStories");
const { createSetString } = require("./utils");

async function appendUserStories(user) {
  try {
    const userStories = await getUserStoriesByUserId(user);

    if (userStories.length < 1) return user;

    user.userStories = userStories;

    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser({ username, password, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password, email)
            VALUES ($1, $2, $3)
            RETURNING id, username, email;
        `,
      [username, password, email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
            SELECT *
            FROM users;
        `);
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById({ id }) {
  try {
    let {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE id=$1;
    `,
      [id]
    );

    if (!user) return null;

    user = await appendUserStories(user);

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername({ username }) {
  try {
    let {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE username=$1;
    `,
      [username]
    );

    if (!user) return null;

    user = appendUserStories(user);

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser({ id, username, password, email }) {
  try {
    let updateFields = {};
    if (username) updateFields.username = username;
    if (password) updateFields.password = password;
    if (email) updateFields.email = email;

    const setString = createSetString(updateFields);

    const {
      rows: [user],
    } = await client.query(
      `
    UPDATE users
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `,
      Object.values(updateFields)
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteUser({ id }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      DELETE FROM users
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
};
