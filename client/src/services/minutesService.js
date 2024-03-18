import axios from "axios";
import {
  deleteMinutesResponseSchema,
  getMinutesResponseSchema,
  postMinutesResponseSchema,
  putMinutesResponseSchema,
} from "../schemas/responseSchemas";

const baseUrl = "/api/minutes";

const getMinutesByToken = async (token) => {
  const response = await axios.get(`${baseUrl}/${token}`);

  const parsedResponseData = getMinutesResponseSchema.parse(response.data);

  return parsedResponseData;
};

const createMinutes = async (minutes) => {
  const response = await axios.post(baseUrl, minutes);

  const parsedResponseData = postMinutesResponseSchema.parse(response.data);

  return parsedResponseData;
};

const updateMinutesByToken = async (token, minutes) => {
  const response = await axios.put(`${baseUrl}/${token}`, minutes);

  const parsedResponseData = putMinutesResponseSchema.parse(response.data);

  return parsedResponseData;
};

const deleteMinutesByToken = async (token) => {
  const response = await axios.delete(`${baseUrl}/${token}`);

  const parsedResponseData = deleteMinutesResponseSchema.parse(response.data);

  return parsedResponseData;
};

const minutesService = {
  getMinutesByToken,
  createMinutes,
  updateMinutesByToken,
  deleteMinutesByToken,
};

export default minutesService;
