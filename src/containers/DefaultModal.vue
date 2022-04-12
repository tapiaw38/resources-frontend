<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"></slot>
        <button type="button" class="btn-close" @click="$emit('close')">
          <h3>x</h3>
        </button>
      </header>

      <section class="modal-body">
        <slot name="body"> This is the default body! </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"> This is the default footer! </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  emits: ["close"],
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #ffffff;
  box-shadow: -1px 1px 23px -3px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: -1px 1px 23px -3px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: -1px 1px 23px -3px rgba(0, 0, 0, 0.6);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
}
.modal-header,
.modal-footer {
  padding: 10px;
  display: flex;
}
.modal-header {
  position: relative;
  color: $primary;
  justify-content: space-between;
}
.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
}
.modal-body {
  position: relative;
  padding: 10px 10px;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 10px;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: $primary;
  background: transparent;
}
</style>
