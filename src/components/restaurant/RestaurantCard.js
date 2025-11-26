import { CDN_URL } from "../../utils/constants.js";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, cuisines, sla, orderCount } = resData?.info;

  return (
    <div className="restaurant-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="res-card-content">
        <div>
          <h3>{name}</h3>
          <h4>{cuisines.join(", ")}</h4>
        </div>
        <div className="rating-container">
          <h4 className="rating">
            <span className={ avgRating >= 4.5 ? 'rating-green' : avgRating >= 4.0 ? 'rating-yellow' : 'rating-red' }>
              {avgRating}
            </span> stars
            <span className="card-separator"></span> {sla?.deliveryTime} MINS
          </h4>
          <h5 className="order-count">{orderCount}</h5>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;