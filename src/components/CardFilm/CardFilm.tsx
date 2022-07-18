import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/films';

type CardFilmProps = {
  film: Film
}

function CardFilm({film}: CardFilmProps): JSX.Element {

  const [idPreview, setIdPreview] = useState<string>('');

  const VideoPreview = (vlink: string) => setIdPreview(vlink);
  const CardOut = () => setIdPreview('');
  const pathId = `/films/${film.id}`;

  const vueCard = idPreview !== '' ?(
    <video
      muted
      autoPlay
      width={280}
      height={175}
      src= {idPreview}
    />) : (
    <img
      src={film.preview_image}
      alt={film.preview_image}
      width="280"
      height="175"
    />);

  return (
    <article
      onMouseEnter={() => VideoPreview(film.preview_video_link)}
      onMouseLeave={() => CardOut()}
      className="small-film-card catalog__films-card"
    >
      <Link to={pathId}>
        <div className="small-film-card__image">
          {vueCard}
        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link to={pathId} className="small-film-card__link" >
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default CardFilm;
