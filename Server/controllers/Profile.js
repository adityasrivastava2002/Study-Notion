const Course = require("../models/Course");
const Profile=require("../models/Profile");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile=async(req,res)=>{
    try {
        // get data
        const {dateOfBirth="", about="", contactNumber, gender}=req.body;
        // get userid
        const id=req.user.id;
        // validation
        
        // find profile
        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);

        // update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        await profileDetails.save();
        // return res
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails,
            userDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create profile",
        });
    }
}

// delete profile
exports.deleteAccount=async(req,res)=>{
    try {
        // fetch
        const id=req.user.id;
        // validation
        const userDetails=await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not found",
            });
        }
        // delete prfile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // HW to unenroll user from all courses
        userDetails.courses.forEach(async (courseId)=>{
            await Course.findByIdAndUpdate(courseId,
                    {
                        $pull:{studentEnrolled:id},
                    })
        })
        // deleteuser
        await User.findByIdAndDelete({_id:id});

        // return res
        return res.status(200).json({
            success:true,
            message:"Prilfe deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete profile",
            error:error.message,
        });
    }
}

// get all profile
exports.getAllUserDetails=async(req,res)=>{
    try {
        // get id
        const id=req.user.id;
        // validation
        const userDetails=await User.findById(id).populate("additionalDetails").exec();
        // return res
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to get all profiles",
        });
    }
}

exports.updateDisplayPicture=async(req,res)=>{
    try {
        const displayPicture=req.files.displayPicture;
        const userID=req.user.id;
        const image=await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000);
        console.log(image);
        const updatedProfile=await User.findByIdAndUpdate(userID,
                                {image:image.secure_url},
                                {new:true});
        res.send({
            success:true,
            message:"Image updated successfully",
            data:updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update dp",
            error:error.message,
        });
    }
}

exports.getEnrolledCourses=async(req,res)=>{
    try {
        const userId=req.user.id;
        const userDetails=await User.findOne({_id:userId})
                            .populate("courses").exec();
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find user",
            });
        }
        return res.status(200).json({
            success:true,
            data:userDetails.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to get all courses",
        });
    }
}