const client = require("./client");

const { createSetString } = require("./utils");

async function createWord({ content, type, category, form }) {
  try {
    const {
      rows: [word],
    } = await client.query(
      `
            INSERT INTO words(content, type, category, form)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      [content, type, category, form]
    );
    return word;
  } catch (error) {
    throw error;
  }
}

async function getAllWords() {
  try {
    const { rows: words } = await client.query(`
            SELECT * FROM words;
        `);
    return words;
  } catch (error) {
    throw error;
  }
}

async function getWordById({ id }) {
  try {
    const {
      rows: [word],
    } = await client.query(
      `
      SELECT * FROM words
      WHERE id=$1;
    `,
      [id]
    );
    return word;
  } catch (error) {
    throw error;
  }
}

async function getWordsByTypeCatForm({ type, category, form }) {
  let searchFields = {};
  if (type) searchFields.type = type;
  if (category) searchFields.category = category;
  if (form) searchFields.form = form;

  const whereString = Object.keys(searchFields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(" AND ");

  try {
    const { rows: words } = await client.query(
      `
      SELECT * FROM words
      WHERE ${whereString};
    `,
      Object.values(searchFields)
    );
    return words;
  } catch (error) {
    throw error;
  }
}

async function updateWord({ id, content, type, category, form }) {
  try {
    let updateFields = {};
    if (content) updateFields.content = content;
    if (type) updateFields.type = type;
    if (category) updateFields.category = category;
    if (form) updateFields.form = form;

    const setString = createSetString(updateFields);

    const {
      rows: [word],
    } = await client.query(
      `
      UPDATE words
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(updateFields)
    );
    return word;
  } catch (error) {
    throw error;
  }
}

async function deleteWord({ id }) {
  try {
    const {
      rows: [word],
    } = await client.query(
      `
      DELETE FROM words
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    return word;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createWord,
  getAllWords,
  getWordById,
  getWordsByTypeCatForm,
  updateWord,
  deleteWord,
};
