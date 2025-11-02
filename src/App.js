import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const fetchMoviesHandler = useCallback( async () => {
    try{
      setIsLoading(true);
      setError(null);
    const response = await fetch("https://swapi.info/api/films");
    console.log(response.ok)
     if(!response.ok){
      throw new Error("Something went wrong ....Retrying")
    }
    const data = await response.json();
    setMovies(data);

    }catch(error){
      setError(error.message);
    }
     setIsLoading(false);
    
  }, []
 
  )
    useEffect(() =>{
      fetchMoviesHandler();
    }, [fetchMoviesHandler]);


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length===0 && !error && <p>Found no movies</p>}
        {!isLoading && movies.length > 0 &&<MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
