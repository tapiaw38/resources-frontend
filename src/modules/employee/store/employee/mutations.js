// mutations employee

export const setEmployees = (state, employees) => {
  state.employees = employees;
  localStorage.setItem("employees", JSON.stringify(employees));
  state.isLoading = false;
};

export const setTrainees = (state, trainees) => {
  state.trainees = trainees;
  localStorage.setItem("trainees", JSON.stringify(trainees));
  state.isLoading = false;
};

export const setPermanents = (state, permanents) => {
  state.permanents = permanents;
  localStorage.setItem("permanent", JSON.stringify(permanents));
  state.isLoading = false;
};

export const setAllEmployees = (state, employees) => {
  state.allEmployees = employees;
  localStorage.setItem("allEmployees", JSON.stringify(employees));
  state.isLoading = false;
};

export const setEmployee = (state, employee) => {
  state.employee = employee;
  state.isLoading = false;
};

export const addEmployee = (state, employee) => {
  state.employees = [employee, ...state.employees];
  state.isLoading = false;
};

export const updateEmployee = (state, employee) => {
  const index = state.employees.findIndex((e) => e.id === employee.id);
  state.employees[index] = employee;
  state.isLoading = false;
};

export const deleteEmployee = (state, employee) => {
  const index = state.employees.findIndex((e) => e.id === employee.id);
  state.employees.splice(index, 1);
  state.isLoading = false;
};

export const updateTrainnes = (state, trainees) => {
  const index = state.trainees.findIndex((e) => e.id === trainees.id);
  state.trainees[index] = trainees;
  state.isLoading = false;
};

export const deleteTrainnes = (state, trainees) => {
  const index = state.trainees.findIndex((e) => e.id === trainees.id);
  state.trainees.splice(index, 1);
  state.isLoading = false;
};

export const updatePermanent = (state, permanent) => {
  const index = state.permanent.findIndex((e) => e.id === permanent.id);
  state.permanent[index] = permanent;
  state.isLoading = false;
};

export const deletePermanent = (state, permanent) => {
  const index = state.permanent.findIndex((e) => e.id === permanent.id);
  state.permanent.splice(index, 1);
  state.isLoading = false;
};
