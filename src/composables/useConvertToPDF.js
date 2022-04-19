import { ref } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const useConvertToPDF = () => {
  let loaderToPDF = ref(false);

  // Convert to PDF whith jsPDF and html2canvas
  const downloadPDF = async (id) => {
    loaderToPDF.value = true;
    const target = await document.getElementById(`target-${id}`);
    const pdf = new jsPDF("l", "mm", "legal");
    const options = {
      background: "#fff",
      scale: 0.9,
      width: target.clientWidth,
      height: target.clientHeight,
    };
    html2canvas(target, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("empleado.pdf");
      loaderToPDF.value = false;
    });
  };

  return {
    loaderToPDF,
    downloadPDF,
  };
};

export default useConvertToPDF;
