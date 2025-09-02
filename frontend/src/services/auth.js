import api from './api';

export const authService = {
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    const response = await api.post('/api/login', formData);
    return response.data;
  },
  
  register: async (userData) => {
    const formData = new FormData();
    formData.append('email', userData.email);
    formData.append('first_name', userData.firstName);
    formData.append('last_name', userData.lastName);
    formData.append('password', userData.password);
    formData.append('confirm_password', userData.confirmPassword);
    
    const response = await api.post('/api/register', formData);
    return response.data;
  },
  
  verifyToken: async () => {
    const response = await api.get('/api/verify');
    return response.data;
  },
};

export const teacherService = {
  create: async (teacherData) => {
    const formData = new FormData();
    formData.append('email', teacherData.email);
    formData.append('first_name', teacherData.firstName);
    formData.append('last_name', teacherData.lastName);
    formData.append('password', teacherData.password);
    formData.append('university_name', teacherData.universityName);
    formData.append('gender', teacherData.gender);
    formData.append('year_joined', teacherData.yearJoined);
    formData.append('department', teacherData.department);
    
    const response = await api.post('/api/teachers/create', formData);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/api/teachers');
    return response.data;
  },
};