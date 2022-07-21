import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useApps';
import { sortGenre } from '../../store/filmSlice';
import { ArrFilms } from '../../types/films';
import CardFilm from '../CardFilm/CardFilm';


function Catalog() {

  const [showFilms, setShowFilms] = useState(8);

  const filmsNoSort = useAppSelector((state) => state.film.films);
  const sort = useAppSelector((state) => state.film.sortGenre);
  const films = FilmsSort(filmsNoSort, sort);
  const filmsShow = films.slice(0, showFilms);
  const genres = Unique(filmsNoSort).slice(0, 9);
  const clName = 'catalog__genres-item';
  const clNameActive = 'catalog__genres-item catalog__genres-item--active';
  const ChangeFilmsList = () => {
    setShowFilms(showFilms + 8);
  };
  const dispatch = useAppDispatch();

  function FilmsSort (arrFilms: ArrFilms, sorted: string): ArrFilms {
    if(sort !== 'All genres') {
      return arrFilms.filter((v) => v.genre === sort);
    } else {
      return arrFilms;
    }
  }

  function Unique(arr: ArrFilms) {
    const uniq: string[] = [];
    arr.forEach((element) => {
      uniq.push(element.genre);
    });
    return Array.from(new Set(uniq));
  }

  function SortGenre (genre: string) {
    dispatch(sortGenre(genre));
    setShowFilms(8);
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <ul className="catalog__genres-list">
        <li onClick={() => SortGenre('All genres')} className = {(sort === 'All genres') ? clNameActive : clName}>
          <a href="#" className="catalog__genres-link">
          All genres
          </a>
        </li>
        {genres.map ((genre) => (
          <li onClick={() => SortGenre(genre)} key={genre} className = {(sort === genre) ? clNameActive : clName}>
            <a href="#" className="catalog__genres-link">
              {genre}
            </a>
          </li>),
        )}
      </ul>
      <div className="catalog__films-list">
        {filmsShow.map((film) =>
          <CardFilm key={film.id} film={film}/>,
        )}
      </div>
      {showFilms < films.length &&
          <div className="catalog__more">
            <button onClick={ChangeFilmsList} className="catalog__button" type="button">
              Show more
            </button>
          </div>}
    </section>
  );
}

export default Catalog;
