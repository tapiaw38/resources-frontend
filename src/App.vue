<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "./partials/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "../node_modules/vue-color-kit/dist/vue-color-kit.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
