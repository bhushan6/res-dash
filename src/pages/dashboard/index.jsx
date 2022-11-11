import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { homeIcon, starIcon } from "../../utils/helpers";

const Menu = ({ icon, name, expand, selected }) => {
  const selectedStyle =
    selected === name
      ? {
          background: "var(--secondary-blue)",
          color: "var(--blue)",
        }
      : {};

  return (
    <Link style={{ textDecoration: "none" }} to={name}>
      <h1
        style={{
          fontSize: "1.2rem",
          padding: "0.5rem 1rem",
          borderRadius: "var(--border-radius)",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          margin: "0.5rem 0",
          gap: "10px",
          textTransform: "capitalize",
          ...selectedStyle,
        }}
      >
        {expand ? (
          <>
            <span>{icon}</span> {name}
          </>
        ) : (
          <span>{icon}</span>
        )}
      </h1>
    </Link>
  );
};

const SidePanel = ({ children }) => {
  const [expand, setExpand] = useState(true);

  const location = useLocation();
  const [selected, setSelected] = useState("home");

  const [offset, setOffset] = useState(null);

  const sidePanel = useRef();

  useLayoutEffect(() => {
    if (!sidePanel.current) return;

    setOffset(sidePanel.current.clientWidth);
  }, []);

  useEffect(() => {
    setSelected(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        ref={sidePanel}
        style={{
          minHeight: "100vh",
          borderRight: "1px solid rgba(0, 0, 0, 0.2)",
          width: "fit-content",
          padding: "1rem",
          transition: "width 0.5s ease",
          position: "fixed",
        }}
      >
        <div>
          <Menu
            name={"home"}
            icon={homeIcon}
            expand={expand}
            selected={selected}
          />
          <Menu
            name={"bookmark"}
            icon={starIcon("var(--blue)")}
            expand={expand}
            selected={selected}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "1rem",
          marginLeft: `${offset}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <>
      <SidePanel>
        <Outlet />
      </SidePanel>
    </>
  );
};
