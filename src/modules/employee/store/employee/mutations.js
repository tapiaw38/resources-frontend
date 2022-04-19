// mutations employee

export const setEmployees = (state, employees) => {
  state.employees = employees;
  state.isLoading = false;
};

export const setTrainnes = (state, trainees) => {
  state.trainees = trainees;
  state.isLoading = false;
};

export const setPermanents = (state, permanents) => {
  state.permanents = permanents;
  state.isLoading = false;
};

export const setAllEmployees = (state, employees) => {
  state.allEmployees = employees;
  state.isLoading = false;
};

export const setEmployee = (state, employee) => {
  state.employee = employee;
  state.isLoading = false;
};

export const addEmployee = (state, employee) => {
  if (employee.employee_type === 1) {
    employee.employee_type = state.employeeTypes.find(
      (e) => e.id === employee.employee_type
    );
    if (employee.workplace) {
      employee.workplace = state.workplaces.find(
        (w) => w.id == employee.workplace
      );
    }
    state.trainees = [...state.trainees, employee];
    state.isLoading = false;

    return;
  }

  if (employee.employee_type === 2) {
    employee.employee_type = state.employeeTypes.find(
      (e) => e.id === employee.employee_type
    );
    if (employee.workplace) {
      employee.workplace = state.workplaces.find(
        (w) => w.id == employee.workplace
      );
    }
    state.employees = [...state.employees, employee];
    state.isLoading = false;

    return;
  }

  if (employee.employee_type === 3) {
    employee.employee_type = state.employeeTypes.find(
      (e) => e.id === employee.employee_type
    );
    if (employee.workplace) {
      employee.workplace = state.workplaces.find(
        (w) => w.id == employee.workplace
      );
    }
    state.permanents = [...state.permanents, employee];
    state.isLoading = false;

    return;
  }
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

// mutations workplaces
export const setWorkplaces = (state, workplaces) => {
  state.workplaces = workplaces;
  state.isLoading = false;
};

// mutations employeeTypes
export const setEmployeeTypes = (state, employeeTypes) => {
  state.employeeTypes = employeeTypes;
  state.isLoading = false;
};
