import React from "react";

export const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("??????????????");
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="username" required />
        <input type="password" placeholder="password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
