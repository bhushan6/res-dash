import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/AuthContext";
import { Axios } from "../../utils/helpers";

const Input = forwardRef((props, ref) => {
  const extraStyles = props.style ? props.style : {};

  return (
    <input
      ref={ref}
      {...props}
      style={{
        width: "100%",
        boxShadow: "4px 6px 15px 0px #0000000",
        borderRadius: "var(--border-radius)",
        padding: "0.7rem 1.5rem",
        background: "var(--white)",
        border: "2px solid var(--black)",
        ...extraStyles,
      }}
    />
  );
});

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const error = useRef("");

  const [, setUser] = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userDetails = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };

    try {
      const {
        data: { records },
      } = await Axios("credenitals?maxRecords=3&view=Grid%20view");

      let areRightCreds = false;
      records.forEach(({ fields: { username, password } }) => {
        if (
          username === userDetails.username &&
          password === userDetails.password
        ) {
          areRightCreds = true;
        }
      });

      if (areRightCreds) {
        sessionStorage["user"] = JSON.stringify(userDetails);
        setUser(userDetails);
      }

      if (!areRightCreds) {
        error.current = "Password or Username was wrong";
      }
    } catch (err) {
      console.log(err);
      error.current = "error";
    }
    setLoading(false);
  };

  const usernameRef = useRef();
  const passwordRef = useRef();

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
          <Input
            ref={usernameRef}
            type="text"
            placeholder="username"
            required
          />
          <Input
            ref={passwordRef}
            type="password"
            placeholder="password"
            required
          />
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p
            style={{
              fontSize: "12px",
              color: "red",
              width: "100%",
              textAlign: "left",
              fontWeight: 500,
            }}
          >
            {error.current}
          </p>
        </form>
      </div>
    </div>
  );
};
