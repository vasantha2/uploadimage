const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images !", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array("images", 10);

exports.uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload !");
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};

exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file) => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `heartCoder!-${filename}-${Date.now()}.png`;

      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("png")
        .jpeg({ quality: 90 })
        .toFile(`upload/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};

exports.getResultImages = async (req, res) => {
  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image !`);
  }

  const images = req.body.images.map((image) => "" + image + "").join(", ");

  return res.send(`Images were uploaded: ${images}`);
};
