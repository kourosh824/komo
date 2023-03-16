import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

import Header from "../components/Header";
import Movie from '../components/Movie';
import Search from '../components/Search';
import homeStyles from '../styles/home.module.css';

import { isMobile } from "react-device-detect";

const MAX = 3;

const HomePage = () => {
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [found, setFound] = useState(false);

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
                const res = showMovies(jsonResponse.Search.map((movie) => {
                    return (
                        <Movie
                        movie={movie} />
                    );
                }));
                setMovies(showMovies(res));
                console.log(movies);
                setFound(true);
            } else {
                setFound(false);
            }
        });
    }
    
    return (
        <div
        className={homeStyles['home']}>
            <Header
            text="KOMO" />
            <div
            className={homeStyles['home-container']}>
                <Search
                search={search} />
                <div
                className={homeStyles['row-container']}>
                    {found && movies}
                </div>
            </div>
        </div>
    );
};

export default HomePage;