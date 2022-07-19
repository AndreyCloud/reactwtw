import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApps';
import { chooseODR, fetchComment, fetchSimilar } from '../../store/filmSlice';
import CardFilm from '../CardFilm/CardFilm';
import Reviews from './Reviews';
import Details from './Details';
import Overview from './Overview';

function Film(): JSX.Element {

  const odr = ['Overview', 'Details', 'Reviews'];
  const odrClassActive = 'film-nav__item film-nav__item--active';
  const odrClass = 'film-nav__item ';
  const odrItem = useAppSelector((state) => state.film.filmODR);


  const params = useParams();
  const idFilm = params.id ? params.id : '';

  const films = useAppSelector((state) => state.film.films);
  const film = films.find((e) => String(e.id) === idFilm);

  const Rating = (grade: number | undefined) => {
    if (grade === undefined) {
      return '--//--';
    }
    if(grade < 3 && grade > 0){
      return 'Bad';
    } if (3 <= grade && grade < 5) {
      return ' Normal';
    } if (5 <= grade && grade < 8) {
      return 'Good';
    } if (8 <= grade && grade < 10) {
      return 'Good';
    } if (grade === 10) {
      return 'Awesome';
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rating = Rating(film?.rating);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSimilar(idFilm));
    dispatch(fetchComment(idFilm));
    smoothscroll();
  }, [idFilm]);

  const similar = useAppSelector((state) => state.film.similar);

  function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo (0,currentScroll - (currentScroll/25));
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function SortODR(e: { preventDefault: () => void; }, item: string) {
    e.preventDefault();
    dispatch(chooseODR(item));
  }
  function VueODR (vue: string) {
    switch(vue) {
      case 'Overview':
        return (<Overview film={film} rating={rating}/>);
      case 'Details':
        return (<Details film={film} />);
      case 'Reviews':
        return (<Reviews/>);
    }
  }
  const vueODR = VueODR(odrItem);

  return (
    <>
      <section style={{background: film?.background_color}} className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={film?.background_image}
              alt={film?.name}
            />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to='/' className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img
                    src="img/avatar.jpg"
                    alt="User avatar"
                    width="63"
                    height="63"
                  />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">
                  Add review
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film?.poster_image}
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  {odr.map((el) =>
                    (
                      <li onClick={(e) => SortODR(e, el)} key={el} className={odrItem === el ? odrClassActive : odrClass}>
                        <a href="#" className="film-nav__link">
                          {el}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
              {vueODR}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {similar.map((sim) =>
              <CardFilm key={sim.id} film={sim}/>,
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
    </>
  );
}

export default Film;
