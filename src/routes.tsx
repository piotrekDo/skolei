import { createBrowserRouter } from 'react-router-dom';
import {HomePage} from './pages/HomePage'
import { App } from './App';
import { LandingPage } from './pages/LandingPage';
import LoggedGuard from './guards/LoggedGuard';
import AuthenticatedGuard from './guards/AuthenticatedGuard';
import { AppUsersPage } from './pages/AppUsersPage';
import { Applications } from './pages/Applications';
import { NewPtoRequestPage } from './pages/NewPtoRequestPage';
import { RequestHistory } from './pages/RequestHistory';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <AuthenticatedGuard><LandingPage /></AuthenticatedGuard> },
      { path: 'home', element: <LoggedGuard><HomePage /></LoggedGuard> },
      { path: 'users', element: <LoggedGuard><AppUsersPage /></LoggedGuard> },
      { path: 'applications', element: <LoggedGuard><Applications /></LoggedGuard> },
      { path: 'applications-new', element: <LoggedGuard><NewPtoRequestPage /></LoggedGuard> },
      { path: 'applications-history', element: <LoggedGuard><RequestHistory /></LoggedGuard> },
    ],
  },
]);

export default router;