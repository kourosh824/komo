import React from 'react';
import headerStyles from '../styles/header.module.css';

const Header = (props) => {
    return (
        <header
        className={headerStyles['header']}>
            <h2>
                {props.text}
            </h2>
        </header>
    );
};

export default Header;