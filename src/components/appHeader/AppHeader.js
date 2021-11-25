import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./appHeader.scss";

const AppHeader = () => {
  const [state, setState] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("comics")) {
      setState(false);
    } else {
      setState(true);
    }
  }, [pathname]);

  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink className={state ? "active" : ""} to="/characters">
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink className={!state ? "active" : ""} to="/comics">
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
