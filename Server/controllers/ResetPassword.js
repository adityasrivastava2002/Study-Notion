const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

// reset password token
exports.resetPasswordToken=async(req,res)=>{
    try {
        // get email from req body
        const email=req.body.email;

        // check user for this email and validation
        const user=await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:"Ypur email is not registered",
            })
        }
        // generate token
        const token=crypto.randomBytes(20).toString("hex");
        // update user by adding token and expiration time
        const updatedDetails=await User.findOneAndUpdate(
                                    {email:email},
                                    {
                                        token:token,
                                        resetPasswordExpires: Date.now() +3600000,
                                    },
                                    {new:true});
        // create url
        const url=`http://localhost:3000/update-password/${token}`;
        // send mail containing url
        await mailSender(email,"Password reset link",
        `Password reset link : ${url}`);

        // return response
        return res.json({
            success:true,
            message:"Email sent successfully",
            token:token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reseting password"
        })
    }
}

// reset password
exports.resetPassword=async(req,res)=>{
    try {
        // data fetch
        const {password,confirmPassword,token}=req.body;
        // data validation
        if(password!==confirmPassword){
            return res.json({
                success:false,
                message:"Password does not match",
            })
        }
        // get user details from db using token
        const userDetails=await User.findOne({token:token});
        // if no entry-invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid"
            })
        }
        // if token expired
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token has expired, please regenerate your token",
            })
        }
        // hash password
        const hashedPassword=await bcrypt.hash(password,10);
        // update in db
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        // return res
        return res.status(200).json({
            success:true,
            message:"Password reset successfull",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while resetting the password",
        })
        
    }
}