import React from 'react';

import movieStyles from '../styles/movie.module.css';

// if a movie does not have a poster then use this placeholder
const DEFAULT_PLACEHOLDER_IMAGE = 
    "https://lands-tube.it.landsd.gov.hk/AVideo/view/img/notfound_portrait.jpg";
/**
 * 
 * @param movie Movie data
 * @param setInfo Used to send data to the Popup
 * @param setPopup If the Popup is visible or not
 * @returns 
 */
const Movie = ({ movie, setInfo, setPopup }) => {
    // movie details that will be fetched later
    const det = {
        Title: '',
        Year: '',
        Director: '',
        Genre: '',
        Metascore: '',
        Plot: '',
        Poster: '',
        imdbRating: '',
        imdbID: movie.imdbID
    };
    // this way we can get more info on the movie
    // (plot, director, metascore and etc.)
    fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=5bba07e8`)
    .then(response => response.json())
    .then(jsonResponse => {
        det.Title = jsonResponse.Title;
        det.Year = jsonResponse.Year;
        det.Director = jsonResponse.Director;
        det.Genre = jsonResponse.Genre;
        det.Metascore = jsonResponse.Metascore;
        det.Plot = jsonResponse.Plot;
        det.Poster = jsonResponse.Poster;
        det.imdbRating = jsonResponse.imdbRating;
    });
    // if we don't have a poster then use the placeholder
    const poster =
        movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    // once the movie is clicked we want to show the Popup
    const movieClicked = (e) => {
        setInfo(det); // we pass the detailed info of the movie
        setPopup(true); // we make the Popup visible
    };

    return (
        <div
        className={movieStyles['movie']}
        onClick={movieClicked}>
            <p>
                {movie.Title}
            </p>
            <div>
                <img
                width="200"
                alt={`The movie titled: ${movie.Title}`}
                src={poster} />
            </div>
            <p>({movie.Year})</p>
        </div>
    );
};

export default Movie;