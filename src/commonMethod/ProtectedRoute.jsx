import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRoles }) => {
    const token = sessionStorage.getItem('token');
    const adminType = sessionStorage.getItem('admin_type');

    if (!token) {
        return <Navigate to="/" />;
    }
    if (requiredRoles && !requiredRoles.includes(adminType)) {
        return <Navigate to="/dashboard" />;
    }

    return element;
};

export default ProtectedRoute;
