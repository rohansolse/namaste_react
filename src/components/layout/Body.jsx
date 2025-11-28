import { useEffect, useState } from "react";
import RestaurantCard from "../restaurant/RestaurantCard.js";
import Shimmer from "./Shimmer.jsx";
import { TOP_RATING_CUTOFF, SWIGGY_API_URL, CORS_PROXIES } from "../../utils/constants.js";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        let json = null;

        for (const proxy of CORS_PROXIES) {
          try {
            const response = await fetch(`${proxy}${encodeURIComponent(SWIGGY_API_URL)}`);
            if (!response.ok) continue;
            json = await response.json();
            break;
          } catch {
            // try next proxy
          }
        }

        if (!json) {
          throw new Error("All CORS proxy attempts failed");
        }

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

    const trimmed = value.trim();
    if (!trimmed) {
      setRestaurants(allRestaurants);
      setSearchPerformed(false);
      return;
    }

    const filteredList = allRestaurants.filter(({ info }) =>
      info?.name?.toLowerCase().includes(trimmed.toLowerCase())
    );
    setRestaurants(filteredList);
    setSearchPerformed(true);
  };

  const handleSearch = () => {
    const trimmed = searchText.trim();
    if (!trimmed) {
      setRestaurants(allRestaurants);
      setSearchPerformed(false);
      return;
    }

    const filteredList = allRestaurants.filter(({ info }) =>
      info?.name?.toLowerCase().includes(trimmed.toLowerCase())
    );
    setRestaurants(filteredList);
    setSearchPerformed(true);
  };

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
