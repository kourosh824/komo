import React from 'react';
import movieStyles from '../styles/movie.module.css';

const DEFAULT_PLACEHOLDER_IMAGE = 
    "https://lands-tube.it.landsd.gov.hk/AVideo/view/img/notfound_portrait.jpg";

const Movie = ({ movie, setInfo, setPopup }) => {
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
    
    const poster =
        movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    
    const movieClicked = (e) => {
        setInfo(det);
        setPopup(true);
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