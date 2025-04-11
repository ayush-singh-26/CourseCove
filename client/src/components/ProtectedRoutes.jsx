import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loading_spinner from './Loader/Loading_spinner';
import Loader from './Loader/Loader';

const ProtectedRoutes = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector((store) => store.auth);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};


const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector(store => store.auth)

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return children
}

const RoleProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated, loading } = useSelector(store => store.auth);

  if (loading) {
    return <Loader/>;
  }
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!roles.includes(user?.data?.role)) return <Navigate to="/" />;

  return children;
};


export {
  ProtectedRoutes,
  AuthenticatedUser,
  RoleProtectedRoute
}
