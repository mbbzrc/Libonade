import React, { useState } from "react";

export const Start = () => {
  const [toggle, setToggle] = useState(false);

  const categories = [
    "Western",
    "Mystery",
    "Thriller",
    "Horror",
    "Romance",
    "Anecdote",
    "Historical",
    "News Report",
    "Sci-Fi",
    "Fantasy",
  ];
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleStartGame = (category) => {
    // how to handle API call for story by category?
  };

  return (
    // if players == 0 (i.e. refreshed) Redirect to Home
    <>
      <div onClick={handleStartGame}>Random</div>
      <div onClick={handleToggle}>Category</div>
      {toggle &&
        categories.map((category) => {
          return (
            <div key={category} onClick={() => handleStartGame(category)}>
              {category}
            </div>
          );
        })}
    </>
  );
};
