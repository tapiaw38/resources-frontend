<template>
  <div class="container">
    <div id="container-pdf" class="container-pdf">
      <div :class="{ loading: loader }">
        <loader v-show="loader"></loader>
      </div>
      <div class="container-tools">
        <button class="btn-outline" @click="$router.back()">
          <arrow-left></arrow-left>
        </button>
        <select name="month" v-model="monthSelected">
          <template v-for="month in months" :key="month.id">
            <option :value="month.value">{{ month.text }}</option>
          </template>
        </select>
      </div>
      <div v-if="employee !== null">
        <button class="btn-download" @click="downloadCardEmployee(employee.id)">
          <pdf></pdf> {{ employee.last_name }} {{ employee.first_name }}
        </button>
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
      </div>
      <div v-else class="loader-home">
        <loader></loader>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted, computed } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
//import "vue-color-kit/dist/vue-color-kit.css";

import api from "../../../api/api";

import Card from "../../../modules/card/components/Card.vue";
import Loader from "../../../components/Loader.vue";
import { Pdf, ArrowLeft } from "../../../components/Icons";
export default {
  name: "EmployeeCard",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    Card,
    Loader,
    Pdf,
    ArrowLeft,
  },
  setup(props) {
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

    let loader = ref(false);
    let cards = ref([]);
    let employee = ref(null);

    // fetch data

    const fetchEmployeeById = async () => {
      try {
        const { data } = await api.get(`/employees/get_by_id/${props.id}`);
        employee.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDataCard = async () => {
      const { data } = await api.get("cards");
      cards.value = data;
    };

    const cardColor = computed(() => {
      if (cards.value.length > 0) {
        return cards.value.find((card) => card.id === 1).color;
      }
      return "black";
    });

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

    // mounted component
    onMounted(() => {
      fetchEmployeeById();
      fetchDataCard();
    });

    return {
      employee,
      work_journal,
      downloadCardEmployee,
      months,
      monthSelected,
      loader,
      cardColor,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin-top: 20px;
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
  align-items: left;
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
