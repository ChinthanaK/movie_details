import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMoviesForm from './components/AddMoviesForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchMoviesHandler = useCallback( async () => {
    try{
      setIsLoading(true);
      setError(null);
    const response = await fetch("https://react-http-1-5cef2-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json");
    console.log(response.ok)
     if(!response.ok){
      throw new Error("Something went wrong ....Retrying")
    }
    const data = await response.json();
    const loadedMovies =[];
      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
     setMovies(loadedMovies);

    }catch(error){
      setError(error.message);
    }
     setIsLoading(false);
    
  }, []
 
  )
    useEffect(() =>{
      fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    async function addMovieHandler(movie) {
      const response = await fetch("https://react-http-1-5cef2-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json", {
        method:"POST",
        body:JSON.stringify(movie),
        headers:{
          'Content-Type':'application/json'
        }
      })

      const data = await response.json();

      console.log(data);

    }
    async function deleteMovieHandler(id){
      const response = await fetch("https://react-http-1-5cef2-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json", {
        method:"DELETE"
      })

      if (!response.ok) {
          throw new Error("Failed to delete movie.");
      }

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id ===id));
    }

  return (
    <React.Fragment>
    <section>
     <AddMoviesForm onAddMovie = {addMovieHandler}/>

    </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length===0 && !error && <p>Found no movies</p>}
        {!isLoading && movies.length > 0 &&<MoviesList movies={movies} onDelete={deleteMovieHandler}/>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
