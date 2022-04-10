<template>
  <div>
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
</template>

<script>
// @ is an alias to /src
//import { ref } from "vue";
export default {
  name: "CardEdit",
  props: {
    work: {
      type: Object,
      required: true,
    },
    employee: {
      type: Object,
      required: true,
    },
    months: {
      type: Array,
      required: true,
    },
    monthSelected: {
      type: Number,
      required: true,
    },
    cardColor: {
      type: String,
      required: true,
      default: "black",
    },
  },
  setup() {

    return {

    };
  },
};
</script>

<style lang="scss">
.detail {
  border-collapse: collapse;
  border: 1px solid v-bind("cardColor");
  width: 336px;
}

.detail th:nth-child(1) {
  border-bottom: 1px solid v-bind("cardColor");
  font-size: 38px;
}
.detail th:nth-child(2) {
  border-right: 1px solid v-bind("cardColor");
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
  border-bottom: 1px solid v-bind("cardColor");
  border-left: 1px solid v-bind("cardColor");
  border-right: 1px solid v-bind("cardColor");
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

.name td {
  border: none;
}

.footer {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  font-size: 12px;
  min-width: 337px;
}

.footer th {
  text-align: center;
  background-color: v-bind("cardColor");
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
  background-color: v-bind("cardColor");
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
  background-color: v-bind("cardColor");
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
</style>
