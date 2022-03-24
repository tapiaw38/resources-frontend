<template>
  <div>
    <div id="img-work">
      <div id="target-work">
        <div id="text-target">
          <img
            src="../assets/img/municipio.png"
            alt="logo"
            width="300"
            height="auto"
            class="m-0"
          />
          <p class="h1">RRHH</p>
          <p>Direccion de Recursos Humanos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  components: {},
  setup() {
    const getImage = () => {
      console.log("getImage");
      let img = new Image();
      img.onload = () => {
        document.getElementById("img-work").style.backgroundImage =
          "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(work.jpg)";
      };
      img.src = "work.jpg";
    };

    onMounted(() => {
      getImage();
    });
  },
};
</script>

<style lang="scss" scoped>
#img-work {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: rgb(129, 133, 133);
  height: 100vh;
  overflow-y: hidden;
  position: absolute;
  width: 100%;
}
#target-work {
  border-radius: 10px;
  width: 100%;
  height: 300px;
  color: rgb(255, 255, 255);
}
#text-target {
  margin-top: 1%;
  font-size: 50px;
  height: 100%;
  text-align: center;
  font-weight: normal;
  font-weight: bold;

  p {
    font-size: 2.2rem;
    font-weight: bold;
  }
}
label {
  display: block;
  margin-bottom: 4px;
}
.login-heading {
  margin-bottom: 16px;
}
.form-controls {
  margin-bottom: 24px;
}
.mb-more {
  margin-bottom: 42px;
}
.login-form {
  max-width: 500px;
  margin: auto;
  padding-top: 30px;
}
.login-input {
  width: 100%;
  font-size: 16px;
  padding: 12px 16px;
  outline: 0;
  border-radius: 3px;
  border: 1px solid lightgrey;
}
.btn-submit {
  width: 100%;
  padding: 14px 12px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}
</style>
