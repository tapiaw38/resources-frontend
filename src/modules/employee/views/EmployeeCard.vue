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
            v-for="work in journal"
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

// utilities
import api from "../../../api/api";
import { months } from "../../../helpers/months";
import { journal } from "../../../helpers/journal";

// composables
import useConvertToPDF from "../../../composables/useConvertToPDF";
import useEmployee from "../composables/useEmployee";

// icons
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
    const { loaderToPDF, downloadPDF } = useConvertToPDF();
    const { employee, searchById } = useEmployee();

    let monthSelected = ref(new Date().getMonth() + 2);
    let cards = ref([]);

    // fetch data

    const fetchDataCard = async () => {
      const { data } = await api.get("cards/all");
      cards.value = data;
    };

    const cardColor = computed(() => {
      if (cards.value.length > 0) {
        return cards.value.find((card) => card.id === 1).color;
      }
      return "black";
    });

    // mounted component
    onMounted(() => {
      searchById(props.id);
      fetchDataCard();
    });

    return {
      employee,
      journal,
      downloadCardEmployee: downloadPDF,
      months,
      monthSelected,
      loader: loaderToPDF,
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
