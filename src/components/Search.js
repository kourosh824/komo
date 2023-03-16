import React, { useState } from 'react';
import searchStyles from '../styles/search.module.css';

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    };

    const resetInputField = () => {
        setSearchValue('');
    };

    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    };

    return (
        <div
        className={searchStyles['search-container']}>
            <h3
            className={searchStyles['motto']}>
                Gimme a name :)
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