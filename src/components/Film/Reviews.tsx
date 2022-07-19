import React from 'react';
import { useAppSelector } from '../../hooks/useApps';

function Reviews() {

  const reviews = useAppSelector((state) => state.film.commentFilm);

  function DateSet (date: string) {
    const arrDate = new Date(date).toDateString().split(' ');
    return (`${arrDate[1] } ${arrDate[2] }, ${arrDate[3] }`);
  }

  return (
    <div className="film-card__reviews film-card__row">

      {reviews.map((review) =>
        (
          <div key={review.id} className="film-card__reviews-col">
            <div  className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>
                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{DateSet(review.date)}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{review.rating}</div>
            </div>
          </div>
        ),
      )}

    </div>
  );
}

export default Reviews;
