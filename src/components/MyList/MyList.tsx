import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useApps';
import CardFilm from '../CardFilm/CardFilm';
import UserBlock from '../UserBlock/UserBlock';

function MyList(): JSX.Element {

  const favoriteFilms = useAppSelector((state) => state.film.favoriteFilms);

  return (
    <div>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={'/'} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list</h1>
          <UserBlock/>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__films-list">
            {favoriteFilms.map ((favoriteFilm) =>
              <CardFilm key={favoriteFilm.id} film={favoriteFilm}/>,
            )}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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
    </div>
  );
}

export default MyList;
