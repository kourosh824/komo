import React from 'react';
import headerStyles from '../styles/header.module.css';

const Header = ( { title, setShow } ) => {
    const showSidebar = (e) => {
        setShow(true);
        console.log('hey');
    };

    return (
        <header
        className={headerStyles['header']}>
            <div
            className={headerStyles['header__menu']}
            onClick={showSidebar}>
                =
            </div>
            <div
            className={headerStyles['header__title']}>
                {title}
            </div>
        </header>
    );
};

export default Header;