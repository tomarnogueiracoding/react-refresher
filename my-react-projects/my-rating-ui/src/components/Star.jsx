const Star = ({
  star,
  rating,
  hover,
  color,
  ratingClick,
  hoverEnter,
  hoverLeave,
}) => {
  return (
    <button
      type="button"
      aria-label={`${star} of 5 stars`}
      aria-pressed={star === rating}
      onClick={() => ratingClick(star)}
      onMouseEnter={() => hoverEnter(star)}
      onMouseLeave={hoverLeave}
      className="star"
      style={{
        color: star <= (hover || rating) ? color : '#ccc',
        background: 'none',
        border: 0,
        padding: 0,
        font: 'inherit',
        cursor: 'pointer',
      }}
    >
      {'\u2605'}
    </button>
  );
};

export default Star;
