<template>
  <div class="topnav">
    <router-link class="active" :to="{ name: 'home' }">Inicio</router-link>
    <router-link :to="{ name: 'employees' }">Empleados</router-link>
    <router-link :to="{ name: 'trainees' }">Becados</router-link>
    <router-link :to="{ name: 'workplaces' }">Areas</router-link>
    <router-link :to="{ name: 'targets' }">Imprimir tarjetas</router-link>
    <div class="user-content">
      <button class="login">Iniciar Sesion</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}

.user-content {
  float: right;

  button {
    background-color: #04aa6d;
    color: white;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: white;
      color: #04aa6d;
      transition: 0.5s ease-in-out;
    }
  }
}
</style>
