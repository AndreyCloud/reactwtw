import React from 'react';
import { Film } from '../../types/films';

type OverviewProps = {
  film: Film | undefined,
  rating: string | undefined,
}

function Overview({film, rating}: OverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{rating}</span>
          <span className="film-rating__count">{film?.scores_count} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {film?.description}
        <p className="film-card__director">
          <strong>Director: {film?.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>
                    Starring: {film?.starring.join(', ')}
          </strong>
        </p>
      </div>
    </>
  );
}

export default Overview;
