export let BASE_URL;

if (process.env.NODE_ENV === "production") {
  BASE_URL = ""; // to complete once app is created on Heroku
} else {
  BASE_URL = "http://localhost:5000";
}

// export * from each module

export * from "./users";
export * from "./utils";
