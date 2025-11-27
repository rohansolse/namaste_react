const Shimmer = () => {
  const placeholders = Array.from({ length: 12 });

  return (
    <div className="restaurant-container">
      {placeholders.map((_, index) => (
        <div key={index} className="shimmer-card">
          <div className="shimmer-banner" />
          <div className="shimmer-line short" />
          <div className="shimmer-line" />
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
