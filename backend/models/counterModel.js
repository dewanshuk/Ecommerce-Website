const mongoose = require("mongoose");

// Define a counter schema to keep track of the sequence
const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

// Create a Counter model based on the CounterSchema
export const Counter = mongoose.model("Counter", CounterSchema);

// Middleware function to increment the ID field before saving
