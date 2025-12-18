/**
 * Application routes configuration
 * Maps menu keys to actual routes
 */

import MENU_KEYS from "../constants/MenuKeys";


export const ROUTES = {
  [MENU_KEYS.DASHBOARD]: '/dashboard',
  [MENU_KEYS.ANALYTICS]: '/analytics',
  [MENU_KEYS.USERS]: '/users',
  [MENU_KEYS.USER_LIST]: '/users/list',
  [MENU_KEYS.USER_ROLES]: '/users/roles',
  [MENU_KEYS.USER_PERMISSIONS]: '/users/permissions',
  [MENU_KEYS.TEAMS]: '/teams',
  [MENU_KEYS.TEAM_MANAGEMENT]: '/teams/management',
  [MENU_KEYS.TEAM_ANALYTICS]: '/teams/analytics',
  [MENU_KEYS.PROJECTS]: '/projects',
  [MENU_KEYS.PROJECT_LIST]: '/projects/list',
  [MENU_KEYS.PROJECT_CREATE]: '/projects/create',
  [MENU_KEYS.PROJECT_ARCHIVE]: '/projects/archive',
  [MENU_KEYS.SETTINGS]: '/settings',
  [MENU_KEYS.GENERAL_SETTINGS]: '/settings/general',
  [MENU_KEYS.SECURITY]: '/settings/security',
  [MENU_KEYS.NOTIFICATIONS]: '/settings/notifications',
  [MENU_KEYS.FILES]: '/files',
  [MENU_KEYS.REPORTS]: '/reports',
};


export const getRoute = (key) => {
  console.log("azz get route start", key)
  console.log("azz get route end ", ROUTES[key])

  return ROUTES[key] || '/';
  
};

export default ROUTES;