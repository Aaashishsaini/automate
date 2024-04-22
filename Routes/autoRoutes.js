const AutoController = require("../Controller/autoController");
const express = require("express");
const router = express.Router();

// POST Auto

router.post("/create-auto", AutoController.createAutoController);

// Get Auto

router.get("/getauto", AutoController.getAutoController);

// single auto
router.get("/single-auto/:_id", AutoController.singleAutoController);

// driver assign auto
router.get("/driver-assign", AutoController.getDriverAssignAutoController);

// edit driver
router.put("/driver-unassign/:_id", AutoController.updateDriverAutoController);

// update auto
router.put("/update-auto/:_id", AutoController.updateAutoController);

module.exports = router;
