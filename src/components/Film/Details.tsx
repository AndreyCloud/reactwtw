import React from 'react';
import { Film } from '../../types/films';

type DetailsProps = {
  film: Film | undefined
}

function Details({film}: DetailsProps): JSX.Element {

  function RunTime(min: number | undefined) {
    if(min !== undefined) {
      if(min > 60) {
        const hour = Math.floor(min/60);
        const minute = min%60;
        return (`${hour}h ${minute}m`);
      } else {
        return ( `${min}m`);
      }
    }
  }

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film?.director}</span>
        </p>
        <div className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {film?.starring.map((star) =>
              (
                <div key={star}>
                  {star },
                </div>
              ),
            )}
          </span>
        </div>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{RunTime(film?.run_time)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film?.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film?.released}</span>
        </p>
      </div>
    </div>
  );
}

export default Details;
