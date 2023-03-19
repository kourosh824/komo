import React from 'react';

import headerStyles from '../styles/header.module.css';
/**
 * 
 * @param title The text that will be showed on header
 * @param setSideVisible If the Sidebar is visible 
 * @returns 
 */
const Header = ( { title, setSideVisible } ) => {
    // once the menu button is clicked show the sidebar
    const showSidebar = (e) => {
        setSideVisible(true);
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