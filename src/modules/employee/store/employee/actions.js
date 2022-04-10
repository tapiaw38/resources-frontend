import api from "../../../../api";

// actions employees
export const loadEmloyeesByType = ({ commit }, type) => {
  const { data } = api.get(`/employees/${type}`);
  commit("setEmployees", data);
};
