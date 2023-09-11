const express=require("express");
const router=express.Router();

const {
    logIn,
    signUp,
    sendOTP,
    changePassword,
}=require("../controllers/Auth");

const {
    resetPassword,
    resetPasswordToken
}=require("../controllers/ResetPassword");

const {auth}=require("../middlewares/auth");

router.post("/login",logIn);
router.post("/signup",signUp);
router.post("/sendotp",sendOTP);
router.post("/changepassword",changePassword);

router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",resetPassword);

module.exports=router;