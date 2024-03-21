require("dotenv").config();
const { defineConfig } = require("cypress");

const baseUrl = process.env.CYPRESS_BASE_URL;

if (!baseUrl) {
  throw Error("CYPRESS_BASE_URL not set. Exiting...");
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl,
  },
});
