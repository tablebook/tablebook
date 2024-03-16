/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
  },
  { _id: false },
);

const signatrueSchema = new mongoose.Schema(
  {
    signer: String,
    timestamp: Date,
    image: String,
  },
  { _id: false },
);

const minutesSchema = new mongoose.Schema(
  {
    name: String,
    color: String,
    segments: [segmentSchema],
    startTime: Date,
    signatures: [signatrueSchema],
  },
  { versionKey: false },
);

// This removes the default _id object and replaces it with id in string format
minutesSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

const Minutes = mongoose.model("Minutes", minutesSchema);

export default Minutes;
