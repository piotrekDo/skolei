import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>

);
