const express = require("express");
const router = express.Router();
const {
  loginValidation,
  signupValidation,
} = require("../../middlewares/userValidation");
const { tokenMiddelware } = require("../../middlewares/tokenMiddelware");
const { upload } = require("../../middlewares/filesUpload");
const {
  getCurentUser,
  userLogin,
  addNewUser,
  updateSubscription,
  logOutUser,
  updateAvatar,
} = require("../../controllers/users/users");

router.post("/signup", signupValidation, addNewUser);

router.post("/login", loginValidation, userLogin);

router.get("/", tokenMiddelware, getCurentUser);

router.patch(
  "/avatars",
  tokenMiddelware,
  upload.single("image"),
  updateAvatar
);
// single("imege") - важно указать какая часть запроса должна быть обработана миделваром по ключу в котором фронтенд отправляет файлы

router.patch("/", tokenMiddelware, updateSubscription);

router.get("/logout", tokenMiddelware, logOutUser);

module.exports = router;

// https://localhost:8080/api/auth/signup
