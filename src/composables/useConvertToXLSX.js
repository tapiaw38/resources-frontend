const useConvertToXLSX = () => {
  let xlsx = require("json-as-xlsx");

  const exportToXlsx = async (data = [], settings = {}) => {
    xlsx(data, settings);
  };

  return {
    exportToXlsx,
  };
};

export default useConvertToXLSX;
