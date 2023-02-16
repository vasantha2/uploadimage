const express = require("express");
const app = express();
const imageRoutes = require("./routes/image");

const fs = require("fs");

fs.unlink(
  "/Users/Lenovo/UploadImage/upload/heartCoder!-puppy2-1676558802355.png",
  function (err) {
    if (err) {
      console.log("error occured:", err);
      return;
    }
    console.log("file deleted sucessfully");
  }
);

app.use(express.urlencoded({ extended: true }));
// initRoutes(app);
app.use(imageRoutes);

let port = 5000;
app.listen(port, () => {
  console.log(`Running at server on:${port}`);
});
