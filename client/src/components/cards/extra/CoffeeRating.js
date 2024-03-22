import React from 'react';
import CoffeeSolid from './CoffeeSolid';
import CoffeeHolow from './CoffeeHolow';

const CoffeeRating = ({ rating }) => {
    const beanColour = '#ffffffe1'

    const validRating = typeof rating === 'number' && rating >= 1 && rating <= 5 ? rating : 0;
    const ratingRounded = Math.round(validRating);

    const maxRating = 5;
    const solidBeans = Array(ratingRounded).fill(<CoffeeSolid style={{width: '20px', fill:beanColour}} />);
    const hollowBeans = Array(maxRating - ratingRounded).fill(<CoffeeHolow style={{width: '20px',  fill:beanColour}} />);

    return (
        <div>
            {solidBeans.map((bean, index) => <span key={`solid-${index}`}>{bean}</span>)}
            {hollowBeans.map((bean, index) => <span key={`hollow-${index}`}>{bean}</span>)}
        </div>
    );
};

// export default CoffeeRating;

export default React.memo(CoffeeRating);