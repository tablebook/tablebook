import mongoose from "mongoose";
import environment from "./utils/environment.js";

const main = async () => {
  mongoose.connect(environment.dbConnectionstring);
};

main().catch((error) => console.error(error));
