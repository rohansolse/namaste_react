const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, avgRating, cuisines } = resData?.info;

  return (
    <div className="restaurant-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>
        <span className={
          avgRating >= 4.5 ? 'rating-green' :
          avgRating >= 4.0 ? 'rating-yellow' : 'rating-red'
        }>
          {avgRating}
        </span> stars
      </h4>
    </div>
  );
};

export default RestaurantCard;