const DailyCollectionController = require("../Controller/dailyController");
const express = require("express");
const router = express.Router();

// post daily collection
router.post(
  "/createDaily",
  DailyCollectionController.createDailyCollectionController
);
// get collection
router.get(
  "/dailyCollection",

  DailyCollectionController.getDailyCollectionController
);
// update collection
router.put(
  "/updateCollection/:id",

  DailyCollectionController.updateGenerateDateController
);
// isPaid update
router.put(
  "/isPaidUpdate/:id",

  DailyCollectionController.isPaidUpdateController
);

// get true value collection
router.get(
  "/isPaidTrue",
  DailyCollectionController.getTrueDailyCollectionController
);

module.exports = router;
