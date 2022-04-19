import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const useEmployee = () => {
  const store = useStore();

  const createEmployee = (employee) => {
    store.dispatch("employee/addEmployee", employee);
  };

  const editEmployee = ({ employee, type }) => {
    store.dispatch("employee/updateEmployee", { employee, type });
  };

  const deleteEmployee = ({ employee, type }) => {
    store.dispatch("employee/deleteEmployee", { employee, type });
  };

  const searchById = (id) => {
    store.dispatch("employee/loadEmployeeById", id);
  };

  onMounted(() => {
    store.dispatch("employee/loadEmloyeesByType", 2);
    store.dispatch("employee/loadTrainnesByType", 1);
    store.dispatch("employee/loadPermanentByType", 3);
    store.dispatch("employee/loadWorkplaces");
    store.dispatch("employee/loadEmployeeTypes");
  });

  return {
    createEmployee,
    editEmployee,
    deleteEmployee,
    searchById,
    employee: computed(() => store.getters["employee/getEmployee"]),
    employees: computed(() => store.getters["employee/getEmployees"]),
    trainees: computed(() => store.getters["employee/getTrainees"]),
    permanents: computed(() => store.getters["employee/getPermanents"]),
    workplaces: computed(() => store.getters["employee/getWorkplaces"]),
    employeeTypes: computed(() => store.getters["employee/getEmployeeTypes"]),
  };
};

export default useEmployee;
