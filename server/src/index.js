import mongoose from "mongoose";
import environment from "./utils/environment.js";

const main = async () => {
  await mongoose.connect(environment.dbConnectionstring);
};

main().catch((error) => console.error(error));
