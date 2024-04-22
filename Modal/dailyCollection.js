const mongoose = require("mongoose");

const dailyCollectionSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
      required: true,
    },
    autoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auto",
      required: true,
    },
    dailyfare: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidDate: {
      type: Date,
      default: null,
    },
    generateDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const dailyCollectionModel = mongoose.model(
  "dailycollection",
  dailyCollectionSchema
);

module.exports = dailyCollectionModel;
