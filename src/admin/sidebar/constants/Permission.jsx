

import { MENU_KEYS } from '../constants/menuKeys';

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest',
};


export const MENU_PERMISSIONS = {
  [MENU_KEYS.DASHBOARD]: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.USER],
  
  [MENU_KEYS.EMPLOYEE_MANAGEMENT]: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.USER],
  [MENU_KEYS.ADD_EMPLOYEE]: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
  [MENU_KEYS.ALL_EMPLOYEES]: [USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.USER],
  
  [MENU_KEYS.SALARY_MANAGEMENT]: [USER_ROLES.ADMIN, USER_ROLES.MANAGER],
};


export const hasMenuPermission = (menuKey, userRole) => {
  const allowedRoles = MENU_PERMISSIONS[menuKey];
  return allowedRoles ? allowedRoles.includes(userRole) : false;
};

export default MENU_PERMISSIONS;