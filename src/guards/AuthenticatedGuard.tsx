import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../service/useUserStore';

export const AuthenticatedGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser } = useUserStore();

  if (appUser) {
    return <Navigate to={'/home'} replace />;
  }

  return <>{children}</>;
};

export default AuthenticatedGuard;
