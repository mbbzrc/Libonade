const client = require("./client");

async function createStory({ title, content, players }) {
  try {
    const {
      rows: [story],
    } = await client.query(
      `
        INSERT INTO stories(title, content, players)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `,
      [title, content, players]
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

module.exports = { createStory, getAllStories };
