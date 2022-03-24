<template>
  <div class="login-form">
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" v-model="userForm.email" />
    </div>

    <div class="form-control">
      <label for="password">Password</label>
      <input type="password" v-model="userForm.password" />
    </div>

    <button class="btn-login" @click="login">Ingresar</button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
//import useAuth from "../../authentication/composables/useAuth";
export default defineComponent({
  setup() {
    //const { handleLogin } = useAuth();
    const userForm = ref({
      email: "",
      password: "",
    });
    const login = () => {
      //handleLogin(userForm.value);
    };
    return {
      userForm,
      login,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 350px;
  height: 100%;
  button {
    width: 100%;
    height: 50px;
    border-radius: 25px;
    border: none;
    background-color: #04aa6d;
    color: white;
    font-size: 1.2em;
    font-weight: bold;
    border: 2px solid #04aa6d;
    cursor: pointer;
    &:hover {
      background-color: white;
      color: #04aa6d;
      transition: 0.3s;
    }
  }
}
.form-control {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1em;
  label {
    font-size: 1.2em;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: 1em;
  }
}
</style>
