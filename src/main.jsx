import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";
import Index from "./routes";
import EditContact, { action as editAction } from "./routes/edit";
import { loader as rootLoader } from "./routes/root";
import { loader as contactLoader } from "./routes/contact";
import { action as rootAction } from "./routes/root";
import { action as destroyAction } from "./routes/destroy";
import { action as contactAction } from "./routes/contact";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // in fact <Root /> is root layout or Home page that wraps other pages by <outlet /> component, means Home is the parent component for the components nested by <outlet />. and we can have other parent compoents that wraps other child component by other <outlet />s.
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "/contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "/contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>There was an error!</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
