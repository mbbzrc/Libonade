const client = require("./client");

const { createSetString } = require("./utils");

async function createStory({ title, content, category, players }) {
  try {
    const {
      rows: [story],
    } = await client.query(
      `
        INSERT INTO stories(title, content, category, players)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `,
      [title, content, category, players]
    );
    return story;
  } catch (error) {
    throw error;
  }
}

async function getAllStories() {
  try {
    const { rows: stories } = await client.query(`
      SELECT * FROM stories`);
    return stories;
  } catch (error) {}
}

async function getStoryById({ id }) {
  try {
    const {
      rows: [story],
    } = await client.query(
      `
      SELECT * FROM stories
      WHERE id=$1;
    `,
      [id]
    );
    return story;
  } catch (error) {
    throw error;
  }
}

async function getStoriesByCategory({ category }) {
  try {
    const { rows: stories } = await client.query(
      `
      SELECT * FROM stories
      WHERE category=$1;
    `,
      [category]
    );
    return stories;
  } catch (error) {
    throw error;
  }
}

async function getStoriesByPlayers({ players }) {
  try {
    const { rows: stories } = await client.query(
      `
      SELECT * FROM stories
      WHERE players=$1;
    `,
      [players]
    );
    return stories;
  } catch (error) {
    throw error;
  }
}

async function updateStory({ id, title, content, category, players }) {
  try {
    let updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;
    if (category) updateFields.category = category;
    if (players) updateFields.players = players;

    const setString = createSetString(updateFields);

    const {
      rows: [story],
    } = await client.query(
      `
      UPDATE stories
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(updateFields)
    );
    return story;
  } catch (error) {
    throw error;
  }
}

async function deleteStory({ id }) {
  try {
    const {
      rows: [story],
    } = await client.query(
      `
      DELETE FROM stories
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createStory,
  getAllStories,
  getStoryById,
  getStoriesByCategory,
  getStoriesByPlayers,
  updateStory,
  deleteStory,
};
