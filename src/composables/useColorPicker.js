import { ref } from "vue";

const useColorPicker = () => {
  let color = ref("#59c7f9");
  let suckerCanvas = ref(null);
  let suckerArea = ref([]);
  let isSucking = ref(false);
  let showPicker = ref(false);

  const changeColor = (c) => {
    const { r, g, b, a } = c.rgba;
    color.value = `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const openSucker = (isOpen) => {
    if (isOpen) {
      // ... canvas be created
      // this.suckerCanvas = canvas
      // this.suckerArea = [x1, y1, x2, y2]
    } else {
      // this.suckerCanvas && this.suckerCanvas.remove
    }
  };

  const togglePicker = () => {
    showPicker.value = !showPicker.value;
  };

  return {
    color,
    suckerCanvas,
    suckerArea,
    isSucking,
    showPicker,
    changeColor,
    openSucker,
    togglePicker,
  };
};

export default useColorPicker;
