export const getEmployees = (state) => state.employees;
export const getTrainees = (state) => state.trainees;
export const getPermanents = (state) => state.permanents;

export const getEmployeesByTerm =
  (state) =>
  (term = "") => {
    if (term === "") return state.employees;
    return state.employees.filter((employee) => {
      return (
        employee.first_name.toLowerCase().includes(term.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(term.toLowerCase()) ||
        employee.document_number.toLowerCase().includes(term.toLowerCase())
      );
    });
  };

export const getTraineesByTerm =
  (state) =>
  (term = "") => {
    if (term === "") return state.trainees;
    return state.trainees.filter((trainee) => {
      return (
        trainee.first_name.toLowerCase().includes(term.toLowerCase()) ||
        trainee.last_name.toLowerCase().includes(term.toLowerCase()) ||
        trainee.document_number.toLowerCase().includes(term.toLowerCase())
      );
    });
  };

export const getPermanentByTerm =
  (state) =>
  (term = "") => {
    if (term === "") return state.permanent;
    return state.permanent.filter((permanent) => {
      return (
        permanent.first_name.toLowerCase().includes(term.toLowerCase()) ||
        permanent.last_name.toLowerCase().includes(term.toLowerCase()) ||
        permanent.document_number.toLowerCase().includes(term.toLowerCase())
      );
    });
  };

export const getEmployeeById =
  (state) =>
  (id = "") => {
    const employee = state.employees.find((employee) => employee.id === id);
    if (!employee) return;
    return { ...employee };
  };

export const getTraineeById =
  (state) =>
  (id = "") => {
    const trainee = state.trainees.find((trainee) => trainee.id === id);
    if (!trainee) return;
    return { ...trainee };
  };

export const getPermanentById =
  (state) =>
  (id = "") => {
    const permanent = state.permanent.find((permanent) => permanent.id === id);
    if (!permanent) return;
    return { ...permanent };
  };
