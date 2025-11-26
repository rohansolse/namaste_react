const Header = () => (
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
      <button className="login-btn">Login</button>
    </div>
  </div>
);

export default Header;