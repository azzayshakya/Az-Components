import api from './apiService';

export const addEmployee = (payload) => api.post('/employees', payload);

export const getAllEmployees = () => api.get('/employees');

export const updateEmployee = (id, payload) => api.put(`/employees/${id}`, payload);
