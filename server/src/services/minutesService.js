import Minutes from "../entities/minutes.js";

const getMinutesById = async (id) => {
  const minutes = await Minutes.findById(id);
  return minutes;
};

const createMinutes = async (minutesBody) => {
  const createdMinutes = await Minutes.create(minutesBody);
  return createdMinutes;
};

const deleteMinutesById = async (id) => {
  const deletedMinutes = await Minutes.findByIdAndDelete(id);
  return deletedMinutes;
};

const updateMinutes = async (id, minutesBody) => {
  const updatedMinutes = await Minutes.findByIdAndUpdate(id, minutesBody, {
    new: true, // This returns the minutes object after the update. Otherwise would return the old minutes object.
  });
  return updatedMinutes;
};

const minutesService = {
  getMinutesById,
  createMinutes,
  deleteMinutesById,
  updateMinutes,
};

export default minutesService;
