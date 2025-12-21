export const MENU_LABELS = {
  dashboard: 'Dashboard',

  employeeManagement: 'Employee Management',
  addEmployee: 'Add Employee',
  allEmployees: 'All Employees',

  salaryManagement: 'Salary Management',

  myProfile: 'My Profile',
  allUsers: 'All Users',
  userComments: 'User Comments',
  userQueries: 'User Queries',

  projects: 'Projects',
  addProject: 'Add Project',
  allProjects: 'All Projects',
};

export const getMenuLabel = (key) => {
  return MENU_LABELS[key] || key;
};

export default MENU_LABELS;
