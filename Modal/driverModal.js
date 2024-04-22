const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    autoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auto", // Reference to the autoModel collection
      required: true,
    },

    dailyFare: {
      type: String,
      required: true,
    },
    driverid: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

const driverModel = mongoose.model("driver", driverSchema);

module.exports = driverModel;
