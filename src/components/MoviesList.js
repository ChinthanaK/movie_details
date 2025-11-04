import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const {movies} = props;
  return (
    <ul className={classes['movies-list']}>
      {movies.map((movie) => (
        <Movie
          key={movie.episode_id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete = {props.onDelete}
          id={movie.id}
        />
      ))}
    </ul>
  );
};

export default MovieList;
