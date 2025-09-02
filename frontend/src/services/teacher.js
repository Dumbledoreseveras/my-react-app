import api from "./api";

// Define service functions
const getTeachers = () => api.get("/teachers");
const getTeacherById = (id) => api.get(`/teachers/${id}`);
const createTeacher = (data) => api.post("/teachers", data);
const updateTeacher = (id, data) => api.put(`/teachers/${id}`, data);
const deleteTeacher = (id) => api.delete(`/teachers/${id}`);

// Export them as a single object (default export)
const teacherService = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};

export default teacherService;
