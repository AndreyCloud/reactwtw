import React from 'react';

type GenreListProps = {
  genres: string[];
  sort: string;
  sortGenre(genre: string): void;
};

function CenreList({ genres, sort, sortGenre }: GenreListProps) {

  const clName = 'catalog__genres-item';
  const clNameActive = 'catalog__genres-item catalog__genres-item--active';

  return (
    <ul className="catalog__genres-list">
      <li onClick={() => sortGenre('All genres')} className = {(sort === 'All genres') ? clNameActive : clName}>
        <a href="#" className="catalog__genres-link">
          All genres
        </a>
      </li>
      {genres.map ((genre) => (
        <li onClick={() => sortGenre(genre)} key={genre} className = {(sort === genre) ? clNameActive : clName}>
          <a href="#" className="catalog__genres-link">
            {genre}
          </a>
        </li>),
      )}
    </ul>
  );
}

export default CenreList;
