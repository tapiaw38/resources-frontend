<template>
  <div class="container">
    <h1>Areas de trabajo</h1>
    <div class="options-container">
      <router-link class="btn-outline" :to="{ name: 'home' }"
        ><home></home
      ></router-link>
      <button @click="showModalAdd">
        <add></add>
        <span>Nueva Area</span>
      </button>
    </div>
    <div v-if="workplaces.length > 0">
      <table id="customers">
        <thead>
          <tr>
            <th></th>
            <th>Area</th>
            <th>Codigo</th>
            <th>Direccion</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="work in workplaces" :key="work.name">
            <tr>
              <td>
                <clipboard></clipboard>
              </td>
              <td>{{ work.name }}</td>
              <td>{{ work.code }}</td>
              <td>{{ work.address }}</td>
              <td>
                <button class="btn-edit" @click="selectWorkplace(work)">
                  <edit></edit>
                </button>
                <button v-if="false" class="btn-delete">
                  <delete></delete>
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div v-else class="loader-home">
      <loader></loader>
    </div>
    <!-- Modal -->
    <default-modal v-if="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h3>Editar Area</h3>
      </template>
      <template v-slot:body>
        <form class="form-workplace" @submit.prevent="updateWorkplace">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="workplace.name"
              required
            />
          </div>
          <div class="form-group">
            <label for="code">Codigo</label>
            <input
              type="text"
              class="form-control"
              id="code"
              v-model="workplace.code"
              required
            />
          </div>
          <div class="form-group">
            <label for="address">Direccion</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="workplace.address"
            />
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </template>
      <template v-slot:footer>
        <br />
      </template>
    </default-modal>
    <!--- modal add workplaces -->
    <default-modal v-if="isModalVisibleAdd" @close="closeModalAdd">
      <template v-slot:header>
        <h3>Agregar Area</h3>
      </template>
      <template v-slot:body>
        <form class="form-workplace" @submit.prevent="addWorkplace">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="workplaceAdd.name"
              required
            />
          </div>
          <div class="form-group">
            <label for="code">Codigo</label>
            <input
              type="text"
              class="form-control"
              id="code"
              v-model="workplaceAdd.code"
              required
            />
          </div>
          <div class="form-group">
            <label for="address">Direccion</label>
            <input
              type="text"
              class="form-control"
              id="address"
              v-model="workplaceAdd.address"
            />
          </div>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </template>
      <template v-slot:footer>
        <br />
      </template>
    </default-modal>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "../../../api/api";
import useModal from "../../../composables/useModal";

import DefaultModal from "../../../containers/DefaultModal.vue";
import Loader from "../../../components/Loader.vue";

import { Edit, Delete, Clipboard, Home, Add } from "../../../components/Icons";
export default {
  name: "Workplaces",
  components: {
    DefaultModal,
    Loader,
    Edit,
    Delete,
    Home,
    Add,
    Clipboard,
  },
  setup() {
    const { isModalVisible, showModal, closeModal } = useModal();
    const {
      isModalVisible: isModalVisibleAdd,
      showModal: showModalAdd,
      closeModal: closeModalAdd,
    } = useModal();

    let workplaces = ref([]);

    let workplace = ref({
      id: null,
      name: "",
      code: "",
      address: "",
    });

    let workplaceAdd = ref({
      name: "",
      code: "",
      address: "",
    });

    const enableEdit = ref(false);

    const fetchData = async () => {
      const { data } = await api.get("workplaces/all");
      workplaces.value = data;
    };

    const selectWorkplace = (work) => {
      workplace.value.id = work.id;
      workplace.value.name = work.name;
      workplace.value.code = work.code;
      workplace.value.address = work.address;
      showModal();
    };

    const updateWorkplace = async () => {
      let dataUpdate = {
        name: workplace.value.name,
        code: workplace.value.code,
        address: workplace.value.address,
      };

      if (!workplace.value.id) {
        return;
      }

      try {
        const { data } = await api.put(
          `workplaces/update/${workplace.value.id}`,
          dataUpdate
        );
        const idx = workplaces.value.map((wp) => wp.id).indexOf(data.id);
        workplaces.value[idx] = data;
        closeModal();
      } catch (error) {
        console.log(error);
      }
    };

    const addWorkplace = async () => {
      try {
        const { data } = await api.post(
          "workplaces/create",
          workplaceAdd.value
        );
        workplaces.value = [...workplaces.value, data];
        closeModalAdd();
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      workplaces,
      workplace,
      fetchData,
      updateWorkplace,
      enableEdit,
      showModal,
      closeModal,
      isModalVisible,
      isModalVisibleAdd,
      showModalAdd,
      closeModalAdd,
      selectWorkplace,
      workplaceAdd,
      addWorkplace,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 960px;
  padding: 0 20px 50px;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 16px;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 4px;
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
  color: white;
}

.btn-edit {
  background-color: $primary;
  color: white;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 5px;
}

.btn-delete {
  background-color: $danger;
  color: white;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 5px;
  margin-left: 10px;
}

/* styles form */
.form-workplace {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
      padding: 10px;
    }

    input {
      display: block;
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
  button {
    background-color: $primary;
    color: white;
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

  .btn-outline,
  button {
    background-color: white;
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
      color: white;
      transition: 0.2s ease-in-out;
    }

    span {
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
</style>
