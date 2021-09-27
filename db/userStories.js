const client = require("./client");

async function createUserStory({ userId, title, content }) {
  try {
    const {
      rows: [userStory],
    } = await client.query(
      `
            INSERT INTO user_stories("userId", title, content)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [userId, title, content]
    );
    return userStory;
  } catch (error) {
    throw error;
  }
}

async function getUserStoryById({ id, userId }) {
  try {
    const {
      rows: [userStory],
    } = await client.query(
      `
            SELECT * FROM user_stories
            WHERE id=$1 AND "userId"=$2;
        `,
      [id, userId]
    );
    return userStory;
  } catch (error) {
    throw error;
  }
}

async function getUserStoriesByUserId({ userId }) {
  try {
    const { rows: userStories } = await client.query(
      `
            SELECT * FROM user_stories
            WHERE "userId"=$1;
        `,
      [userId]
    );
    return userStories;
  } catch (error) {
    throw error;
  }
}

async function deleteUserStory({ id, userId }) {
  try {
    const {
      rows: [userStory],
    } = await client.query(
      `
            DELETE FROM user_stories
            WHERE id=$1 AND "userId"=$2
            RETURNING *;
        `,
      [id, userId]
    );
    return userStory;
  } catch (error) {
    throw error;
  }
}

async function deleteAllUserStories({ userId }) {
  try {
    const { rows: userStories } = await client.query(
      `
      DELETE FROM user_stories
      WHERE "userId"=$1
      RETURNING *;
    `,
      [userId]
    );
    return userStories;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUserStory,
  getUserStoryById,
  getUserStoriesByUserId,
  deleteUserStory,
  deleteAllUserStories,
};
