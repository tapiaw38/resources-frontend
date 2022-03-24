import moment from "moment";

export const formatDate = (date) => {
  if (date == null) {
    return "";
  }
  return moment(date).format("DD/MM/YYYY");
};

export const formatDateDatabase = (date) => {
  if (date == null) {
    return "";
  }
  return moment(date).format("YYYY-MM-DD");
};
