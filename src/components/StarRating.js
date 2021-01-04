import React from 'react';
import StarRatings from 'react-star-ratings';

export default function StarRating({rating, size = "15px", spacing = '1px'}) {

    // changeRating( newRating, name ) {
    //   this.setState({
    //     rating: newRating
    //   });
    // }

      const parseRating = rating ? Number(rating.aggregate_rating) : 0
      return (
        <StarRatings
          rating={parseRating}
          starRatedColor="gold"
        //   changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
          starDimension={size}
          starSpacing={spacing}
        />
      );
}