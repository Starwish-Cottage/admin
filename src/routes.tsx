import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import Welcome from "@pages/welcome";
import Login from "@pages/login";
import Dashboard from "@pages/dashboard";

import "@assets/styles/index.css";
import { HeroUIProvider } from "@heroui/react";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/login",
    Component: Login,
  },
]);

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <RouterProvider router={router} />
  </HeroUIProvider>
);
