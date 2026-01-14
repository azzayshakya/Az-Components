import { MENU_KEYS } from '../constants/menuKeys';

export const ROUTES = {
  [MENU_KEYS.DASHBOARD]: '/dashboard',

  // Employees
  [MENU_KEYS.EMPLOYEE_MANAGEMENT]: '/employees',
  [MENU_KEYS.EMPLOYEE_ACTIVATION]: '/employees/employee-activation',
  [MENU_KEYS.ALL_EMPLOYEES]: '/employees/all',
  [MENU_KEYS.ADD_EMPLOYEE_DETAILS]: '/employees/update-employee-details',
  [MENU_KEYS.ROLE_MANAGEMENT]: '/employees/role-management',


  // Salary
  [MENU_KEYS.SALARY_MANAGEMENT]: '/salary',

  // Users
  [MENU_KEYS.MY_PROFILE]: '/profile',
  [MENU_KEYS.ALL_USERS]: '/users',
  [MENU_KEYS.USER_COMMENTS]: '/comments',
  [MENU_KEYS.USER_QUERIES]: '/queries',

  // Projects
  [MENU_KEYS.PROJECTS]: '/projects',
  [MENU_KEYS.ADD_PROJECT]: '/projects/add',
  [MENU_KEYS.ALL_PROJECTS]: '/projects/all',
};

export const getRoute = (key) => {
  return ROUTES[key] || '/';
};

export default ROUTES;
