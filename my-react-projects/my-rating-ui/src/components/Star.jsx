const Star = ({
  star,
  totalStars,
  rating,
  hover,
  focusedStar,
  color,
  ratingClick,
  hoverEnter,
  hoverLeave,
  focusEnter,
  keyDown,
  tabIndex,
  buttonRef,
}) => {
  return (
    <button
      type="button"
      ref={buttonRef}
      role="radio"
      aria-label={`${star} of ${totalStars} stars`}
      aria-checked={star === rating}
      tabIndex={tabIndex}
      onClick={() => ratingClick(star)}
      onMouseEnter={() => hoverEnter(star)}
      onMouseLeave={hoverLeave}
      onFocus={() => focusEnter(star)}
      onKeyDown={keyDown}
      className="star"
      style={{
        color: star <= (hover || focusedStar || rating) ? color : '#ccc',
      }}
    >
      {'\u2605'}
    </button>
  );
};

export default Star;
