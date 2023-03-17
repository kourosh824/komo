import React from 'react';
import movieStyles from '../styles/movie.module.css';

const DEFAULT_PLACEHOLDER_IMAGE = 
    "https://lands-tube.it.landsd.gov.hk/AVideo/view/img/notfound_portrait.jpg";

const Movie = ({ movie }) => {
    const poster =
        movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    
    return (
        <div
        className={movieStyles['movie']}>
            <h3>
                {movie.Title}
            </h3>
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