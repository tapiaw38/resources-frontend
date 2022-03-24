import { ref } from "vue";

const useModal = () => {
  let isModalVisible = ref(false);

  const showModal = () => {
    isModalVisible.value = true;
  };

  const closeModal = () => {
    isModalVisible.value = false;
  };

  return {
    isModalVisible,
    showModal,
    closeModal,
  };
};

export default useModal;
