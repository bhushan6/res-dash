import React from "react";

const Input = (props) => {
  const extraStyles = props.style ? props.style : {};

  return (
    <input
      {...props}
      style={{
        width: "100%",
        boxShadow: "4px 6px 15px 0px #0000000",
        borderRadius: "var(--border-radius)",
        padding: "0.7rem 1.5rem",
        background: "var(--white)",
        ...extraStyles,
      }}
    />
  );
};

export const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("??????????????");
  };

  return (
    <div
      className="login-container"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "clamp(350px, 30vw, 410px)",
          padding: "2.5rem 1.5rem",
        }}
      >
        <h1>Sign In</h1>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "2rem 0",
            gap: "1rem",
          }}
        >
          <Input type="text" placeholder="username" required />
          <Input type="password" placeholder="password" required />
          <button
            type="submit"
            style={{
              boxShadow: " 4px 6px 15px 0px #0000000",
              background: "var(--black)",
              width: "100%",
              borderRadius: "var(--border-radius)",
              padding: "0.7rem 1.5rem",
              color: "var(--white)",
              cursor: "pointer",
              border: "none",
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
