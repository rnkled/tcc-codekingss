import axios from "axios";

export default axios.create({
  baseURL: "https://management-microservice-production.up.railway.app",
  //baseURL: "http://192.168.100.25:5555",
  headers: {
    "Content-type": "application/json"
  }
});