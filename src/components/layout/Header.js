import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="header">
      <div className="logo-container">
        <h1 className="logo-text">FoodVilla</h1>
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>Menu</li>
          <li><Link to="/about">About</Link></li>
          <li>Cart</li>
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
