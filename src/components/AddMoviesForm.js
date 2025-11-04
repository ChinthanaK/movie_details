import React from 'react';
import classes from "./AddMoviesForm.module.css"

const AddMoviesForm = (props) => {
    const formSubmitHandler = (event) =>{
        event.preventDefault();
        const enteredData = {
            title : event.target.title.value,
            openingText: event.target.openingText.value,
            releaseDate: event.target.releaseDate.value

        }
       props.onAddMovie(enteredData);
       event.target.reset(); 
    }
  return (
    <div className={classes.container}>
        <form onSubmit={formSubmitHandler}>
        <label htmlFor="title">Title </label>
       
        <input type="text" name="title" id="title" />
        <br /><br />
        <label htmlFor="openingText">Opening Text </label>
        
        <textarea name="openingText" id="openingText" cols="30" rows="3" />
        <br /><br />
        <label htmlFor="releaseDate">Release Date </label>
       
        <input  name="releaseDate" id="releasedate" />
        <br />
        <button type="submit">Add Movie</button>
        
    </form>
    </div>
  )
}

export default AddMoviesForm
