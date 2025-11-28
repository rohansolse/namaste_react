import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="header">
      <div className="logo-container">
        <h1 className="logo-text">FoodVilla</h1>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>Menu</li>
          <li>About</li>
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