import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import AuthGuard from "@pages/AuthGuard";
import Welcome from "@pages/welcome";
import Login from "@pages/login";
import Dashboard from "@pages/dashboard";

import "@assets/styles/index.css";
import { HeroUIProvider } from "@heroui/react";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, Component: Welcome },
      {
        path: "/dashboard",
        Component: () => (
          <AuthGuard>
            <Dashboard />,
          </AuthGuard>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <RouterProvider router={router} />
    {/* Logout warning modal here */}
  </HeroUIProvider>
);
