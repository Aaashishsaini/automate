const DriverController = require("../Controller/driverController");
const express = require("express");
const router = express.Router();

// create driver
router.post(
  "/create-driver/:autoId",

  DriverController.createDriverController
);

// get driver
router.get(
  "/get-driver",

  DriverController.getDriverController
);

// get from phone
router.post("/singledriver", DriverController.singleDriverController);

// update from
router.put(
  "/updateDriverAllValue/:driverId",
  DriverController.updateDriverAllValue
);

module.exports = router;
