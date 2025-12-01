import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CDN_URL,
  CORS_PROXIES,
  FALLBACK_MENU_ITEMS,
  RESTAURANT_MENU_API,
  TOP_RATING_CUTOFF,
} from "../../utils/constants.js";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [info, setInfo] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cuisineLine = useMemo(
    () => (info?.cuisines ? info.cuisines.join(", ") : "Popular picks for you"),
    [info]
  );

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setError("");
      let json = null;

      try {
        for (const proxy of CORS_PROXIES) {
          try {
            const url = `${proxy.prefix}${
              proxy.encode === false
                ? `${RESTAURANT_MENU_API}${resId}`
                : encodeURIComponent(`${RESTAURANT_MENU_API}${resId}`)
            }`;
            const response = await fetch(url, { headers: proxy.headers });
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

        const cards = json?.data?.cards || [];
        const infoCard = cards.find((card) => card?.card?.card?.info);
        setInfo(infoCard?.card?.card?.info || null);

        const regularCards =
          json?.data?.cards
            ?.find((card) => card?.groupedCard)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

        const menuItems = regularCards
          .flatMap((card) => card?.card?.card?.itemCards || [])
          .map((item) => item?.card?.info)
          .filter(Boolean);

        setItems(menuItems.length > 0 ? menuItems : FALLBACK_MENU_ITEMS);
      } catch (err) {
        console.log("Failed to fetch restaurant menu", err);
        setError("Unable to load menu right now. Showing a sample menu instead.");
        setItems(FALLBACK_MENU_ITEMS);
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };

    if (resId) {
      fetchMenu();
    }
  }, [resId]);

  const getPrice = (item) => {
    const paise = item?.price ?? item?.defaultPrice ?? 0;
    return Math.round(paise / 100);
  };

  return (
    <div className="restaurant-menu-page">
      <div className="menu-banner">
        <div>
          <p className="menu-kicker">Restaurant menu</p>
          <h1>{info?.name || "FoodVilla"}</h1>
          <p className="menu-subtitle">{cuisineLine}</p>
          <div className="menu-meta">
            {info?.avgRating ? (
              <span className={info.avgRating >= TOP_RATING_CUTOFF ? "rating-green" : "rating-yellow"}>
                {info.avgRating} ★
              </span>
            ) : (
              <span className="rating-yellow">New</span>
            )}
            {info?.sla?.deliveryTime ? (
              <span className="meta-chip">{info.sla.deliveryTime} mins</span>
            ) : null}
            {info?.costForTwoMessage ? (
              <span className="meta-chip">{info.costForTwoMessage}</span>
            ) : null}
          </div>
          {error ? <p className="menu-error">{error}</p> : null}
        </div>
        {info?.cloudinaryImageId ? (
          <img
            className="menu-hero-img"
            src={`${CDN_URL}${info.cloudinaryImageId}`}
            alt={info?.name || "Restaurant banner"}
          />
        ) : null}
      </div>

      {loading ? (
        <div className="menu-loading">Loading menu...</div>
      ) : (
        <div className="menu-items-grid">
          {items.map((item) => (
            <article key={item.id || item.name} className="menu-item-card">
              <div>
                <div className="menu-item-head">
                  <h3>{item.name}</h3>
                  {item.isVeg !== undefined ? (
                    <span className={item.isVeg ? "veg-dot" : "non-veg-dot"}>
                      {item.isVeg ? "Veg" : "Non-Veg"}
                    </span>
                  ) : null}
                </div>
                {item.description ? (
                  <p className="menu-item-desc">{item.description}</p>
                ) : null}
              </div>
              <div className="menu-item-footer">
                <span className="menu-item-price">Rs. {getPrice(item)}</span>
                {item.ratings?.aggregatedRating?.rating ? (
                  <span className="menu-item-rating">
                    {item.ratings.aggregatedRating.rating} ★
                  </span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
