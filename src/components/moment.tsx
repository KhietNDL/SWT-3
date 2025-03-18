import moment from "moment";

export const formatDate = (dateString: string) => {
  return moment(dateString).format("HH:mm - DD/MM/YYYY");
};
