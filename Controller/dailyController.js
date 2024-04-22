const dailyCollectionModel = require("../Modal/dailyCollection");
const autoModel = require("../Modal/autoModal");

exports.createDailyCollectionController = async (req, res) => {
  try {
    const { generateDate } = req.body;

    // Find autos with assigned drivers
    const autos = await autoModel.find({ driver: { $ne: null } });

    // console.log("autos", autos);

    // no assigned auto found
    if (!autos || autos.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No autos found with assigned drivers",
      });
    }

    const autosWithoutEntries = [];

    // Check existing entries for each auto
    for (const auto of autos) {
      const existingEntry = await dailyCollectionModel.findOne({
        autoId: auto._id,
        generateDate,
      });

      // If no existing entry found, push auto into autosWithoutEntries array
      if (!existingEntry) {
        autosWithoutEntries.push(auto);
      }
    }

    // console.log("autosWithoutEntries", autosWithoutEntries);

    // Create and save daily collections for autos without existing entries
    const dailyCollections = [];
    for (const auto of autosWithoutEntries) {
      const dailyCollection = await new dailyCollectionModel({
        autoId: auto._id,
        dailyfare: auto.dailyFare,
        driverId: auto.driver,
        generateDate: generateDate,
      }).save();
      dailyCollections.push(dailyCollection);
    }

    res.status(200).send({
      success: true,
      message: "Daily collections created successfully",
      dailyCollections,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Failed to create daily collections",
    });
  }
};
// exports.createDailyCollectionController = async (req, res) => {
//   try {
//     const { generateDate } = req.body;
//     // Find autos with assigned drivers

//     const autos = await autoModel.find({ driver: { $ne: null } });

//     // no assigned auto found
//     if (!autos || autos.length === 0) {
//       return res.status(404).send({
//         success: false,
//         message: "No autos found with assigned drivers",
//       });
//     }
//     const existingUser = await userSchema.findOne({ email });
//     if (generateDate) {
//       return res.status(409).send({
//         success: false,
//         message: "User already exists. Please login instead.",
//       });
//     }

//     // Create and save daily collections for each auto
//     const dailyCollections = [];
//     autos.map(async (auto) => {
//       // Save daily collection for each auto
//       const dailyCollection = await new dailyCollectionModel({
//         autoId: auto._id,
//         dailyfare: auto.dailyFare,
//         driverId: auto.driver,
//         generateDate: generateDate,
//       }).save();
//       dailyCollections.push(dailyCollection);
//     });

//     res.status(200).send({
//       success: true,
//       message: "Daily collections created successfully",
//       dailyCollections,
//     });
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Failed to create daily collections",
//     });
//   }
// };

// get function
exports.getDailyCollectionController = async (req, res) => {
  try {
    const dailyCollection = await dailyCollectionModel
      .find({
        isPaid: false,
        paidDate: null,
      })
      .sort({ generateDate: 1 })
      .populate("driverId", ["name", "mobileNumber"])
      .populate("autoId", "registrationNumber");

    res.status(200).send({
      success: true,
      message: "Getting All Daily Collections",
      dailyCollection,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Failed to get daily collections",
    });
  }
};

// get true status funtion

exports.getTrueDailyCollectionController = async (req, res) => {
  try {
    const dailyCollection = await dailyCollectionModel
      .find({
        paidDate: { $ne: null },
        isPaid: true,
      })
      .populate("driverId", "name")
      .populate("autoId", "registrationNumber")
      .sort({ paidDate: -1 });
    res.status(200).send({
      success: true,
      dailyCollection, // Include the retrieved data in the response
      message: "Data for isPaid retrieved successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message, // Send the error message for better understanding
      message: "Failed to retrieve data for true status",
    });
  }
};

// update funtion
exports.updateGenerateDateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { generateDate } = req.body;
    await dailyCollectionModel.findByIdAndUpdate(id, {
      generateDate,
    });
    res.status(200).send({
      success: true,
      message: "Generate date updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to update generate date",
    });
  }
};

// update isPaid true and paid date == update date

exports.isPaidUpdateController = async (req, res) => {
  try {
    const { id } = req.params;

    // Set the paidDate to the current date and time
    const updatedAt = new Date();

    await dailyCollectionModel.findByIdAndUpdate(id, {
      isPaid: true,
      paidDate: updatedAt,
    });

    res.status(200).send({
      success: true,
      message: "isPaid status updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Failed to update isPaid status",
    });
  }
};
