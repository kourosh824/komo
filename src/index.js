import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import WishListPage from './pages/WishListPage';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route
            path="/"
            element={<Navigate to="/signin" />} />
            <Route
            path="/wishlist"
            element={<WishListPage />} />
            <Route
            path="/signin"
            element={<SigninPage />} />
            <Route
            path="/home"
            element={<HomePage />} />
            <Route
            path="/signup"
            element={<SignupPage />} />
        </Routes>
    </BrowserRouter>
);