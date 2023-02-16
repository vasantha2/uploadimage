const express = require("express");
const router = express.Router();

const { homePage } = require("../controller/homePage");

const {
  uploadImages,
  resizeImages,
  getResultImages,
} = require("../controller/imageUpload");

router.route("/").get(homePage);

router
  .route("/multiple-upload")
  .post(uploadImages, resizeImages, getResultImages);

module.exports = router;
