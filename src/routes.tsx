import { createBrowserRouter } from 'react-router-dom';
import {HomePage} from './pages/HomePage'
import React from 'react';
import { App } from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
    ],
  },
]);

export default router;