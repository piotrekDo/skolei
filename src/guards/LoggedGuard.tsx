import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../service/useUserStore';

export const LoggedGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser } = useUserStore();
  
  if (!appUser) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};

export default LoggedGuard;
