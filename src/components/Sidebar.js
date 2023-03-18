import React from 'react';
import sidebarStyles from '../styles/sidebar.module.css';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
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
                Back
            </div>
            <hr className={sidebarStyles['sidebar__line']} />
            <div
            className={sidebarStyles['sidebar__item']}>
                Account
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