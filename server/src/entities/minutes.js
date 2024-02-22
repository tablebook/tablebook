import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema(
  {
    name: String,
    content: [String],
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

const minutesSchema = new mongoose.Schema({
  name: String,
  id: mongoose.Schema.Types.UUID,
  color: String,
  segments: [segmentSchema],
  startTime: Date,
  signatures: [signatrueSchema],
});

const Minutes = mongoose.model("Minutes", minutesSchema);

export default Minutes;
