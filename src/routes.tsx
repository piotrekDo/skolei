import { createBrowserRouter } from 'react-router-dom';
import {HomePage} from './pages/HomePage'
import React from 'react';
import { App } from './App';
import { LandingPage } from './pages/LandingPage';
import LoggedGuard from './guards/LoggedGuard';
import AuthenticatedGuard from './guards/AuthenticatedGuard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <AuthenticatedGuard><LandingPage /></AuthenticatedGuard> },
      { path: 'home', element: <LoggedGuard><HomePage /></LoggedGuard> },
    ],
  },
]);

export default router;