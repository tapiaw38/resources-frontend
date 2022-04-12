export default () => ({
  isLoading: true,
  employees: localStorage.getItem("employees") || [],
  trainees: localStorage.getItem("trainees") || [],
  permanents: localStorage.getItem("permanents") || [],
  employee: null,
  allEmployees: localStorage.getItem("allEmployees") || [],
  workplaces: [],
});
