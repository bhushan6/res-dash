import React, { useEffect } from "react";
import { useNotifications } from "../contexts";
import { closeIcon, SNACKBAR_TYPES } from "../utils/helpers";

const closeIconEle = closeIcon();

const Bar = ({ id, message, type = SNACKBAR_TYPES.SUCESS }) => {
  const { removeNotification } = useNotifications();

  useEffect(() => {
    const t = setTimeout(() => {
      removeNotification(id);
    }, 3000);

    return () => t && clearTimeout(t);
  }, [id]);

  return (
    <div
      style={{
        background: type,
        borderRadius: "var(--border-radius)",
        padding: "1rem 1.5rem",
        pointerEvents: "all",
        margin: "0.2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.5rem",
        color: "white",
        width: "350px",
      }}
    >
      <div>{message}</div>
      <div style={{ cursor: "pointer" }} onClick={() => removeNotification(id)}>
        {closeIconEle}
      </div>
    </div>
  );
};

export const Snackbar = () => {
  const { notifications } = useNotifications();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "end",
        padding: "1rem",
        pointerEvents: "none",
      }}
    >
      {Object.entries(notifications).map(([id, body]) => {
        return <Bar key={id} id={id} message={body.message} type={body.type} />;
      })}
    </div>
  );
};
