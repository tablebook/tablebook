import mongoose from "mongoose";
import environment from "./utils/environment.js";
import "./utils/openapi.js"; // Needs to be imported before any schemas are used
import app from "./app.js";

const main = async () => {
  await mongoose.connect(environment.dbConnectionstring);

  app.listen(environment.port, () => {
    console.log(`express server listeing for port ${environment.port}`);
  });
};

main().catch((error) => console.error(error));
