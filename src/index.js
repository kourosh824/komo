import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route
            path="/login"
            element={<LoginPage />} />
            <Route
            path="/home"
            element={<HomePage />} />
            <Route
            path="/signup"
            element={<SignupPage />} />
        </Routes>
    </BrowserRouter>
);