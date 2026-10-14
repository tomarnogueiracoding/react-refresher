import { useId, useRef, useState } from 'react';
import Star from './Star';
import Modal from './Modal';
import Button from './Button';

const Rating = ({
  heading = 'Rate Your Experience',
  color = 'gold',
  feedbackMessages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'],
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [focusedStar, setFocusedStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const headingId = useId();
  const starRefs = useRef([]);

  const stars = feedbackMessages.map((_, i) => i + 1);

  const handleKeyDown = (event, star) => {
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key)
      ? 1
      : ['ArrowLeft', 'ArrowUp'].includes(event.key)
        ? -1
        : 0;

    if (direction === 0) {
      return;
    }

    event.preventDefault();
    const nextStar = (star - 1 + direction + stars.length) % stars.length + 1;
    setRating(nextStar);
    starRefs.current[nextStar - 1]?.focus();
  };

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    setRating(0);
    setHover(0);
    setFocusedStar(0);
  };

  return (
    <div className="rating-container">
      <h2 id={headingId}>{heading}</h2>
      <div
        className="stars"
        role="radiogroup"
        aria-labelledby={headingId}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocusedStar(0);
          }
        }}
      >
        {stars.map((star) => (
          <Star
            key={star}
            star={star}
            totalStars={stars.length}
            rating={rating}
            hover={hover}
            focusedStar={focusedStar}
            color={color}
            ratingClick={setRating}
            hoverEnter={setHover}
            hoverLeave={() => setHover(null)}
            focusEnter={setFocusedStar}
            keyDown={(event) => handleKeyDown(event, star)}
            tabIndex={rating === star || (rating === 0 && star === 1) ? 0 : -1}
            buttonRef={(element) => {
              starRefs.current[star - 1] = element;
            }}
          />
        ))}
      </div>
      {rating > 0 && <p className="feedback">{feedbackMessages[rating - 1]}</p>}
      <Button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={rating === 0}
      >
        Submit
      </Button>
      <Modal isOpen={submitted} onClose={closeModal} rating={rating} />
    </div>
  );
};

export default Rating;
