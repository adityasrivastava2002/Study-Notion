const User=require("../models/User");
const Profile=require("../models/Profile");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

// send otp
exports.sendOTP=async(req,res)=>{
    try {
        //fetch email
        const {email}=req.body;

        // check if already exists
        const checkUserPresent=await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already exists"
            })
        }

        //generate otp
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        // check unique otp or not
        const result=await OTP.findOne({otp:otp});
        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result=await OTP.findOne({otp:otp});
        }
        //create an entry for otp
        const otpPayload={email,otp};
        const otpBody=await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// signup
exports.signUp=async(req,res)=>{
    try {
        // data fetch
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        }=req.body;

        // validate krlo
        if(!firstName || !lastName || !email || !password ||  !confirmPassword ||
            !otp){
                return res.status(403).json({
                    success:false,
                    message:"All fields are not filled",
                })
            }
        //2 password matching
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password does not match",
            })
        }

        //check existing user
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is alreday registered",
            });
        }

        // find most recent otp
        const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        // validate otp
        if(recentOtp.length==0){
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            })
        } else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            })
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        // create the user
        let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        //entry created in db

        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user=await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        //return res
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again later"
        })
    }
}

//login
exports.logIn=async(req,res)=>{
    try {
        // get data from req body
        const {email,password}=req.body;
        //validatiion data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields not filled",
            })
        }
        //user check exist or not
        const user=await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            })
        }
        //generate JWT. after password matching
        if(bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            });
            user.token=token;
            user.password=undefined;
            //create cookies and send res
            const options={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Fialure, please try again",
        })
    }
}

// change password
exports.changePassword=async(req,res)=>{
    try {
        const userDetails=await User.findById(req.user.id);
        // get data from req body
        const {oldPassword,newPassword,confirmPassword}=req.body;
        // get validation
        const isPasswordMatch=await bcrypt.compare(oldPassword,userDetails.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            });
        }

        if(newPassword!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password does not match",
            });
        }
        // update pw in DB
        const encryptedPassword=await bcrypt.hash(newPassword,10);
        const updatedUserDetails=await User.findByIdAndUpdate(userDetails.id,
                                        {password:encryptedPassword},
                                        {new:true});
        console.log("Password updated");
        // send mail
        try {
            const emailResponse=await mailSender(
                                userDetails.email,
                                `Password updated succesfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
            console.log(emailResponse);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error ouccured in sending mail",
                error:error.message,
            });
        } 
        // return response
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot change password",
            error:error.message,
        });
    }
}