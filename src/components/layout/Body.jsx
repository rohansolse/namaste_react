import { useState } from "react";
import RestaurantCard from "../restaurant/RestaurantCard.js";
import resList from "../../utils/mockData.js";
import { TOP_RATING_CUTOFF } from "../../utils/constants.js";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);


  const handleTopRated = () => {
    const filteredList = resList.filter(
      ({ info }) => info?.avgRating >= TOP_RATING_CUTOFF
    );

    setRestaurants(filteredList);
  };

  return (
    <div className="body">
      <div className="search">
        <input type="text" className="search-box" placeholder="Search for restaurants..." />
        <button className="search-btn">Search</button>
      </div>
      <div className="filter">
        <button className="filter-btn" onClick={handleTopRated}>Top Rated Restaurants</button>
        <button className="filter-btn">Lowest Rated Restaurants</button>
        <button className="filter-btn">Highest Rated Restaurants</button>
      </div>
      <div className="restaurant-container">
        {restaurants.map(restaurant => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
