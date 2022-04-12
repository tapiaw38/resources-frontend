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
    <div class="card-edit">
      <button class="btn btn-primary" @click="togglePicker">
        <edit></edit>
        Editar color
      </button>

      <button
        v-if="showPicker"
        class="btn ml color-primary"
        @click="editCardColor(1)"
      >
        <arrow-rigth></arrow-rigth>
      </button>
      <div class="color-picker" v-if="showPicker">
        <ColorPicker
          theme="light"
          :color="color"
          :sucker-hide="false"
          :sucker-canvas="suckerCanvas"
          :sucker-area="suckerArea"
          @changeColor="changeColor"
          @openSucker="openSucker"
        />
      </div>
    </div>
    <div :class="{ loading: loader }">
      <loader v-show="loader"></loader>
    </div>

    <div v-if="searchEmployee.length > 0">
      <template v-for="employee in searchEmployee" :key="employee.id">
        <h2 class="title-card">{{ employee.last_name }} {{ employee.first_name }}</h2>
        <div class="container-target" :id="'target-' + employee.id">
          <div
            class="container-employee target"
            v-for="work in work_journal"
            :key="work.id"
          >
            <card
              :employee="employee"
              :work="work"
              :months="months"
              :monthSelected="monthSelected"
              :cardColor="cardColor"
            />
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
import { ColorPicker } from "vue-color-kit";
//import "vue-color-kit/dist/vue-color-kit.css";

import api from "../../../api/api";

import Card from "../components/Card.vue";
import Loader from "../../../components/Loader.vue";
import { Edit, ArrowRigth } from "../../../components/Icons";
export default {
  name: "Home",
  components: {
    Card,
    Loader,
    Edit,
    ArrowRigth,
    ColorPicker,
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

    let monthSelected = ref(new Date().getMonth() + 2);

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
    let cards = ref([]);

    // color picker
    let color = ref("#59c7f9");
    let suckerCanvas = ref(null);
    let suckerArea = ref([]);
    let isSucking = ref(false);
    let showPicker = ref(false);

    const changeColor = (c) => {
      const { r, g, b, a } = c.rgba;
      color.value = `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    const openSucker = (isOpen) => {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    };

    const togglePicker = () => {
      showPicker.value = !showPicker.value;
    };

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
      const { data } = await api.get(
        `employees/get_by_type/${typeSelected.value}`
      );
      employees.value = data;
    };

    const fetchDataEmployeeTypes = async () => {
      const { data } = await api.get("types");
      employeeTypes.value = data;
    };

    const fetchDataCard = async () => {
      const { data } = await api.get("cards");
      cards.value = data;
    };

    const editCardColor = async (id) => {
      let card = {
        width: 0,
        height: 0,
        color: color.value,
      };

      const { data } = await api.put(`cards/update/${id}`, card);
      cards.value[0] = data;
      togglePicker();
    };

    const cardColor = computed(() => {
      if (cards.value.length > 0) {
        return cards.value.find((card) => card.id === 1).color;
      }
      return "black";
    });

    watch(typeSelected, async () => {
      loader.value = true;
      await fetchDataEmployee();
      loader.value = false;
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
      fetchDataCard();
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
      cardColor,
      color,
      changeColor,
      openSucker,
      suckerCanvas,
      suckerArea,
      isSucking,
      showPicker,
      togglePicker,
      editCardColor,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../node_modules/vue-color-kit/dist/vue-color-kit.css";

.title-card {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: $primary;
}
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
  background-color: $info;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;
  cursor: pointer;
  border: 1px solid $info;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    background-color: white;
    color: $info;
    transition: 0.5s ease-in-out;
    font-weight: bold;
  }
}

.card-edit {
  display: block;
  text-align: left;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 30px;
}
.color-picker {
  margin-top: 5px;
  position: absolute;
  z-index: 2;
}
</style>
