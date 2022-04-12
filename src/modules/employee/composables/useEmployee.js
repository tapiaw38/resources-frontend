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

  onMounted(() => {
    store.dispatch("employee/loadEmployeeByType", 2);
    store.dispatch("employee/loadTrainnesByType", 1);
    store.dispatch("employee/loadPermanentByType", 3);
  });

  return {
    createEmployee,
    editEmployee,
    deleteEmployee,
    employees: computed(() => store.getters["employee/getEmployees"]),
    trainees: computed(() => store.getters["employee/getTrainees"]),
    permanents: computed(() => store.getters["employee/getPermanents"]),
  };
};

export default useEmployee;
