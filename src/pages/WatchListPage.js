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
    const userId = auth.currentUser.uid;

    const [movies, setMovies] = useState([]);
    const [showSide, setShowSide] = useState(false);

    const [show, setShow] = useState(false);
    const [info, setInfo] = useState([]);
    
    const fetchMovies = async () => {
        await getDocs(collection(db, `user-${userId}-movies`))
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
            .map((doc) => {
                console.log(doc.data());
                return <Movie
                movie={doc.data()}
                info={setInfo}
                state={setShow} />
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
            setShow={setShowSide} />}
            <div
            className={watchStyles['wish-container']}>
                <div
                className={watchStyles['row-container']}>
                    {getMoviesData(movies)}
                </div>
            </div>
            {show &&
            <Popup
            userId={auth.currentUser.uid}
            info={info}
            show={setShow} />}
        </div>
    );
}

export default WishListPage;