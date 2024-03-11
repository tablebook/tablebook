import "dotenv/config";

const nodeEnv = process.env.NODE_ENV;

const mongodbProdConnectionstring = process.env.MONGODB_CONNECTION_STRING;

const mongodbDevConnectionstring = process.env.MONGODB_DEV_CONNECTION_STRING;

const port = Number(process.env.PORT) || 8080; // If doesn't exist OR not a number, defaults as 8080

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

if (nodeEnv === "development" && !mongodbDevConnectionstring) {
  console.error(
    "NODE_ENV set to development, but MONGODB_DEV_CONNECTION_STRING is not set. Aborting.",
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
  port,
};

export default environment;
