<template>
  <div class="container">
    <h1>Empleados</h1>
    <div class="options-container">
      <router-link class="btn-outline" :to="{ name: 'home' }"
        ><home></home
      ></router-link>
      <div class="search">
        <input type="text" v-model="search" placeholder="Buscar aqui ..." />
        <select v-model="typeSelected" name="select-type" id="select-type">
          <option
            v-for="option in getOptionType"
            :value="option.value"
            :key="option.text"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <button @click="createShowModal">
        <add></add>
        <span>Nuevo Empleado</span>
      </button>
    </div>
    <div v-if="employees.length > 0">
      <table id="customers">
        <thead>
          <tr>
            <th></th>
            <th>Legajo</th>
            <th>N Agente</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Fec Nac</th>
            <th>Ingreso</th>
            <th>Categoria</th>
            <th>Revista</th>
            <th>Area</th>
            <th>Codigo</th>
            <th>N Emple.</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="employee in searchEmployee" :key="employee.id">
            <tr>
              <td>
                <user></user>
              </td>
              <td v-if="employee.file_code">{{ employee.file_code }}</td>
              <td v-else>-</td>
              <td v-if="employee.agent_number">{{ employee.agent_number }}</td>
              <td v-else>-</td>
              <td>{{ employee.first_name }}</td>
              <td>{{ employee.last_name }}</td>
              <td>{{ employee.document_number }}</td>
              <td v-if="employee.birth_date">
                {{ formatDate(employee.birth_date) }}
              </td>
              <td v-else>-</td>
              <td v-if="employee.date_admission">
                {{ formatDate(employee.date_admission) }}
              </td>
              <td v-else>-</td>
              <td>{{ employee.category }}</td>
              <td>
                {{
                  employee.employee_type
                    ? employee.employee_type.name
                    : "Sin revista"
                }}
              </td>
              <td>
                {{ employee.workplace ? employee.workplace.name : "Sin area" }}
              </td>
              <td>
                {{ employee.workplace ? employee.workplace.code : "" }}
              </td>
              <td>{{ employee.work_number }}</td>
              <td>
                <button @click="selectEmployee(employee)" class="btn-outline">
                  <edit></edit>
                </button>
              </td>
              <td>
                <button
                  @click="selectDeleteEmployee(employee)"
                  class="btn-outline"
                >
                  <delete></delete>
                </button>
              </td>
              <td>
                <router-link
                  class="btn-outline"
                  :to="{ name: 'employee-card', params: { id: employee.id } }"
                >
                  <card></card>
                </router-link>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div v-else class="loader-home">
      <loader></loader>
    </div>
    <!-- edit employee modal -->
    <default-modal v-if="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h3>Editar Empleado</h3>
      </template>
      <template v-slot:body>
        <form class="form-employee" @submit.prevent="updateEmployee">
          <div class="form-group">
            <label for="file_code">Legajo</label>
            <input
              type="text"
              class="form-control"
              id="file_code"
              v-model="employee.file_code"
            />
          </div>
          <div class="form-group">
            <label for="agent_number">N Agente</label>
            <input
              type="text"
              class="form-control"
              id="agent_number"
              v-model="employee.agent_number"
            />
          </div>
          <div class="form-group">
            <label for="first_name">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              v-model="employee.first_name"
            />
          </div>
          <div class="form-group">
            <label for="last_name">Apellido</label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              v-model="employee.last_name"
            />
          </div>
          <div class="form-group">
            <label for="document_number">DNI</label>
            <input
              type="text"
              class="form-control"
              id="document_number"
              v-model="employee.document_number"
            />
          </div>
          <div class="form-group">
            <label for="birth_date">Fec Nac</label>
            <input
              type="date"
              class="form-control"
              id="birth_date"
              v-model="employee.birth_date"
            />
          </div>
          <div class="form-group">
            <label for="date_admission">Ingreso</label>
            <input
              type="date"
              class="form-control"
              id="date_admission"
              v-model="employee.date_admission"
            />
          </div>
          <div class="form-group">
            <label for="category">Categoria</label>
            <input
              type="number"
              class="form-control"
              id="category"
              v-model="employee.category"
            />
          </div>
          <div class="form-group">
            <label for="employee_type">Revista</label>
            <select
              class="form-control"
              id="employee_type"
              v-model="employee.employee_type"
            >
              <option
                v-for="option in getOptionType"
                :value="option.value"
                :key="option.text"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="workplace_id">Area</label>
            <select
              class="form-control"
              id="workplace_id"
              v-model="employee.workplace"
            >
              <option :value="0">Sin area</option>
              <option
                v-for="workplace in workplaces"
                :key="workplace.id"
                :value="workplace.id"
              >
                {{ workplace.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="work_number">N Emple.</label>
            <input
              type="text"
              class="form-control"
              id="work_number"
              v-model="employee.work_number"
            />
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </template>
      <template v-slot:footer>
        <br />
      </template>
    </default-modal>
    <!-- create employee modal -->
    <default-modal v-if="createIsModalVisible" @close="createCloseModal">
      <template v-slot:header>
        <h3>Agregar Empleado</h3>
      </template>
      <template v-slot:body>
        <form class="form-employee" @submit.prevent="createEmployeeAction">
          <div class="form-group">
            <label for="file_code">Legajo</label>
            <input
              type="text"
              class="form-control"
              id="file_code"
              v-model="createEmployee.file_code"
            />
          </div>
          <div class="form-group">
            <label for="agent_number">N Agente</label>
            <input
              type="text"
              class="form-control"
              id="agent_number"
              v-model="createEmployee.agent_number"
            />
          </div>
          <div class="form-group">
            <label for="first_name">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="first_name"
              required
              v-model="createEmployee.first_name"
            />
          </div>
          <div class="form-group">
            <label for="last_name">Apellido</label>
            <input
              type="text"
              class="form-control"
              id="last_name"
              required
              v-model="createEmployee.last_name"
            />
          </div>
          <div class="form-group">
            <label for="document_number">DNI</label>
            <input
              type="text"
              class="form-control"
              id="document_number"
              v-model="createEmployee.document_number"
            />
          </div>
          <div class="form-group">
            <label for="birth_date">Fec Nac</label>
            <input
              type="date"
              class="form-control"
              id="birth_date"
              v-model="createEmployee.birth_date"
            />
          </div>
          <div class="form-group">
            <label for="date_admission">Ingreso</label>
            <input
              type="date"
              class="form-control"
              id="date_admission"
              v-model="createEmployee.date_admission"
            />
          </div>
          <div class="form-group">
            <label for="category">Categoria</label>
            <input
              type="number"
              class="form-control"
              id="category"
              v-model="createEmployee.category"
            />
          </div>
          <div class="form-group">
            <label for="employee_type">Revista</label>
            <select
              class="form-control"
              id="employee_type"
              v-model="createEmployee.employee_type"
            >
              <option
                v-for="option in getOptionType"
                :value="option.value"
                :key="option.text"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="workplace_id">Area</label>
            <select
              class="form-control"
              id="workplace_id"
              v-model="createEmployee.workplace"
            >
              <option value="">Sin area</option>
              <option
                v-for="workplace in workplaces"
                :key="workplace.id"
                :value="workplace.id"
              >
                {{ workplace.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="work_number">N Emple.</label>
            <input
              type="text"
              class="form-control"
              id="work_number"
              v-model="createEmployee.work_number"
            />
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </template>
      <template v-slot:footer>
        <br />
      </template>
    </default-modal>
    <!-- delete employee modal -->
    <default-modal v-if="deleteIsModalVisible" @close="deleteCloseModal">
      <template v-slot:header>
        <h3>Eliminar Empleado</h3>
      </template>
      <template v-slot:body>
        <div class="delete-content">
          <h4>Estas seguro de eliminar este empleado?</h4>
          <p>
            Esta accion no se puede deshacer, si lo haces se eliminara el
            empleado y todos sus datos.
          </p>
          <button type="button" class="btn btn-danger" @click="deleteEmployee">
            Eliminar
          </button>
        </div>
      </template>
      <template v-slot:footer>
        <br />
      </template>
    </default-modal>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";

// utilities
import api from "../../../api/api";
import useModal from "../../../composables/useModal";
import { formatDate, formatDateDatabase } from "../../../helpers/formatDate";
import moment from "moment";

// composables
import useEmployee from "../composables/useEmployee";

// components
import DefaultModal from "../../../containers/DefaultModal.vue";
import Loader from "../../../components/Loader.vue";

// icons
import { Edit, User, Add, Home, Card, Delete } from "../../../components/Icons";
export default {
  name: "Employees",
  components: {
    DefaultModal,
    Loader,
    Edit,
    User,
    Add,
    Home,
    Card,
    Delete,
  },
  setup() {
    const { isModalVisible, showModal, closeModal } = useModal();
    const {
      isModalVisible: createIsModalVisible,
      showModal: createShowModal,
      closeModal: createCloseModal,
    } = useModal();
    const {
      isModalVisible: deleteIsModalVisible,
      showModal: deleteShowModal,
      closeModal: deleteCloseModal,
    } = useModal();

    const {
      employees,
      workplaces,
      employeeTypes,
      createEmployee: createEmployeeHandler,
    } = useEmployee();

    let employee = ref({
      id: null,
      file_code: "",
      agent_number: "",
      first_name: "",
      last_name: "",
      document_number: "",
      birth_date: null,
      date_admission: null,
      phone: "",
      address: "",
      picture: "",
      salary: 0,
      category: "",
      status: "",
      work_number: "",
      employee_type: "",
      workplace: "",
    });

    let search = ref("");
    // select type
    let typeSelected = ref(2);

    const getOptionType = computed(() => {
      return employeeTypes.value
        .map((type) => {
          return {
            value: type.id,
            text: type.name,
          };
        })
        .filter((type) => type.value !== 1);
    });

    //get employees by term
    const searchEmployee = computed(() =>
      employees.value.filter((e) => {
        return (
          e.first_name.toLowerCase().includes(search.value.toLowerCase()) ||
          String(e.last_name).toLowerCase().includes(search.value.toLowerCase())
        );
      })
    );

    // select employee to update
    const selectEmployee = (e) => {
      employee.value.id = e.id;
      employee.value.file_code = e.file_code;
      employee.value.agent_number = e.agent_number;
      employee.value.first_name = e.first_name;
      employee.value.last_name = e.last_name;
      employee.value.document_number = e.document_number;
      employee.value.birth_date = formatDateDatabase(e.birth_date);
      employee.value.date_admission = formatDateDatabase(e.date_admission);
      employee.value.salary = e.salary;
      employee.value.status = e.status;
      employee.value.category = e.category;
      employee.value.work_number = e.work_number;
      employee.value.employee_type = e.employee_type ? e.employee_type.id : 0;
      employee.value.workplace = e.workplace ? e.workplace.id : 0;
      showModal();
    };

    // update employee
    const updateEmployee = async () => {
      let dataUpdate = {
        file_code: employee.value.file_code,
        agent_number: employee.value.agent_number,
        first_name: employee.value.first_name,
        last_name: employee.value.last_name,
        document_number: employee.value.document_number,
        birth_date: employee.value.birth_date
          ? moment(employee.value.birth_date).add("days", 1).format()
          : null,
        date_admission: employee.value.date_admission
          ? moment(employee.value.date_admission).add("days", 1).format()
          : null,
        phone: employee.value.phone,
        address: employee.value.address,
        picture: employee.value.picture,
        salary: employee.value.salary,
        category: employee.value.category,
        status: employee.value.status,
        work_number: employee.value.work_number,
        employee_type: employee.value.employee_type,
        workplace: employee.value.workplace,
      };

      try {
        const { data } = await api.put(
          `/employees/update/${employee.value.id}`,
          dataUpdate
        );
        const idx = employees.value.map((e) => e.id).indexOf(data.id);
        employees.value[idx] = {
          id: data.id,
          file_code: data.file_code,
          agent_number: data.agent_number,
          first_name: data.first_name,
          last_name: data.last_name,
          document_number: data.document_number,
          birth_date: data.birth_date,
          date_admission: data.date_admission,
          phone: data.phone,
          address: data.address,
          picture: data.picture,
          salary: data.salary,
          category: data.category,
          status: data.status,
          work_number: data.work_number,
          employee_type: employeeTypes.value.find(
            (e) => e.id === data.employee_type
          ),
          workplace: workplaces.value.find((w) => w.id == data.workplace),
        };
        closeModal();
      } catch (error) {
        console.log(error);
      }
    };

    // create employee to create
    const createEmployee = ref({
      file_code: "",
      agent_number: "",
      first_name: "",
      last_name: "",
      document_number: "",
      birth_date: "",
      date_admission: "",
      phone: "",
      address: "",
      picture: "",
      salary: 0,
      category: 10,
      work_number: "",
      employee_type: 2,
      workplace: 0,
    });

    // create employee handler
    const createEmployeeAction = async () => {
      createEmployee.value.birth_date = createEmployee.value.birth_date
        ? moment(createEmployee.value.birth_date).add("days", 1).format()
        : null;
      createEmployee.value.date_admission = createEmployee.value.date_admission
        ? moment(createEmployee.value.date_admission).add("days", 1).format()
        : null;

      createEmployeeHandler(createEmployee.value);
      createCloseModal();
    };

    // delete employee

    let employeeDelete = ref(null);

    const deleteEmployee = async () => {
      try {
        await api.delete(`/employees/delete/${employeeDelete.value.id}`);
        const idx = employees.value
          .map((e) => e.id)
          .indexOf(employeeDelete.value.id);
        employees.value.splice(idx, 1);
        deleteCloseModal();
      } catch (error) {
        console.log(error);
      }
    };

    const selectDeleteEmployee = (id) => {
      employeeDelete.value = id;
      deleteShowModal();
    };

    onMounted(() => {
      // fetchData
    });

    watch(typeSelected, async () => {
      //await fetchDataEmployees();
    });

    return {
      employees,
      workplaces,
      employee,
      isModalVisible,
      showModal,
      closeModal,
      formatDate,
      selectEmployee,
      updateEmployee,
      getOptionType,
      typeSelected,
      search,
      searchEmployee,
      createIsModalVisible,
      createShowModal,
      createCloseModal,
      createEmployee,
      createEmployeeAction,
      deleteEmployee,
      deleteCloseModal,
      deleteIsModalVisible,
      deleteShowModal,
      selectDeleteEmployee,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 90%;
  padding: 0 20px 50px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 5px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: $primary;
  color: $white;
}

/* style form employee */
.form-employee {
  margin: 0 auto;
  max-width: 90%;
  padding: 0 20px 50px;

  .form-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    label {
      display: block;
      font-size: 14px;
      font-weight: bold;
      padding: 5px;
    }

    input {
      display: block;
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    select {
      display: block;
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
  button {
    background-color: $primary;
    color: $white;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 5px;
  }
}

.options-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;

  button {
    background-color: $white;
    color: $primary;
    border: 1px solid $primary;
    cursor: pointer;
    padding: 6px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: $primary;
      color: $white;
      transition: 0.2s ease-in-out;
    }

    span {
      margin-left: 10px;
    }
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;

    input {
      display: block;
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    select {
      display: block;
      width: 100%;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-left: 10px;
    }
  }
}

.loader-home {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
}

.delete-content {
  width: 400px;
}
</style>
