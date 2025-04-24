import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '@/api/UserProvider';

const ProtectedRoute = ({ role }) => {
  const { userRole } = useContext(UserContext);

  if (userRole !== role) {
    return <Navigate to="/auth/sign-in" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
