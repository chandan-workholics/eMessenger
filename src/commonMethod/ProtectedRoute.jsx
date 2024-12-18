import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRoles }) => {
    const token = sessionStorage.getItem('token');
    const admin_type = sessionStorage.getItem('admin_type');

    if (!token) {
        return <Navigate to="/" />;
    }
    if (requiredRoles && !requiredRoles.includes(admin_type)) {
        return <Navigate to="/dashboard" />;
    }

    return element;
};

export default ProtectedRoute;
