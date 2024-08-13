import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:7000",
    headers: {
        "Content-type": "application/json"
    }
});