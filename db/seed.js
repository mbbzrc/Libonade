const client = require("./client");

const { createStory, getAllStories } = require("./stories");
const { createUser, getAllUsers } = require("./users");

async function dropTables() {
  try {
    console.log("Dropping tables...");
    await client.query(`
        DROP TABLE IF EXISTS user_stories;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS questions;
        DROP TABLE IF EXISTS stories;
        `);
    console.log("Finished dropping tables.");
  } catch (error) {
    throw error;
  }
}

async function buildTables() {
  try {
    console.log("Building tables...");
    await client.query(`
        CREATE TABLE stories(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL,
            content TEXT NOT NULL,
            players INTEGER NOT NULL
        );
        CREATE TABLE questions(
            id SERIAL PRIMARY KEY,
            question VARCHAR(255) UNIQUE NOT NULL
        );
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
        );
        CREATE TABLE user_stories(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) REFERENCES stories (title),
            date DATE DEFAULT CURRENT_DATE
        );
    `);
    console.log("Finished building tables.");
  } catch (error) {
    throw error;
  }
}

async function createInitialStories() {
  try {
    await createStory({
      title: "Brandon's Big Day",
      content:
        "Brandon woke up very excited for his big day. Today was the day that he was going to win his {NOUN} for being the {ADJECTIVE} {PROFESSION} in his entire place. Many people had tried very hard to achieve this; however, Brandon was born with the gift of {NOUN}.",
      players: 1,
    });
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    await createUser({
      username: "beesley90",
      password: "password123",
      email: "anthony@hotmail.com",
    });
  } catch (error) {
    throw error;
  }
}

async function testDatabase() {
  try {
    console.log("Initializing database tests...");

    console.log("Calling getAllStories...");
    const stories = await getAllStories();
    console.log("Result: ", stories);

    console.log("Calling getAllUsers...");
    const users = await getAllUsers();
    console.log("Result: ", users);

    // add tests here
  } catch (error) {
    throw error;
  }
}

async function rebuildDatabase() {
  try {
    await client.connect();
    await dropTables();
    await buildTables();
    await createInitialStories();
    await createInitialUsers();
    // seed data
  } catch (error) {
    throw error;
  }
}

rebuildDatabase()
  .then(testDatabase)
  .catch(console.error)
  .finally(() => client.end());
