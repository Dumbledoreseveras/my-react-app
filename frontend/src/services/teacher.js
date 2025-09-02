import api from "./api";

const getTeachers = () => api.get("/teachers");
const getTeacherById = (id) => api.get(`/teachers/${id}`);
const createTeacher = (data) => api.post("/teachers", data);
const updateTeacher = (id, data) => api.put(`/teachers/${id}`, data);
const deleteTeacher = (id) => api.delete(`/teachers/${id}`);

const teacherService = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};

export default teacherService;
