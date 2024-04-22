const autoModel = require("../Modal/autoModal");
const driverModel = require("../Modal/driverModal");

exports.createAutoController = async (req, res) => {
  try {
    const { modelNumber, registrationNumber, dailyFare } = req.body;
    const auto = await new autoModel({
      modelNumber,
      registrationNumber,
      dailyFare,
    }).save();
    res.status(201).send({
      success: true,
      message: "auto created",
      auto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in auto creating",
    });
  }
};

// get auto   console.log(error);
exports.getAutoController = async (req, res) => {
  try {
    const auto = await autoModel.find({ driver: null });
    res.status(200).send({
      success: true,
      message: " Getting All Auto",
      auto,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "auto role driver getting failed",
    });
  }
};

// assign driver

exports.getDriverAssignAutoController = async (req, res) => {
  try {
    const autos = await autoModel.find({ driver: { $ne: null } });
    res.status(200).send({
      success: true,
      message: "Getting autos with assigned drivers",
      autos,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Failed to fetch autos with assigned drivers",
    });
  }
};

/// single auto get
exports.singleAutoController = async (req, res) => {
  try {
    const auto = await autoModel.findOne({
      _id: req.params._id,
    });
    if (!auto) {
      // Changed from !autoId to !auto
      return res.status(404).send({
        success: false,
        message: "Auto not found", // Changed message to be more accurate
      });
    }
    res.status(200).send({
      success: true,
      message: "Single auto successfully retrieved",
      auto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Failed to retrieve single auto",
    });
  }
};

// update driver and auto
exports.updateDriverAutoController = async (req, res) => {
  try {
    const { _id } = req.params;
    // Update auto's driver field to null
    await autoModel.findByIdAndUpdate(_id, { driver: null, isAssigned: 0 });

    // Update driver's autoId field to null
    // await driverModel.findByIdAndUpdate(autoId, { autoId: null });

    res.status(200).send({
      success: true,
      message: "Auto's driver removed and driver's autoId set to null",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to update auto's driver and driver's autoId",
    });
  }
};

// update auto
exports.updateAutoController = async (req, res) => {
  try {
    const { modelNumber, registrationNumber, dailyFare } = req.body;
    const { _id } = req.params;
    const auto = await autoModel.findByIdAndUpdate(
      _id,
      { modelNumber, registrationNumber, dailyFare },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "successfully update auto",
      auto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "auto updation failed",
    });
  }
};
