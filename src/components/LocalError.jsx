import React from "react";

export const LocalError = ({ message }) => {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
};
