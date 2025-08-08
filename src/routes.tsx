import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import AuthGuard from "@pages/AuthGuard";
import Welcome from "@pages/welcome";
import Login from "@pages/login";
import Dashboard from "@pages/dashboard";
import DashboardMaterials from "@pages/dashboard-materials";
import DashboardOrders from "@pages/dashboard-orders";

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
            <Dashboard />
          </AuthGuard>
        ),
        children: [
          { index: true, Component: DashboardMaterials },
          { path: "materials", Component: DashboardMaterials },
          { path: "orders", Component: DashboardOrders },
          { path: "library", Component: DashboardOrders },
        ],
      },
      {
        path: "/login",
        Component: () => (
          <AuthGuard>
            <Login />
          </AuthGuard>
        ),
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
