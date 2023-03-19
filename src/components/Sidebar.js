import React from 'react';
import sidebarStyles from '../styles/sidebar.module.css';
import { signOut } from 'firebase/auth';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from '../firebase'

const Sidebar = ({ setShow }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/signin');
            console.log('Signed out successfully');
        }).catch((error) => {
            console.log('Something went wrong');
        })
    };

    const hideSidebar = (e) => {
        setShow(false);
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
                Settings
            </div>
            <div
            className={sidebarStyles['sidebar__item']}>
                <NavLink
                className={sidebarStyles['siderbar__item-link']}
                to="/wishlist">
                    Watch List
                </NavLink>
            </div>
            <div
            className={sidebarStyles['sidebar__item']}
            onClick={handleLogout}>
                Sign out
            </div>
        </div>
    );
}

export default Sidebar;