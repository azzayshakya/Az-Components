/**
 * Menu item labels configuration
 * Supports internationalization and centralized label management
 */

export const MENU_LABELS = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  users: 'Users',
  userList: 'User List',
  userRoles: 'Roles & Permissions',
  userPermissions: 'Permission Management',
  teams: 'Teams',
  teamManagement: 'Team Management',
  teamAnalytics: 'Team Analytics',
  projects: 'Projects',
  projectList: 'All Projects',
  projectCreate: 'Create New',
  projectArchive: 'Archived',
  settings: 'Settings',
  generalSettings: 'General',
  security: 'Security',
  notifications: 'Notifications',
  files: 'Files',
  reports: 'Reports',
};


export const getMenuLabel = (key) => {
  return MENU_LABELS[key] || key;
};

export default MENU_LABELS;