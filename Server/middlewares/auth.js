const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");
// const Course = require("../models/Course");

// auth
exports.auth=async(req,res,next)=>{
    try {
        // extract token
        const token=req.body.token ||
                    req.header("Authorization").replace("Bearer ","") ||
                    req.cookies.token;

        // if tokenn is missing 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
        }

        //verify the token
        try {
            const decode=jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something wet wrong while validating the auth",
        })
    }
}

// isStudent
exports.isStudent=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating student",
        })
    }
}

// isInstructor
exports.isInstructor=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for instructors only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Somehting went wrong while validating instructor",
        })
    }
}

// isAdmin
exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admins only",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Somehting went wrong while validating admin",
        })
    }
}

// getAllCourses handler
// exports.showAllCourses=async(req,res)=>{
//     try {
//         const allCourses=await Course.find({});
//         return res.status(200).json({
//             success:true,
//             message:"All courses fetched successfully",
//             data:allCourses,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         })
//     }
// }