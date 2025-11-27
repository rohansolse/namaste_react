import { useEffect, useState } from "react";
import RestaurantCard from "../restaurant/RestaurantCard.js";
import resList from "../../utils/mockData.js";
import { TOP_RATING_CUTOFF } from "../../utils/constants.js";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await response.json();

        // Swiggy response nests restaurants inside cards; fallback to mock data if missing.
        const cards = json?.data?.cards || [];
        const restaurantCard = cards.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        console.log("restaurantCard : ",  restaurantCard);
        const swiggyList =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        console.log("swiggyList : ",  swiggyList);
        const list = swiggyList?.length ? swiggyList : resList;
        setRestaurants(list);
        setAllRestaurants(list);
      } catch (error) {
        console.error("Failed to fetch restaurants from Swiggy", error);
        setRestaurants(resList);
        setAllRestaurants(resList);
      }
    };

    fetchRestaurants();
  }, []);

  const handleTopRated = () => {
    const filteredList = allRestaurants.filter(
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
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
