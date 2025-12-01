import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "../restaurant/RestaurantCard.js";
import Shimmer from "./Shimmer.jsx";
import {
  TOP_RATING_CUTOFF,
  SWIGGY_API_URL,
  CORS_PROXIES,
  FALLBACK_RESTAURANTS,
} from "../../utils/constants.js";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setFetchError("");
        let json = null;

        for (const proxy of CORS_PROXIES) {
          try {
            const url = `${proxy.prefix}${
              proxy.encode === false ? SWIGGY_API_URL : encodeURIComponent(SWIGGY_API_URL)
            }`;
            const response = await fetch(url, {
              headers: proxy.headers,
            });
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

        if (swiggyList.length > 0) {
          setRestaurants(swiggyList);
          setAllRestaurants(swiggyList);
        } else {
          setFetchError("Live data unavailable. Showing sample restaurants.");
          setRestaurants(FALLBACK_RESTAURANTS);
          setAllRestaurants(FALLBACK_RESTAURANTS);
        }
      } catch (error) {
        console.log("Failed to fetch restaurants from Swiggy", error);
        setFetchError("Live data unavailable. Showing sample restaurants.");
        setRestaurants(FALLBACK_RESTAURANTS);
        setAllRestaurants(FALLBACK_RESTAURANTS);
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
      {fetchError ? <div className="fetch-error">{fetchError}</div> : null}
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
            <Link
              key={restaurant.info.id}
              to={`/restaurant/${restaurant.info.id}`}
              className="restaurant-card-link"
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Body;
