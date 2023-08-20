import React from 'react';
import useUserStore from '../service/useUserStore';
import { Navigate } from 'react-router-dom';

export const ModeratorGuard = ({ children }: React.PropsWithChildren) => {
  const { appUser } = useUserStore();

const isModerator = appUser && appUser.userRoles.indexOf('MODERATOR') > -1;

  if (!isModerator) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
};
