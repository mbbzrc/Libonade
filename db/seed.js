const client = require("./client");

const { hash, genSalt } = require("bcrypt");

const { createStory, getAllStories } = require("./stories");
const { createQuestion, getAllQuestions } = require("./questions");
const { createWord, getAllWords } = require("./words");
const { createUser, getAllUsers } = require("./users");

async function dropTables() {
  try {
    console.log("Dropping tables...");
    await client.query(`
        DROP TABLE IF EXISTS user_stories;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS words;
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
            category VARCHAR(255) NOT NULL,
            players INTEGER NOT NULL
        );
        CREATE TABLE questions(
            id SERIAL PRIMARY KEY,
            content VARCHAR(255) UNIQUE NOT NULL,
            type VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            form VARCHAR(255) NOT NULL
        );
        CREATE TABLE words(
            id SERIAL PRIMARY KEY,
            content VARCHAR(255) UNIQUE NOT NULL,
            type VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
            form VARCHAR(255) NOT NULL
        );
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            "isAdmin" BOOLEAN NOT NULL DEFAULT FALSE
        );
        CREATE TABLE user_stories(
            id SERIAL PRIMARY KEY,
            "userId" INTEGER NOT NULL REFERENCES users,
            title VARCHAR(255) NOT NULL REFERENCES stories (title),
            content TEXT NOT NULL,
            date DATE NOT NULL DEFAULT CURRENT_DATE
        );
    `);
    console.log("Finished building tables.");
  } catch (error) {
    throw error;
  }
}

async function createInitialStories() {
  console.log("Seeding stories...");
  const initialStories = [
    {
      title: "Brandon's Big Day",
      content:
        "Brandon woke up very excited for his big day. Today was the day that he was going to win his {COMMON NOUN} for being the {ADJECTIVE} {PROFESSION} in his entire place. Many people had tried very hard to achieve this; however, Brandon was born with the gift of {COMMON NOUN}.",
      category: "anecdote",
      players: 1,
    },
    {
      title: "I can't believe this!",
      content:
        "I can't believe this! When I left the {PLACE} this morning, I was in a state of shock. I had pre-ordered a {COMMON NOUN} but when I went to pick it up, the lady at the counter {VERB PAST TRANSITIVE} me and said I should just {VERB PRESENT}.",
      category: "anecdote",
      players: 1,
    },
  ];
  try {
    await Promise.all(
      initialStories.map((story) => {
        createStory(story);
      })
    );
    console.log("Finished seeding stories.");
  } catch (error) {
    throw error;
  }
}

async function createInitialQuestions() {
  console.log("Seeding questions...");
  const initialQuestions = [
    {
      content: "What is the most disgusting vegetable on earth?",
      type: "noun-common",
      category: "food",
      form: "singular",
    },
    {
      content: "What is the first name of your favorite aunt?",
      type: "noun-proper",
      category: "person",
      form: "singular",
    },
  ];
  try {
    await Promise.all(
      initialQuestions.map((question) => {
        createQuestion(question);
      })
    );
    console.log("Finished seeding questions.");
  } catch (error) {
    throw error;
  }
}

async function createInitialWords() {
  console.log("Seeding words...");
  const initialWords = [
    {
      content: "horse",
      type: "noun-common",
      category: "animal",
      form: "singular",
    },
    {
      content: "Nicki Minaj",
      type: "noun-proper",
      category: "person",
      form: "singular",
    },
  ];
  try {
    Promise.all(
      initialWords.map((word) => {
        createWord(word);
      })
    );
    console.log("Finished seeding words.");
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Seeding initial users...");
  const initialUsers = [
    {
      username: "beesley90",
      password: "Password123$",
      email: "anthony@hotmail.com",
      isAdmin: true,
    },
    {
      username: "bob21",
      password: "Password123$",
      email: "bob@yahoo.com",
      isAdmin: false,
    },
    {
      username: "dana99",
      password: "Password123$",
      email: "dana@gmail.com",
      isAdmin: false,
    },
  ];
  try {
    await Promise.all(
      initialUsers.map(async ({ username, password, email, isAdmin }) => {
        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);
        createUser({ username, password: hashedPassword, email, isAdmin });
      })
    );
    console.log("Finished seeding initial users.");
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

    console.log("Calling getAllQuestions...");
    const questions = await getAllQuestions();
    console.log("Result: ", questions);

    console.log("Calling getAllWords...");
    const words = await getAllWords();
    console.log("Result: ", words);

    console.log("Calling getAllUsers...");
    const users = await getAllUsers();
    console.log("Result: ", users);

    console.log("Finished testing database.");
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
    await createInitialQuestions();
    await createInitialWords();
    await createInitialUsers();
  } catch (error) {
    throw error;
  }
}

rebuildDatabase()
  .then(testDatabase)
  .catch(console.error)
  .finally(() => client.end());
