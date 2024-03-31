import cloudinary from "cloudinary";
import multer from "multer";

export const PORT = process.env.PORT || 8080;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  },
});
export const upload = multer({ storage });
