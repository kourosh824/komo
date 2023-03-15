import React from "react";
import { useLocation } from 'react-router-dom';

const HomePage = () => {
    const location = useLocation();
    
    return (
        location.state ? 'Hello' : 'Bye'
    );
};

export default HomePage;