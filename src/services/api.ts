import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.100.25:5555",
  headers: {
    "Content-type": "application/json"
  }
});