import axios from "axios";

const baseUrl = "/api/healthz";

const healthCheck = async () => {
  await axios.get(baseUrl);
};

export default healthCheck;
