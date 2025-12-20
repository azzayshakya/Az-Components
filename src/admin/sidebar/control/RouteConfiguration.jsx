

import { MENU_KEYS } from '../constants/menuKeys';

export const ROUTES = {
  [MENU_KEYS.DASHBOARD]: '/dashboard',
  
  [MENU_KEYS.EMPLOYEE_MANAGEMENT]: '/employees',
  [MENU_KEYS.ADD_EMPLOYEE]: '/employees/add',
  [MENU_KEYS.ALL_EMPLOYEES]: '/employees/all',
  
  [MENU_KEYS.SALARY_MANAGEMENT]: '/salary',
};


export const getRoute = (key) => {
  return ROUTES[key] || '/';
};

export default ROUTES;