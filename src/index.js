import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import App from "./App";
import Home from "./pages/home";
import Bands from './pages/bands';

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bands",
        element: <Bands />,
      },
      // {
      //   path: "/forecast",
      //   element: <Forecast />,
      // },
    ],
  },
]);

//renderizando o router
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);