export function log(name, data) {
  return console.log(`LOGGING => ${name} => `, data || "");
}

export function createAuthHeader() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    console.error("Unable to create authorization header!");
  }
}
