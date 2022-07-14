import React from 'react';

type GenreListProps = {
  genres: string[];
};

function CenreList({ genres }: GenreListProps) {
  return (
    <ul className="catalog__genres-list">
      <li className="catalog__genres-item catalog__genres-item--active">
        <a href="#" className="catalog__genres-link">
          All genres
        </a>
      </li>
      {genres.map ((genre) => (
        <li key={genre} className="catalog__genres-item">
          <a href="#" className="catalog__genres-link">
            {genre}
          </a>
        </li>),
      )}
    </ul>
  );
}

export default CenreList;
