const mongoose = require("mongoose");

const autoSchema = new mongoose.Schema(
  {
    modelNumber: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dailyFare: {
      type: String,
      required: true,
    },
    isAssigned: {
      type: Number,
      default: 0,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
      default: null,
    },
  },
  { timestamps: true }
);

const autoModel = mongoose.model("auto", autoSchema);

module.exports = autoModel;
