import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApps';
import { fetchFavoriteFilms } from '../../store/filmSlice';
import Catalog from '../Catalog/Catalog';
import MyListBtn from '../MyListBtn/MyListBtn';
import UserBlock from '../UserBlock/UserBlock';

export default function Main(): JSX.Element {

  const idFilm = useAppSelector((state) => state.film.promoFilm.id);
  const films = useAppSelector((state) => state.film.films);
  const promoFilm = films.find((e) => String(e.id) === String(idFilm));
  const token = useAppSelector((state) => state.user.user.token);
  const pathId = `/player/${idFilm}`;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token !== undefined) {
      dispatch(fetchFavoriteFilms(token));
    }
  }, [token]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={promoFilm?.background_image}
            alt={promoFilm?.name}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <UserBlock/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm?.poster_image}
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={pathId}>
                  <button
                    className="btn btn--play film-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                <MyListBtn film={promoFilm} id={String(promoFilm?.id)}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Catalog/>
        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
