import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
    const { user, isAuthenticated } = useSelector(store => store.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children
}

const AuthenticatedUser = ({ children }) => {
    const { isAuthenticated } = useSelector(store => store.auth)

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return children
}

const RoleProtectedRoute = ({ children, roles }) => {
    const { user, isAuthenticated } = useSelector(store => store.auth);

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!roles.includes(user?.role)) return <Navigate to="/" />;

    return children;
};


export {
    ProtectedRoutes,
    AuthenticatedUser,
    RoleProtectedRoute
}
