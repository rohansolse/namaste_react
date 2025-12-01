import { MENU_SECTIONS } from "../../utils/constants.js";

const Menu = () => (
  <div className="menu-page">
    <header className="menu-hero">
      <div>
        <p className="menu-kicker">Curated for cravings</p>
        <h1>Menu Highlights</h1>
        <p className="menu-subtitle">
          Browse chef-crafted picks and healthy favorites. Click a section to explore.
        </p>
      </div>
      <div className="menu-tag">Fresh Daily</div>
    </header>

    <div className="menu-grid">
      {MENU_SECTIONS.map((section) => (
        <article key={section.title} className="menu-card">
          <div className="menu-card-head">
            <h2>{section.title}</h2>
            <span className="menu-chip">{section.items.length} items</span>
          </div>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className="menu-cta">View details</button>
        </article>
      ))}
    </div>
  </div>
);

export default Menu;
