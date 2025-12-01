import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navLinks = useMemo(
    () => [
      { to: "/", label: "Home", end: true },
      { to: "/menu", label: "Menu" },
      { to: "/about", label: "About" },
      { to: "/cart", label: "Cart" },
    ],
    []
  );

  return (
    <div className="header">
      <div className="logo-container">
        <h1 className="logo-text">FoodVilla</h1>
      </div>
      <div className="nav-items">
        <ul>
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        {isLoggedIn ? (
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        ) : (
          <button className="login-btn" onClick={() => setIsLoggedIn(true)}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
