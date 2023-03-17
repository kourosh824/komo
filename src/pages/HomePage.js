import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { Navigate } from "react-router-dom";

import Header from "../components/Header";
import Movie from '../components/Movie';
import Search from '../components/Search';
import homeStyles from '../styles/home.module.css';

import { isMobile } from "react-device-detect";
import Popup from "../components/Popup";

const MAX = 3;

const HomePage = () => {
    const loggedIn = useLocation().state;
    
    const [movies, setMovies] = useState([]);
    const [found, setFound] = useState(false);

    const [info, setInfo] = useState([]);
    const [show, setShow] = useState(false);

    const showMovies = (res) => {
        const numRows = Math.floor(res.length / MAX);
        const rowRem = res.length % MAX;

        const rows = [];
        
        if(!isMobile) {
            for(let i = 0; i < numRows; i++) {
                rows.push(
                    <div
                    key={i}
                    className={homeStyles['row']}>
                        {!isMobile &&
                        <div
                        className={homeStyles['row-back']}>
                            {res.slice(i * MAX, (i + 1) * MAX)}
                        </div>
                        }
                    </div>
                );
            }
    
            if(rowRem > 0) {
                rows.push(
                    <div
                    key={rows.length}
                    className={homeStyles['row']}>
                        {!isMobile &&
                        <div
                        className={homeStyles['row-back']}>
                            {res.slice(res.length - (res.length % MAX), res.length)}
                        </div>    
                        }
                    </div>
                );
            }
        } else {
            return res;
        }

        return rows;
    }

    const search = (searchValue) => {
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=5bba07e8`)
        .then(response => response.json())
        .then(jsonResponse => {
            if(jsonResponse.Response === 'True') {
                const res = jsonResponse.Search.map((movie) => {
                    return (
                        <Movie
                        movie={movie}
                        info={setInfo}
                        state={setShow} />
                    );
                });
                setMovies((isMobile) ? res : showMovies(res));
                setFound(true);
            } else {
                setFound(false);
            }
        });
    }
    
    const container = (
        <div
        className={homeStyles['home-container']}>
            <div
            className={homeStyles['search-container']}>
                <Search
                search={search} />
            </div>
            <div
            className={homeStyles['row-container']}>
                {found && movies}
            </div>
        </div>
    );

    const navigate = (
        <Navigate to="/" />
    );

    return (
        <div
        className={homeStyles['home']}>
            <Header
            text="KOMO" />
            {loggedIn ? container:navigate}
            {show && <Popup info={info} show={setShow} />}
        </div>
    );
};

export default HomePage;