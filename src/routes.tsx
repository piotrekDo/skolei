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
import { RequestsResolvePage } from './pages/RequestsResolvePage';
import { ModeratorGuard } from './guards/ModeratorGuard';
import { CustomCalendar } from './pages/CustomCalendar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <AuthenticatedGuard><LandingPage /></AuthenticatedGuard> },
      { path: 'home', element: <LoggedGuard><HomePage /></LoggedGuard> },
      { path: 'calendar', element: <LoggedGuard><CustomCalendar /></LoggedGuard> },
      { path: 'users', element: <LoggedGuard><AppUsersPage /></LoggedGuard> },
      { path: 'applications', element: <LoggedGuard><Applications /></LoggedGuard> },
      { path: 'applications-new', element: <LoggedGuard><NewPtoRequestPage /></LoggedGuard> },
      { path: 'applications-history', element: <LoggedGuard><RequestHistory /></LoggedGuard> },
      { path: 'applications-resolve', element: <ModeratorGuard><RequestsResolvePage /></ModeratorGuard> },
    ],
  },
]);

export default router;