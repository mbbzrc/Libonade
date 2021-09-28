const client = require("./client");

const { createSetString } = require("./utils");

async function createQuestion({ content, type, category, form }) {
  try {
    const {
      rows: [question],
    } = await client.query(
      `
            INSERT INTO questions(content, type, category, form)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      [content, type, category, form]
    );
    return question;
  } catch (error) {
    throw error;
  }
}

async function getAllQuestions() {
  try {
    const { rows: questions } = await client.query(`
            SELECT * FROM questions;
        `);
    return questions;
  } catch (error) {
    throw error;
  }
}

async function getQuestionById({ id }) {
  try {
    const {
      rows: [question],
    } = await client.query(
      `
      SELECT * FROM questions
      WHERE id=$1;
    `,
      [id]
    );
    return question;
  } catch (error) {
    throw error;
  }
}

async function getQuestionsByTypeCatForm({ type, category, form }) {
  let searchFields = {};
  if (type) searchFields.type = type;
  if (category) searchFields.category = category;
  if (form) searchFields.form = form;

  const whereString = Object.keys(searchFields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(" AND ");
  console.log("WHERE STRING => ", whereString);
  try {
    const { rows: questions } = await client.query(
      `
      SELECT * FROM questions
      WHERE ${whereString};
    `,
      Object.values(searchFields)
    );
    return questions;
  } catch (error) {
    throw error;
  }
}

async function updateQuestion({ id, content, type, category, form }) {
  try {
    let updateFields = {};
    if (content) updateFields.content = content;
    if (type) updateFields.type = type;
    if (category) updateFields.category = category;
    if (form) updateFields.form = form;

    const setString = createSetString(updateFields);

    const {
      rows: [question],
    } = await client.query(
      `
      UPDATE questions
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(updateFields)
    );
    return question;
  } catch (error) {
    throw error;
  }
}

async function deleteQuestion({ id }) {
  try {
    const {
      rows: [question],
    } = await client.query(
      `
    DELETE FROM questions
    WHERE id=$1
    RETURNING *;`,
      [id]
    );
    return question;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsByTypeCatForm,
  updateQuestion,
  deleteQuestion,
};
