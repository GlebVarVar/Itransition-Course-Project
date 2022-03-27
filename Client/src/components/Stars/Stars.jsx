import { useState } from "react";
import './Stars.css'

const StarRating = (props) => {
    const {rating, setRating} = props;
    const [hover, setHover] = useState(0);
    

    return (
        <div className="star-rating">
        {[...Array(5)].map((star, index) => {
            index += 1;
            return (
            <button
                type="button"
                key={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
            >
                <span className="star">&#9733;</span>
            </button>
            );
        })}
        </div>
    );
};

const StarRatingStatic = (props) => {
    const {rating} = props;
    console.log(rating);
    
    return (
        <div className="star-rating">
        {[...Array(5)].map((star, index) => {
            index += 0.5;
            return (
            <button
                type="button"
                disabled
                key={index}
                className={(index <= rating) ? "on" : "off"}
            >
                <span className="star">&#9733;</span>
            </button>
            );
        })}
        </div>
    );
};

export {StarRating, StarRatingStatic}