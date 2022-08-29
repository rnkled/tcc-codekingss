import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.0.108:5555",
  headers: {
    "Content-type": "application/json"
  }
});