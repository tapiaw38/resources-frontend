import api from "../../../../api";

// actions employees
export const loadEmloyeesByType = ({ commit }, type) => {
  const { data } = api.get(`/employees/get_by_type/${type}`);
  commit("setEmployees", data);
};

export const loadTrainnesByType = ({ commit }, type) => {
  const { data } = api.get(`/employees/get_by_type/${type}`);
  commit("setTrainnes", data);
};

export const loadPermanentByType = ({ commit }, type) => {
  const { data } = api.get(`/employees/get_by_type/${type}`);
  commit("setPermanents", data);
};

export const loadEmployeeById = ({ commit }, id) => {
  const { data } = api.get(`/employees/get_by_id/${id}`);
  commit("setEmployee", data);
};

export const addEmployee = ({ commit }, employee) => {
  const { data } = api.post("/employees/create", employee);
  commit("addEmployee", data);
};

export const updateEmployee = ({ commit }, { employee, type }) => {
  const { data } = api.put(`/employees/update/${employee.id}`, employee);
  if (type === "1") {
    commit("updateTrainnes", data);
    return;
  }
  if (type === "2") {
    commit("updateEmployees", data);
    return;
  }
  if (type === "3") {
    commit("updatePermanent", data);
    return;
  }
  return;
};

export const deleteEmployee = ({ commit }, { employee, type }) => {
  const { data } = api.delete(`/employees/delete/${employee.id}`);
  if (type === "1") {
    commit("deleteTrainnes", data);
    return;
  }
  if (type === "2") {
    commit("deleteEmployees", data);
    return;
  }
  if (type === "3") {
    commit("deletePermanent", data);
    return;
  }
  return;
};
