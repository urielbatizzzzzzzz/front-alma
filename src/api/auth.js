import config from "../api/axios.js";

const registerRequest = (nombre) => config.post("/register", nombre);
const showsRequest = () => config.get("/");
const updateRequest = (id,data) => config.put(`/update/${id}`, data);
const deletedRequest = (id) => config.delete(`/deleted/${id}`);
const showOneRequest = (id) => config.get(`/${id}`);
export {
  registerRequest,
  showsRequest,
  updateRequest,
  deletedRequest,
  showOneRequest,
};
