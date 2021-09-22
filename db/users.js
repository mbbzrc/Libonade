const client = require("./client");

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
            SELECT id, username, email
            FROM users;
        `);
    return users;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getAllUsers };
