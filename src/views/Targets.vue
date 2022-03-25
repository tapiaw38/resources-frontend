<template>
  <div id="container-pdf" class="container-pdf">
    <div class="container-tools">
      <select name="month" v-model="monthSelected">
        <template v-for="month in months" :key="month.id">
          <option :value="month.value">{{ month.text }}</option>
        </template>
      </select>
      <div>
        <input type="text" placeholder="Buscar aquí..." v-model="search" />
      </div>
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
    <div :class="{ loading: loader }">
      <loader v-show="loader"></loader>
    </div>

    <div v-if="searchEmployee.length > 0">
      <template v-for="employee in searchEmployee" :key="employee.id">
        <button class="btn-download" @click="downloadCardEmployee(employee.id)">
          Descargar {{ employee.first_name }}
        </button>
        <div class="container-target" :id="'target-' + employee.id">
          <div
            class="container-employee target"
            v-for="work in work_journal"
            :key="work.id"
          >
            <table class="detail">
              <tr>
                <th>{{ employee.workplace.code }}</th>
                <th>{{ employee.work_number }}</th>
                <th>{{ work.id }}</th>
              </tr>
            </table>
            <table class="date">
              <tr>
                <th>
                  {{ months.find((m) => m.value === monthSelected).text }}
                </th>
                <th>2022</th>
                <th>Quincena</th>
              </tr>
            </table>
            <table class="name">
              <tr>
                <th>Nombre y Apellido</th>
              </tr>
              <tr>
                <td>{{ employee.last_name }} {{ employee.first_name }}</td>
              </tr>
            </table>
            <table class="header">
              <tr>
                <th>Dia</th>
                <th>Manana</th>
                <th>Tarde</th>
                <th>Noche</th>
              </tr>
            </table>
            <table class="customers">
              <tr>
                <th></th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Entrada</th>
                <th>Salida</th>
              </tr>
              <template v-for="(day, index) in work.day_start" :key="index">
                <tr>
                  <td>{{ day }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </template>
            </table>
            <table class="footer">
              <tr>
                <th>Dias</th>
                <th>Horas</th>
                <th>tardanzas</th>
                <th>Faltas</th>
                <th>Hs Extras</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </template>
    </div>
    <div v-else class="loader-home">
      <loader></loader>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted, computed, watch } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import api from "../api/api";

import Loader from "../components/Loader.vue";

export default {
  name: "Home",
  components: {
    Loader,
  },
  setup() {
    let months = ref([
      { text: "Enero", value: 1 },
      { text: "Febrero", value: 2 },
      { text: "Marzo", value: 3 },
      { text: "Abril", value: 4 },
      { text: "Mayo", value: 5 },
      { text: "Junio", value: 6 },
      { text: "Julio", value: 7 },
      { text: "Agosto", value: 8 },
      { text: "Septiembre", value: 9 },
      { text: "Octubre", value: 10 },
      { text: "Noviembre", value: 11 },
      { text: "Diciembre", value: 12 },
    ]);

    let monthSelected = ref(new Date().getMonth() + 1);

    let employees = ref([]);

    let work_journal = [
      {
        id: 1,
        day_start: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      },
      {
        id: 2,
        day_start: [
          16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
      },
    ];

    let search = ref("");
    let loader = ref(false);
    let typeSelected = ref(2);
    let employeeTypes = ref([]);

    const getOptionType = computed(() => {
      return employeeTypes.value.map((type) => {
        return {
          value: type.id,
          text: type.name,
        };
      });
    });

    // fetch data employees

    const fetchDataEmployee = async () => {
      const { data } = await api.get("employees/get_by_type", {
        params: {
          type_id: typeSelected.value,
        },
      });
      employees.value = data;
    };

    const fetchDataEmployeeTypes = async () => {
      const { data } = await api.get("types");
      employeeTypes.value = data;
    };

    watch(typeSelected, async () => {
      await fetchDataEmployee();
    });

    // search employee

    const searchEmployee = computed(() =>
      employees.value.filter((e) => {
        return (
          e.first_name.toLowerCase().includes(search.value.toLowerCase()) ||
          String(e.last_name).toLowerCase().includes(search.value.toLowerCase())
        );
      })
    );

    // Convert to PDF whith jsPDF and html2canvas
    const downloadCardEmployee = async (id) => {
      loader.value = true;
      const target = await document.getElementById(`target-${id}`);
      const pdf = new jsPDF("l", "mm", "legal");
      const options = {
        background: "#fff",
        scale: 0.9,
        width: target.clientWidth,
        height: target.clientHeight,
      };
      html2canvas(target, options).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("empleado.pdf");
        loader.value = false;
      });
    };

    const overlayCanvases = (canvas) => {
      let newCanvas = document.createElement("canvas");
      let ctx = newCanvas.getContext("2d");

      canvas.forEach((n) => {
        ctx.beginPath();
        ctx.drawImage(n, 0, 0, 100, 100);
      });
      return newCanvas.toDataURL();
    };

    const downloadAll = async () => {
      try {
        let targets = []; //document.querySelectorAll(".target");
        targets.push(document.getElementById(`target-1`));
        let canvases = [];
        const pdf = new jsPDF("l", "mm", "letter");
        const options = {
          background: "#fff",
          scale: 0.8,
          width: targets[0].clientWidth,
          height: targets[0].clientHeight,
        };

        if (targets) {
          targets.forEach(async (target) => {
            await html2canvas(target, options)
              .then((canvas) => {
                canvases.push(canvas.toDataURL("image/png"));
              })
              .catch((err) => {
                console.log("eroor", err);
              });
          });
          const imgData = await overlayCanvases(canvases);
          //console.log(imgData);

          pdf.addImage(imgData, "PNG", 0, 0);
          pdf.save("test.pdf");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // mounted component
    onMounted(() => {
      fetchDataEmployee();
      fetchDataEmployeeTypes();
    });

    return {
      employees,
      searchEmployee,
      search,
      work_journal,
      downloadCardEmployee,
      downloadAll,
      months,
      monthSelected,
      loader,
      typeSelected,
      getOptionType,
    };
  },
};
</script>

<style lang="scss" scoped>
.container-pdf {
  max-width: 740px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container-target {
  display: grid;
  grid-template-columns: repeat(2, 360px);
  grid-gap: 5px;
  padding: 20px;
}

.container-employee {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ccc;
  padding: 5px;
}
.detail {
  border-collapse: collapse;
  border: 1px solid #04aa6d;
  width: 336px;
}

.detail th:nth-child(1) {
  border-bottom: 1px solid #04aa6d;
  font-size: 38px;
}
.detail th:nth-child(2) {
  border-right: 1px solid #04aa6d;
  font-size: 38px;
}

.detail th:nth-child(3) {
  min-width: 20px;
  font-size: 40px;
  float: right;
  margin-right: 25px;
}

.date {
  border-collapse: collapse;
  border-bottom: 1px solid #04aa6d;
  border-left: 1px solid #04aa6d;
  border-right: 1px solid #04aa6d;
  width: 336px;
}

.date th:nth-child(2) {
  font-size: 20px;
  min-width: 77px;
}

.date th:nth-child(3) {
  font-size: 12px;
  float: right;
  padding: 10px;
}

.name {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  padding: 5px;
}

.name th,
td {
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
}

.footer {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  font-size: 12px;
  min-width: 337px;
}

.footer th {
  text-align: center;
  background-color: #04aa6d;
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
}

.footer th,
td {
  border: 1px solid #ddd;
  padding-bottom: 8px;
  padding-top: 8px;
  min-height: 40px;
}

.footer td {
  padding-top: 15px;
  padding-bottom: 15px;
}
.header {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  font-size: 12px;
}
.header th {
  text-align: center;
  background-color: #04aa6d;
  color: white;
  min-height: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.header th:first-child {
  min-width: 46px;
}

.header th:nth-child(2) {
  min-width: 94px;
}

.header th:nth-child(3) {
  min-width: 94px;
}

.header th:nth-child(4) {
  min-width: 94px;
}

.customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  font-size: 10px;
  max-width: 120px;
  height: 150px;
}
.customers th {
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  background-color: #04aa6d;
  color: white;
  min-width: 45px;
}

.customers td:first-child {
  text-align: center;
}
.customers td,
.customers th {
  border: 1px solid #ddd;
  padding-bottom: 8px;
  padding-top: 8px;
}

.customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

.customers tr:hover {
  background-color: #ddd;
}

/* container tools */

.container-tools {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.container-tools input {
  width: 200px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-left: 20px;
}

.container-tools select {
  width: 200px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  margin-left: 20px;
}

.loading {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.loader-home {
  margin-top: 20%;
}

.btn-download {
  background-color: #04aa6d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;
  cursor: pointer;
  border: 1px solid #04aa6d;

  &:hover {
    background-color: white;
    color: #04aa6d;
    transition: 0.5s ease-in-out;
    font-weight: bold;
  }
}
</style>
