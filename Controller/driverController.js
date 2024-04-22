const driverModel = require("../Modal/driverModal");
const autoModel = require("../Modal/autoModal");
const dailyCollectionModel = require("../Modal/dailyCollection");

// create driver

exports.createDriverController = async (req, res) => {
  console.log("hello");

  try {
    const { name, mobileNumber, address, dailyFare, driverid } = req.body;
    const autoId = req.params.autoId;
    console.log("hl2");
    console.log(driverid);

    // if (!name || !mobileNumber || !address) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "All fields (name, mobileNumber, address) are required",
    //   });
    // }
    console.log(driverid, "2");
    if (driverid) {
      await driverModel.findByIdAndUpdate(
        { _id: driverid },
        {
          $set: {
            name: name,
            mobileNumber: mobileNumber,
            dailyFare: dailyFare,
            address: address,
            autoId: autoId,
          },
        },
        { new: true }
      );

      await autoModel.findByIdAndUpdate(
        { _id: autoId },
        { $set: { driver: driverid, dailyFare: dailyFare, isAssigned: 1 } },
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Driver updated and assigned successfully",
      });
    } else {
      const driver = await new driverModel({
        name,
        mobileNumber,
        address,
        dailyFare,
        autoId,
      }).save();

      if (!driver) {
        return res.status(400).send({
          success: false,
          message: "Failed to create driver",
        });
      }

      await autoModel.findByIdAndUpdate(
        { _id: autoId },
        { $set: { driver: driver._id, dailyFare: dailyFare, isAssigned: 1 } },
        { new: true }
      );

      res.status(200).send({
        success: true,
        message: "Driver created and assigned successfully",
        driver,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Failed to create and assign driver",
    });
  }
};

// get driver

exports.getDriverController = async (req, res) => {
  try {
    const driver = await driverModel.find();
    res.status(200).send({
      success: true,
      message: "pending getting driving detail",
      driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "pending driving detail get",
    });
  }
};

// single driver getting from mobile number

exports.singleDriverController = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const driver = await driverModel.findOne({ mobileNumber });
    if (!driver) {
      return res.status(404).send({
        success: false,
        message: "driver not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single driver successfully retrieved",
      driver,
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
// update driver list
exports.updateDriverAllValue = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { name, address, mobileNumber, autoId, dailyFare } = req.body;
    const driver = await driverModel.findByIdAndUpdate(
      { _id: driverId },
      {
        $set: {
          autoId,
          name,
          address,
          mobileNumber,
          dailyFare,
        },
      },
      { new: true }
    );
    await autoModel.findByIdAndUpdate(
      { _id: autoId },
      { $set: { driver: driverId, isAssigned: 1 } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Driver details updated successfully",
      driver,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to update driver details",
    });
  }
};

// exports.updateDriverAllValue = async (req, res) => {
//   try {
//     const { autoId } = req.params;
//     const { mobileNumber } = req.body;
//     const { name, address, dailyFare } = req.body;

//     // Find the driver by mobile number
//     const driver = await driverModel.findOne({ mobileNumber });

//     if (!driver) {
//       return res.status(404).send({
//         success: false,
//         message: "Driver not found",
//       });
//     }

//     // Update driver details
//     const updatedDriver = await driverModel.findByIdAndUpdate(
//       { _id: driver._id },
//       {
//         $set: {
//           autoId,
//           name,
//           address,
//           dailyFare,
//           mobileNumber,
//         },
//       },
//       { new: true }
//     );

//     // Update auto details
//     await autoModel.findByIdAndUpdate(
//       { _id: autoId },
//       { $set: { driver: updatedDriver._id, isAssigned: 1 } },
//       { new: true }
//     );

//     res.status(200).send({
//       success: true,
//       message: "Driver details updated successfully",
//       driver: updatedDriver,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Failed to update driver details",
//     });
//   }
// };
