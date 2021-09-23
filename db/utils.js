function createSetString(fields) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  return setString;
}

module.exports = { createSetString };
