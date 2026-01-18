export const GENDER_ENUM = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
  { label: 'Prefer Not to Say', value: 'na' },
];

export const WORK_STATUS_ENUM = [
  { label: 'Currently Working', value: 'working' },
  { label: 'On Notice Period', value: 'notice_period' },
  { label: 'Resigned', value: 'resigned' },
  { label: 'Terminated', value: 'terminated' },
  { label: 'Retired', value: 'retired' },
  { label: 'Contr. Completed', value: 'contract_completed' },
];

export const EMPLOYMENT_TYPE_ENUM = [
  { label: 'Permanent', value: 'permanent' },
  { label: 'Contract', value: 'contract' },
  { label: 'Daily Wages', value: 'daily_wages' },
  { label: 'Consultant', value: 'consultant' },
  { label: 'Third-Party Vendor', value: 'vendor' },
  { label: 'Intern / Trainee', value: 'intern' },
];

export const WORK_LOCATION_ENUM = [
  { label: 'Work From Office', value: 'wfo' },
  { label: 'Work From Home', value: 'wfh' },
  { label: 'Hybrid', value: 'hybrid' },
  { label: 'Site Work', value: 'site' },
  { label: 'Remote (Outstation)', value: 'remote' },
];
export const USER_ROLES_ENUM = [
  { label: 'Admin', value: 'admin' }, //me
  { label: 'CEO', value: 'ceo' }, //wx. big brother
  { label: 'CFO', value: 'cfo' },
  { label: 'CTO', value: 'cto' }, //ex. ankit bhaiya
  { label: 'Project Manager', value: 'project_manager' },
  { label: 'Finance Manager', value: 'finance_manager' },
  { label: 'Employee', value: 'employee' },
  { label: 'User', value: 'user' },
];
// Department  → WHAT field
// Designation → WHAT position in that field
export const DEPARTMENT_ENUM = [
  { label: 'Civil Engineering', value: 'civil' },
  { label: 'Electrical Engineering', value: 'electrical' },
  { label: 'Mechanical Engineering', value: 'mechanical' },
  { label: 'Fire Fighting', value: 'firefighting' },
  { label: 'Site Engineering', value: 'site' },
  { label: 'Project Management', value: 'project' },
  { label: 'Procurement', value: 'procurement' },
  { label: 'Quality & Safety', value: 'quality_safety' },
  { label: 'Operations', value: 'operations' },
  { label: 'Finance & Accounts', value: 'finance' },
  { label: 'Human Resources', value: 'hr' },
  { label: 'IT & Software', value: 'it' },
  { label: 'Administration', value: 'admin' },
];
export const DESIGNATION_ENUM = [
  // Leadership
  { label: 'Chief Executive Officer (CEO)', value: 'ceo' },
  { label: 'Chief Operating Officer (COO)', value: 'coo' },
  { label: 'Chief Financial Officer (CFO)', value: 'cfo' },
  { label: 'Chief Technology Officer (CTO)', value: 'cto' },

  // Management
  { label: 'General Manager', value: 'general_manager' },
  { label: 'Project Manager', value: 'project_manager' },
  { label: 'Deputy Project Manager', value: 'deputy_pm' },
  { label: 'Site Manager', value: 'site_manager' },
  { label: 'HR Manager', value: 'hr_manager' },
  { label: 'Finance Manager', value: 'finance_manager' },

  // Engineering
  { label: 'Senior Civil Engineer', value: 'senior_civil_engineer' },
  { label: 'Civil Engineer', value: 'civil_engineer' },
  { label: 'Senior Electrical Engineer', value: 'senior_electrical_engineer' },
  { label: 'Electrical Engineer', value: 'electrical_engineer' },
  { label: 'Mechanical Engineer', value: 'mechanical_engineer' },
  { label: 'Fire Fighting Engineer', value: 'firefighting_engineer' },
  { label: 'Site Engineer', value: 'site_engineer' },

  // Support
  { label: 'Safety Officer', value: 'safety_officer' },
  { label: 'Quality Engineer', value: 'quality_engineer' },
  { label: 'Store Incharge', value: 'store_incharge' },
  { label: 'Procurement Officer', value: 'procurement_officer' },

  // Finance & HR
  { label: 'Accountant', value: 'accountant' },
  { label: 'Accounts Executive', value: 'accounts_executive' },
  { label: 'HR Executive', value: 'hr_executive' },

  // Others
  { label: 'Supervisor', value: 'supervisor' },
  { label: 'Technician', value: 'technician' },
  { label: 'Office Assistant', value: 'office_assistant' },
  { label: 'Intern / Trainee', value: 'intern' },
];

export const PROJECT_SERVICES_ENUM = [
  { label: 'Electrical Works', value: 'electrical' },
  { label: 'Fire Fighting', value: 'fire_fighting' },
  { label: 'Plumbing', value: 'plumbing' },
  { label: 'HVAC', value: 'hvac' },
  { label: 'Civil Construction', value: 'civil' },
];

export const PROJECT_STATUS_ENUM = [
  { label: 'Planned', value: 'planned' },
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'On Hold', value: 'on_hold' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];
// export
export const ALL_EMPLOYEE_ENUM = [
  {
    label: 'Ajay Shakya',
    value: 'Ajay Shakya',
    empId: 'EMP001',
    empRole: 'Manager',
  },
  {
    label: 'Rohit Verma',
    value: 'Rohit Verma',
    empId: 'EMP002',
    empRole: 'Engineer',
  },
  {
    label: 'Neha Singh',
    value: 'Neha Singh',
    empId: 'EMP003',
    empRole: 'Team Lead',
  },
];

export const CLIENT_TYPE_ENUM = [
  { label: 'Individual', value: 'individual' },
  { label: 'Company', value: 'company' },
  { label: 'Government', value: 'government' },
];

export const PROJECT_TYPE_ENUM = [
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Industrial', value: 'industrial' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Hospital', value: 'hospital' },
  { label: 'IT / Data Center', value: 'it_infra' },
];

export const PRIORITY_ENUM = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
];

export const DASHBOARD_REQUIREMENT_TYPE_ENUM = [
  { label: 'Bug Fix', value: 'bug_fix' },
  { label: 'New Feature', value: 'new_feature' },
  { label: 'UI/UX Improvement', value: 'ui_ux_improvement' },
  { label: 'Performance Issue', value: 'performance_issue' },
  { label: 'Data Issue', value: 'data_issue' },
  { label: 'Navigation Issue', value: 'navigation_issue' },
  { label: 'Form Validation', value: 'form_validation' },
  { label: 'API Integration', value: 'api_integration' },
  { label: 'Report Generation', value: 'report_generation' },
  { label: 'Access Control', value: 'access_control' },
  { label: 'Responsive Design', value: 'responsive_design' },
  { label: 'Export/Import Feature', value: 'export_import' },
  { label: 'Search/Filter Enhancement', value: 'search_filter' },
  { label: 'Notification System', value: 'notification' },
  { label: 'Other', value: 'other' },
];

export const REQUIREMENT_STATUS_ENUM = [
  { label: 'Submitted', value: 'submitted', color: 'blue' },
  { label: 'Under Review', value: 'under_review', color: 'orange' },
  { label: 'In Progress', value: 'in_progress', color: 'purple' },
  { label: 'Completed', value: 'completed', color: 'green' },
  { label: 'Rejected', value: 'rejected', color: 'red' },
  { label: 'On Hold', value: 'on_hold', color: 'gold' },
];
