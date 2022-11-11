import React, { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  const extraStyles = props.style ? props.style : {};

  return (
    <input
      ref={ref}
      {...props}
      style={{
        width: "100%",
        borderRadius: "var(--border-radius)",
        padding: "0.7rem 1.5rem",
        background: "var(--white)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        ...extraStyles,
      }}
    >
      {props.children}
    </input>
  );
});
