import RestaurantCard from "../restaurant/RestaurantCard.js";
import resList from "../../utils/mockData.js";

const Body = () => (
  <div className="body">
    <div className="search">
      <input type="text" className="search-box" placeholder="Search for restaurants..." />
      <button className="search-btn">Search</button>
    </div>
    <div className="restaurant-container">
      {resList.map(restaurant => <RestaurantCard key={restaurant.info.id} resData={restaurant} />)}
    </div>
  </div>
);

export default Body;