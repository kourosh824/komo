import React, { useState } from 'react';

import searchStyles from '../styles/search.module.css';
/**
 * 
 * @param search The function in charge of searching and showing movies
 * @returns 
 */
const Search = ({ search }) => {
    // the value in the input form
    const [searchValue, setSearchValue] = useState('');
    // when the input is changed
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    };
    // after the search set the input to null
    const resetInputField = () => {
        setSearchValue('');
    };
    // call the search function
    const callSearchFunction = (e) => {
        e.preventDefault();
        search(searchValue);
        resetInputField();
    };

    return (
        <div
        className={searchStyles['search-container']}>
            <h3
            className={searchStyles['motto']}>
                {'Just think of a movie :)'}
            </h3>
            <form
            className={searchStyles['search']}>
                <input
                className={searchStyles['search__bar']}
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text" />
                <input
                className={searchStyles['search__submit']}
                onClick={callSearchFunction}
                type="submit"
                value="SEARCH" />
            </form>
        </div>
    );
};

export default Search;