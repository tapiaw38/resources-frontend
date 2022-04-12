<template>
  <div class="topnav">
    <router-link class="active" :to="{ name: 'home' }">Inicio</router-link>
    <router-link :to="{ name: 'employees' }">Empleados</router-link>
    <router-link :to="{ name: 'trainees' }">Becados</router-link>
    <router-link :to="{ name: 'workplaces' }">Areas</router-link>
    <router-link :to="{ name: 'cards' }">Ver y editar tarjetas</router-link>
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
  color: $white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 14px;
}

.topnav a:hover {
  background-color: $white;
  color: $black;
}

.topnav a.active {
  background-color: $primary;
  color: $white;
}

.user-content {
  float: right;

  button {
    background-color: $primary;
    color: $white;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 14px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: $white;
      color: $primary;
      transition: 0.5s ease-in-out;
    }
  }
}
</style>
