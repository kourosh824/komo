import React, { useEffect, useState } from 'react';

import { getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

import Popup from '../components/Popup';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Movie from '../components/Movie';
import getMoviesData from '../hooks/getMoviesData';

import watchStyles from '../styles/watchListPage.module.css';

const WishListPage = () => {
    const userId = auth.currentUser.uid; // the user id
    // where we store our movies data
    const [movies, setMovies] = useState([]);
    // here we store movie data to be showed in the popup
    // window
    const [movieInfo, setMovieInfo] = useState([]);
    // decides whether the popup should be visible or not
    const [showPopup, setShowPopup] = useState(false);
    // decides whether the sidebar should be visible or not
    const [showSide, setShowSide] = useState(false);
    // called in the start to get all the movies from the watch list
    const fetchMovies = async () => {
        // get the movies from Cloud Firestore
        await getDocs(collection(db, `user-${userId}-movies`))
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
            .map((doc) => {
                // return each of them as a Movie component
                return (
                    <Movie
                    movie={doc.data()}
                    setInfo={setMovieInfo}
                    setPopup={setShowPopup} />
                );
            });
            setMovies(newData);
        });
    };

    useEffect(() => {
        fetchMovies();
    }, []);
    
    return (
        <div>
            <Header
            title="KOMO"
            setShow={setShowSide} />
            {showSide && 
            <Sidebar
            setVisible={setShowSide} />}
            <div
            className={watchStyles['watch-container']}>
                <div
                className={watchStyles['row-container']}>
                    {getMoviesData(movies)}
                </div>
            </div>
            {showPopup &&
            <Popup
            userId={auth.currentUser.uid}
            info={movieInfo}
            setVisible={setShowPopup}
            reFetch={fetchMovies}
            showRemove />}
        </div>
    );
}

export default WishListPage;