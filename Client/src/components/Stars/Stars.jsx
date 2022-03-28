import { useState, useContext } from "react";
import './Stars.css'
import { userContext } from "../Contexts/Contexts";

import { postRatingAPI } from "../../services/Rating";

const StarRating = (props) => {
    const {userRating, setUserRating} = props;
    const [hover, setHover] = useState(0);
    const context = useContext(userContext);
    const addRanting = (postId, email, count) => {
        postRatingAPI(postId, email, count);
    }


    return (
        <div className="star-rating">
        {[...Array(5)].map((star, index) => {
            index += 1;
            return (
            <button
                type="button"
                key={index}
                className={index <= (hover || userRating) ? "on" : "off"}
                onClick={(e) => {
                    e.preventDefault();
                    setUserRating(index);
                    addRanting(props.postId ,context.email,  index);
                }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(userRating)}
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
    // console.log(rating);
    
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