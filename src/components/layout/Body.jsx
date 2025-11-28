import { useEffect, useState } from "react";
import RestaurantCard from "../restaurant/RestaurantCard.js";
import Shimmer from "./Shimmer.jsx";
import { TOP_RATING_CUTOFF } from "../../utils/constants.js";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await response.json();

        // Swiggy response nests restaurants inside cards.
        const cards = json?.data?.cards || [];
        const restaurantCard = cards.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );
        const swiggyList =
          restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        setRestaurants(swiggyList);
        setAllRestaurants(swiggyList);
      } catch (error) {
        console.error("Failed to fetch restaurants from Swiggy", error);
        setRestaurants([]);
        setAllRestaurants([]);
      } finally {
        setLoading(false);
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

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setRestaurants(allRestaurants);
      setSearchPerformed(false);
      setCountdown(null);
    }
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      setRestaurants(allRestaurants);
      setSearchPerformed(false);
      setCountdown(null);
      return;
    }

    const filteredList = allRestaurants.filter(({ info }) =>
      info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setRestaurants(filteredList);
    setSearchPerformed(true);

    if (filteredList.length === 0) {
      setCountdown(5);
    } else {
      setCountdown(null);
    }
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown <= 0) {
      setSearchText("");
      setRestaurants(allRestaurants);
      setSearchPerformed(false);
      setCountdown(null);
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, allRestaurants]);

  return (
    <div className="body">
      <div className="search">
        <input
          type="text"
          className="search-box"
          placeholder="Search for restaurants..."
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <button
          className="search-btn"
          onClick={handleSearch}
          disabled={!searchText.trim()}
        >
          Search
        </button>
      </div>
      <div className="filter">
        <button className="filter-btn" onClick={handleTopRated}>Top Rated Restaurants</button>
        <button className="filter-btn">Lowest Rated Restaurants</button>
        <button className="filter-btn">Highest Rated Restaurants</button>
      </div>
      {loading ? (
        <Shimmer />
      ) : restaurants.length === 0 && searchPerformed ? (
        <div className="no-results">
          <h3>No restaurants found by this name.</h3>
          {countdown !== null && (
            <p>Resetting search in {countdown} second{countdown === 1 ? "" : "s"}...</p>
          )}
        </div>
      ) : (
        <div className="restaurant-container">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
