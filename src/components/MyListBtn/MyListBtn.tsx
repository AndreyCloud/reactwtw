import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useApps';
import { fetchFavoriteFilms, fetchFavoriteFilmsAdd, fetchFavoriteFilmsDelete, fetchFilms } from '../../store/filmSlice';
import { Film } from '../../types/films';

type MyListBtnProps = {
  film: Film | undefined,
  id: string
}

function MyListBtn({film, id}: MyListBtnProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.user.user.token);
  const idToken = {id, token};

  const goLogin = () => navigate('/login');

  async function FavoriteAdd() {
    if(token !== undefined) {
      await dispatch(fetchFavoriteFilmsAdd(idToken));
      await dispatch(fetchFavoriteFilms(token));
    } else {
      goLogin();
    }

  }
  async function FavoriteDelete() {
    await dispatch(fetchFavoriteFilmsDelete(idToken));
    await dispatch(fetchFilms(''));
    await dispatch(fetchFavoriteFilms(token));
  }

  const myListBtn = (film?.is_favorite === false) ? (
    <button onClick={FavoriteAdd} className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
    </button>
  ) : (
    <button onClick={FavoriteDelete} className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref="#in-list"></use>
      </svg>
      <span>My list</span>
    </button>
  );
  return (
    <div>{myListBtn}</div>
  );
}

export default MyListBtn;
