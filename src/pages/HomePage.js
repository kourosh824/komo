import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

import Header from "../components/Header";
import Movie from '../components/Movie';
import Search from '../components/Search';
import Sidebar from "../components/Sidebar";
import getMoviesData from "../hooks/getMoviesData";
import Popup from "../components/Popup";

import homeStyles from '../styles/home.module.css';

const HomePage = () => {
    // the navigate hook is used to change the webpage
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user) {
                // if not signed in then navigate to
                // the sign in page
                navigate('/signin');
            }
        });
    });
    // where we store our movies data
    const [movies, setMovies] = useState([]);
    // used for the search function, once the movie
    // is found, it will be set to true
    const [movieFound, setMovieFound] = useState(false);
    // here we store movie data to be showed in the popup
    // window
    const [movieInfo, setMovieInfo] = useState([]);
    // decides whether the popup should be visible or not
    const [showPopup, setShowPopup] = useState(false);
    // decides whether the sidebar should be visible or not
    const [showSide, setShowSide] = useState(false);
    // called to search for movies the user is asking for
    const searchMovie = (searchValue) => {
        // here you can put your own OMDb API key
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=5bba07e8`)
        .then(response => response.json())
        .then(jsonResponse => {
            if(jsonResponse.Response === 'True') {
                // store each search result as a movie component
                const res = jsonResponse.Search.map((movie) => {
                    return (
                        <Movie
                        movie={movie}
                        setInfo={setMovieInfo}
                        setPopup={setShowPopup} />
                    );
                });
                // using the getMoviesData hook, show the movies
                // (in rows if it is not a mobile device)
                setMovies((isMobile) ? res : getMoviesData(res));
                setMovieFound(true);
            } else {
                setMovieFound(false);
            }
        });
    }

    return (
        <div
        className={homeStyles['home']}>
            <Header
            title="KOMO"
            setSideVisible={setShowSide} />
            {showSide && 
            <Sidebar
            setVisible={setShowSide} />}
            <div
            className={homeStyles['home-container']}>
                <div
                className={homeStyles['search-container']}>
                    <Search
                    search={searchMovie} />
                </div>
                <div
                className={homeStyles['row-container']}>
                    {movieFound && movies}
                </div>
            </div>
            {showPopup &&
            <Popup
            userId={auth.currentUser.uid}
            info={movieInfo}
            setVisible={setShowPopup} />}
        </div>
    );
};

export default HomePage;