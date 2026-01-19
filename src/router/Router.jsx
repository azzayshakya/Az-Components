import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import { ErrorPage } from '../pages/common/ErrorPage';
import { NotFoundPage } from '../pages/common/NotFoundPage';
import RedirectPage from '../pages/common/RedirectPage';
import HomeUILayout from '../layout/Home/HomeLayout';
import AddEmployee from '@/admin/pages/EmployeeManagment/ActivateEmployee';
import AllEmployee from '@/admin/pages/EmployeeManagment/AllEmployee';
import SalaryManagemnt from '@/admin/pages/SalaryManagement';
import CommentsManagement from '@/admin/pages/CommentsManagement';
import QueriesManagement from '@/admin/pages/QueriesManagement';
import AddProject from '@/admin/pages/ProjectManagement/AddProject';
import AllProject from '@/admin/pages/ProjectManagement/AllProject';
import UserManagement from '@/admin/pages/userManagement';
import MyProfile from '@/admin/pages/myProfile';
import Dashboard from '@/admin/Dashboard';
import RoleManagement from '@/admin/pages/EmployeeManagment/RoleManagement';
import UpdateEmployeeDetails from '@/admin/pages/EmployeeManagment/UpdateEmployeeDetails';
import ActivateEmployee from '@/admin/pages/EmployeeManagment/ActivateEmployee';
import RequirementsManagement from '@/admin/pages/RequirementManagement';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomeUILayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Navigate to="/dashboard" />,
        },
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/employees/employee-activation',
          element: <ActivateEmployee />,
        },
        {
          path: '/employees/all',
          element: <AllEmployee />,
        },
        {
          path: '/employees/update-employee-details',
          element: <UpdateEmployeeDetails />,
        },
        {
          path: '/employees/role-management',
          element: <RoleManagement />,
        },
        {
          path: '/salary',
          element: <SalaryManagemnt />,
        },
        {
          path: '/comments',
          element: <CommentsManagement />,
        },
        {
          path: '/queries',
          element: <QueriesManagement />,
        },
        {
          path: '/projects/add',
          element: <AddProject />,
        },
        {
          path: '/projects/all',
          element: <AllProject />,
        },
        {
          path: '/users',
          element: <UserManagement />,
        },
        {
          path: '/profile',
          element: <MyProfile />,
        },
        {
          path: '/requirements-management',
          element: <RequirementsManagement />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
        {
          path: '/redirect',
          element: <RedirectPage />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]
  // { basename: import.meta.env.BASE_URL }
);

export default router;
