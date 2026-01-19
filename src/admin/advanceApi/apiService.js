import { clearAuthData, getRefreshToken } from './apiConfig';
import api from './axiosInstance';

const handleApiCall = async (apiCall) => {
  const response = await apiCall();
  return response.data;
};

const authService = {
  createAccount: async (data) => {
    return handleApiCall(() => api.post('/auth/signup', data));
  },

  login: async (data) => {
    return handleApiCall(() => api.post('/auth/login', data));
  },
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      clearAuthData();
      return response.data;
    } catch (error) {
      clearAuthData();
      throw error;
    }
  },

  refreshToken: async () => {
    const refreshToken = getRefreshToken();
    return handleApiCall(() => api.post('/auth/refresh', { refreshToken }));
  },

  forgotPassword: async (data) => {
    return handleApiCall(() => api.post('/auth/forgot-password', data));
  },

  resetPassword: async (data) => {
    return handleApiCall(() => api.post('/auth/reset-password', data));
  },

  verifyEmail: async (token) => {
    return handleApiCall(() => api.get(`/auth/verify-email/${token}`));
  },

  verifyAdminDashboardUser: async (data) => {
    return handleApiCall(() => api.post('/auth/verifyAdminDashboardUser', data));
  },
};

const userService = {
  getUserProfile: async () => {
    return handleApiCall(() => api.get('/user/profile'));
  },

  updateUserProfile: async (data) => {
    return handleApiCall(() => api.put('/user/updateProfile', data));
  },

  updatePassword: async (data) => {
    return handleApiCall(() => api.put('/user/password', data));
  },

  deleteAccount: async () => {
    return handleApiCall(() => api.delete('/user/account'));
  },

  activateEmployee: async (data) => {
    return handleApiCall(() => api.post('/user/activateEmployee', data));
  },
};

const commentService = {
  submitComment: async (data) => {
    return handleApiCall(() => api.post('/add-your-comment', data));
  },

  getAllComments: async (params = {}) => {
    return handleApiCall(() => api.get('/get-elmech-comments', { params }));
  },

  getCommentById: async (commentId) => {
    return handleApiCall(() => api.get(`/comments/${commentId}`));
  },

  updateComment: async (commentId, data) => {
    return handleApiCall(() => api.put(`/comments/${commentId}`, data));
  },

  deleteComment: async (commentId) => {
    return handleApiCall(() => api.delete(`/comments/${commentId}`));
  },
};

const queryService = {
  submitTalkWithUs: async (data) => {
    return handleApiCall(() => api.post('/talk-with-us', data));
  },

  getAllQueries: async (params = {}) => {
    return handleApiCall(() => api.get('/get-user-queries', { params }));
  },

  getQueryById: async (queryId) => {
    return handleApiCall(() => api.get(`/queries/${queryId}`));
  },

  updateQueryStatus: async (queryId, data) => {
    return handleApiCall(() => api.put(`/queries/${queryId}`, data));
  },

  deleteQuery: async (queryId) => {
    return handleApiCall(() => api.delete(`/queries/${queryId}`));
  },
};
// projectService.js (inside same file for now)

const projectService = {
  getAllProjects: async () => {
    return handleApiCall(() => api.get('/projects'));
  },

  addProject: async (data) => {
    return handleApiCall(() => api.post('/projects', data));
  },

  updateProjectData: async (projectId, data) => {
    return handleApiCall(() => api.put(`/projects/${projectId}`, data));
  },

  deleteProject: async (data) => {
    return handleApiCall(() => api.delete('/projects', data));
  },
};
const companyServices = {
  getCompanyStats: async () => {
    return handleApiCall(() => api.get('/getCompanyStats'));
  },
};

const requirementsServices = {
  getAllRequirements: async () => {
    return handleApiCall(() => api.get('/getAllRequirements'));
  },
  PostRequirement: async (data) => {
    return handleApiCall(() => api.get('/postRequirement', data));
  },
  UpdateRequirement: async (data) => {
    return handleApiCall(() => api.get('/updateRequirement', data));
  },
  DeleteRequirement: async (data) => {
    return handleApiCall(() => api.get('/deleteRequirement', data));
  },
};

const employeeServices = {
  getEmployeeProfile: async () => {
    return handleApiCall(() => api.get('/employee/profile'));
  },
  getAllemployee: async () => {
    return handleApiCall(() => api.get('/employee/getAllRequirements'));
  },
  updateEmployeeRole: async (data) => {
    return handleApiCall(() => api.post('/employee/updateEmployeeRole', data));
  },
  updateEmployeeProfile: async (data) => {
    return handleApiCall(() => api.post('/employee/updateEmployeeProfile', data));
  },
};
const salaryServices = {
  updateEmployeeSalary: async (data) => {
    return handleApiCall(() => api.post('/employee/updateEmployeeSalary', data));
  },
};

const apiService = {
  createAccount: authService.createAccount,
  login: authService.login,
  logout: authService.logout,
  refreshToken: authService.refreshToken,
  forgotPassword: authService.forgotPassword,
  resetPassword: authService.resetPassword,
  verifyEmail: authService.verifyEmail,
  verifyAdminDashboardUser: authService.verifyAdminDashboardUser,

  getUserProfile: userService.getUserProfile,
  updateUserProfile: userService.updateUserProfile,
  updatePassword: userService.updatePassword,
  deleteAccount: userService.deleteAccount,
  activateEmployee: userService.activateEmployee,

  submitComment: commentService.submitComment,
  getAllComments: commentService.getAllComments,
  getCommentById: commentService.getCommentById,
  updateComment: commentService.updateComment,
  deleteComment: commentService.deleteComment,

  submitTalkWithUs: queryService.submitTalkWithUs,
  getAllQueries: queryService.getAllQueries,
  getQueryById: queryService.getQueryById,
  updateQueryStatus: queryService.updateQueryStatus,
  deleteQuery: queryService.deleteQuery,

  getAllProjects: projectService.getAllProjects,
  addProject: projectService.addProject,
  updateProjectData: projectService.updateProjectData,
  deleteProject: projectService.deleteProject,

  getCompanyStats: companyServices.getCompanyStats,

  getAllRequirements: requirementsServices.getAllRequirements,
  postRequirement: requirementsServices.PostRequirement,
  updateRequirement: requirementsServices.UpdateRequirement,
  deleteRequirement: requirementsServices.DeleteRequirement,

  getAllEmployee: employeeServices.getAllemployee,
  updateEmployeeRole: employeeServices.updateEmployeeRole,
  updateEmployeeProfile: employeeServices.updateEmployeeProfile,
  getEmployeeProfile: employeeServices.getEmployeeProfile,

  updateEmployeeSalary: salaryServices.updateEmployeeSalary,
};

export default apiService;
