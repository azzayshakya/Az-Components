export const USER_UI_SCHEMA = {
  id: { type: 'string', showOnUI: true },
  name: { type: 'string', showOnUI: true },
  email: { type: 'string', showOnUI: true },
  role: { type: 'string', showOnUI: true },
  designation: { type: 'string', showOnUI: true },
  employeeId: { type: 'string', showOnUI: true },
  phone: { type: 'string', showOnUI: false },
  createdAt: { type: 'date', showOnUI: false },
};
export const EMPLOYEE_UI_SCHEMA = {
  // Personal Information
  firstName: { type: 'string', showOnUI: true },
  lastName: { type: 'string', showOnUI: true },
  fatherName: { type: 'string', showOnUI: false },
  dob: { type: 'date', showOnUI: false },
  gender: { type: 'string', showOnUI: true },
  mobile: { type: 'string', showOnUI: true },
  email: { type: 'string', showOnUI: true },
  aadharNumber: { type: 'string', showOnUI: false },

  // Employment Details
  employeeId: { type: 'string', showOnUI: true },
  joiningDate: { type: 'date', showOnUI: true },
  workingStatus: { type: 'string', showOnUI: true },
  lastWorkingDate: { type: 'date', showOnUI: false },
  department: { type: 'string', showOnUI: true },
  designation: { type: 'string', showOnUI: true },
  workLocation: { type: 'string', showOnUI: true },

  // Address
  tempAddress: { type: 'string', showOnUI: false },
  permanentAddress: { type: 'string', showOnUI: false },

  // Bank & Salary
  bankName: { type: 'string', showOnUI: false },
  accountNumber: { type: 'string', showOnUI: false },
  ifscCode: { type: 'string', showOnUI: false },
  salary: { type: 'number', showOnUI: true },

  // Emergency
  emergencyContact: { type: 'string', showOnUI: false },
  emergencyDetails: { type: 'string', showOnUI: false },

  // Documents
  photo: { type: 'string', showOnUI: false },
  aadharDoc: { type: 'string', showOnUI: false },
  panDoc: { type: 'string', showOnUI: false },
  otherDocs: { type: 'array', showOnUI: false },
};
export const QUERY_UI_SCHEMA = {
  id: { type: 'string', showOnUI: true },
  userId: { type: 'string', showOnUI: false },
  userName: { type: 'string', showOnUI: true },
  subject: { type: 'string', showOnUI: true },
  message: { type: 'string', showOnUI: true },
  status: { type: 'string', showOnUI: true }, 
  priority: { type: 'string', showOnUI: true },
  createdAt: { type: 'date', showOnUI: true },
  resolvedAt: { type: 'date', showOnUI: false },
};
export const PROJECT_UI_SCHEMA = {
  id: { type: 'string', showOnUI: true },
  projectName: { type: 'string', showOnUI: true },
  clientName: { type: 'string', showOnUI: true },
  projectType: { type: 'string', showOnUI: true },
  status: { type: 'string', showOnUI: true },
  startDate: { type: 'date', showOnUI: true },
  endDate: { type: 'date', showOnUI: false },
  budget: { type: 'number', showOnUI: true },
  projectManager: { type: 'string', showOnUI: true },
  teamMembers: { type: 'array', showOnUI: false },
  description: { type: 'string', showOnUI: false },

  // Special flag
  isCurrentlyShowingOnUI: { type: 'boolean', showOnUI: true },
};

