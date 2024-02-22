import "dotenv/config";

const nodeEnv = process.env.NODE_ENV;

const mongodbProdConnectionstring = process.env.MONGODB_CONNECTION_STRING;

const mongodbDevConnectionstring = process.env.MONGODB_DEV_CONNECTION_STRING;

// Errorhandling

if (!nodeEnv) {
  console.error("NODE_ENV not set. Aborting");
  process.exit();
}

if (nodeEnv === "production" && !mongodbProdConnectionstring) {
  console.error(
    "NODE_ENV set to production, but MONGODB_CONNECTION_STRING is not set. Aborting.",
  );
  process.exit();
}

if (nodeEnv !== "production" && !mongodbDevConnectionstring) {
  console.error(
    "NODE_ENV set to development/test, but MONGODB_DEV_CONNECTION_STRING is not set. Aborting.",
  );
  process.exit();
}

// Decide db connectionstring based on node env

const dbConnectionstring =
  nodeEnv === "production"
    ? mongodbProdConnectionstring
    : mongodbDevConnectionstring;

const environment = {
  nodeEnv,
  dbConnectionstring,
};

export default environment;
