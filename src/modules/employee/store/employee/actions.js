import api from "../../../../api/api";

// actions employees
export const loadEmloyeesByType = async ({ commit }, type = 2) => {
  const { data } = await api.get(`/employees/get_by_type/${type}`);
  commit("setEmployees", data);
};

export const loadTrainnesByType = async ({ commit }, type = 1) => {
  const { data } = await api.get(`/employees/get_by_type/${type}`);
  commit("setTrainnes", data);
};

export const loadPermanentByType = async ({ commit }, type = 3) => {
  const data = await api.get(`/employees/get_by_type/${type}`);
  commit("setPermanents", data);
};

export const loadEmployeeById = async ({ commit }, id) => {
  const { data } = await api.get(`/employees/get_by_id/${id}`);
  commit("setEmployee", data);
};

export const addEmployee = async ({ commit }, employee) => {
  const { data } = await api.post("/employees/create", employee);
  commit("addEmployee", data);
};

export const updateEmployee = async ({ commit }, employee) => {
  const { data } = await api.put(`/employees/update/${employee.id}`, employee);
  commit("updateEmployee", data);
};

export const deleteEmployee = async ({ commit }, employee) => {
  const { data } = await api.delete(`/employees/delete/${employee.id}`);
  commit("deleteEmployee", data);
};

// actions workplaces

export const loadWorkplaces = async ({ commit }) => {
  const { data } = await api.get("/workplaces/all");
  commit("setWorkplaces", data);
};

// actions employeeTypes

export const loadEmployeeTypes = async ({ commit }) => {
  const { data } = await api.get("/types/all");
  commit("setEmployeeTypes", data);
};
