// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const token = sessionStorage.getItem('token'); // or localStorage if needed

    if (!token) {
        // If there's no token, redirect to the login page
        return <Navigate to="/" />;
    }

    // If the user has a token, render the passed component
    return element;
};

export default ProtectedRoute;
