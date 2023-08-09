import { useState, useContext, FC } from 'react';
import clsx from 'clsx';
import { userContext } from '../Contexts/Contexts';

import { postRatingAPI } from '../../services/Rating';

interface StarRatingProps {
  userRating: number;
  setUserRating: () => void;
}

export const StarRating: FC<StarRatingProps> = ({ userRating, setUserRating }) => {
  const [hover, setHover] = useState(0);
  const context = useContext(userContext);
  const addRanting = (postId, email, count) => {
    postRatingAPI(postId, email, count);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={clsx(index <= (hover || userRating) ? "on" : "off")}
            onClick={(e) => {
              e.preventDefault();
              setUserRating(index);
              addRanting(props.postId, context.email, index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(userRating)}>
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

interface StarRatingStaticProps {
  rating: number;
}

export const StarRatingStatic: FC<StarRatingStaticProps> = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 0.5;
        return (
          <button type="button" disabled key={index} className={index <= rating ? 'on' : 'off'}>
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};
