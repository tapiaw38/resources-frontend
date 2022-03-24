import axios from "axios";

const coeadminApi = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  //baseURL: "https://resources-api-heroku.herokuapp.com/api/v1/",
});

/*
coeadminApi.interceptors.request.use((config) => {
  config.headers = {
    authorization: `Token ${localStorage.getItem("access_token")}`,
  };

  return config;
});
*/

export default coeadminApi;
