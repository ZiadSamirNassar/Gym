import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { RouterProvider } from 'react-router';
import {router} from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
