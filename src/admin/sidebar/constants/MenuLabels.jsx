export const MENU_LABELS = {
  // Dashboard
  dashboard: 'Dashboard',
  
  // Employee Management
  employeeManagement: 'Employee Management',
  addEmployee: 'Add Employee',
  allEmployees: 'All Employees',
  
  // Salary Management
  salaryManagement: 'Salary Management',
  // processSalary: 'Process Salary',
  // salaryHistory: 'Salary History',
  // salaryReports: 'Salary Reports',
};

/**
 * Get label by key
 * @param {string} key - Menu key
 * @returns {string} Label text
 */
export const getMenuLabel = (key) => {
  return MENU_LABELS[key] || key;
};

export default MENU_LABELS;