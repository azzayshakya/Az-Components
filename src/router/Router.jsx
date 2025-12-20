import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { ErrorPage } from "../pages/common/ErrorPage";
import { NotFoundPage } from "../pages/common/NotFoundPage";
import RedirectPage from "../pages/common/RedirectPage";
import HomeUILayout from "../layout/Home/HomeLayout";
import AddEmployee from "@/admin/pages/EmployeeManagment/AddEmployee";
import AllEmployee from "@/admin/pages/EmployeeManagment/AllEmployee";
import SalaryManagemnt from "@/admin/pages/SalaryManagement";
import Dashboard from "@/admin/Dashboard";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeUILayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/employees/add",
          element: <AddEmployee/>,
        },
        {
          path: "/employees/all",
          element: <AllEmployee/>,
        },
        {
          path: "/salary",
          element: <SalaryManagemnt/>,
        },
        {
          path: "/dashboard",
          element: <Dashboard/>,
        },

       
        {
          path: "*",
          element: <NotFoundPage />,
        },
        {
          path: "/redirect",
          element: <RedirectPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ],
  // { basename: import.meta.env.BASE_URL }
);

export default router;
