import React from 'react';

import { signOut } from 'firebase/auth';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from '../firebase'

import sidebarStyles from '../styles/sidebar.module.css';

/**
 * 
 * @param setVisible Whether the Sidebar is visible or not 
 * @returns 
 */
const Sidebar = ({ setVisible }) => {
    const navigate = useNavigate();
    // if the user decides to sign out
    const handleSignout = () => {
        signOut(auth).then(() => {
            navigate('/signin');
            
        }).catch((error) => {
            /**
             * TODO: Add some sort of error popup here.
             */
        })
    };
    // if the user wishes to close the Sidebar
    const hideSidebar = (e) => {
        setVisible(false);
    };

    return (
        <div
        className={sidebarStyles['sidebar']}>
            <div
            className={`
            ${sidebarStyles['sidebar__item']}
            ${sidebarStyles['sidebar__back']}
            `}
            onClick={hideSidebar}>
                Close
            </div>
            <hr className={sidebarStyles['sidebar__line']} />
            <div
            className={sidebarStyles['sidebar__item']}>
                <NavLink
                className={sidebarStyles['siderbar__item-link']}
                to="/home">
                    Home
                </NavLink>
            </div>
            <div
            className={sidebarStyles['sidebar__item']}>
                <NavLink
                className={sidebarStyles['siderbar__item-link']}
                to="/settings">
                    Settings
                </NavLink>
            </div>
            <div
            className={sidebarStyles['sidebar__item']}>
                <NavLink
                className={sidebarStyles['siderbar__item-link']}
                to="/watchlist">
                    Watch List
                </NavLink>
            </div>
            <div
            className={sidebarStyles['sidebar__item']}
            onClick={handleSignout}>
                Sign out
            </div>
        </div>
    );
}

export default Sidebar;