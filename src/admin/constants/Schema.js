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
  empId:{type :"string"},
  // Personal Information
  firstName: { type: 'string'  },
  lastName: { type: 'string'  },
  fullName:{type:'string '}, // genrate from backend 
  fatherName: { type: 'string' },
  dob: { type: 'date' },
  gender: { type: 'string'  },
  mobile: { type: 'string'  },
  email: { type: 'string'  },
  aadharNumber: { type: 'string' },

  // Employment Details
  employeeId: { type: 'string',  },
  joiningDate: { type: 'date' },
  workingStatus: { type: 'string' },
  lastWorkingDate: { type: 'date' },
  department: { type: 'string' },
  designation: { type: 'string' },
  workLocation: { type: 'string' },

  // Address
  tempAddress: { type: 'string' },
  permanentAddress: { type: 'string' },

  // Bank & Salary
  bankName: { type: 'string' },
  accountNumber: { type: 'string' },
  ifscCode: { type: 'string' },
  salary: { type: 'number' },
  // backen self creation used on update the user details of history
  salaryHistory: [
        { from: "2023-01", to: "2023-06", salary: 45000 },
        { from: "2023-07", to: "2024-02", salary: 55000 },
        { from: "2024-03", to: "Present", salary: 65000, isActive: true },
      ],

  // Emergency
  emergencyContact: { type: 'string' },
  emergencyDetails: { type: 'string' },

  // Documents
  document :[ type = "array", data=" string with array of photos "
    ,aadharDoc=" string with array of photos ",
    panDoc=" string with array of photos ",
    otherDocs=" string with array of photos "  ],
  // photo: { type: 'string' },
  // aadharDoc: { type: 'string' },
  // panDoc: { type: 'string' },
  // otherDocs: { type: 'array' },
};
export const QUERY_UI_SCHEMA = {
  queryId: { type: 'string', showOnUI: true }, // it will be set from uuid in backend not handled from the ui  Ex. PRJ-2025-0012
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
  id: { type: 'string', showOnUI: true },// it will be set from uuid in backend not handled from the ui   Ex. PRJ-2025-0012
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

};


export const COMMENTS_UI_SCHEMA = {
  id: { type: 'string', showOnUI: true },// it will be set from uuid in backend not handled from the ui   Ex. PRJ-2025-0012
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

};

