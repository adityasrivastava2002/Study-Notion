const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const { default: mongoose } = require("mongoose");

// create Rating
exports.createRating=async(req,res)=>{
    try {
        // get user id
        const userId=req.user.id;
        // fetchdata
        const {rating,review,courseId}=req.body;
        // chek if user enrolled or not
        const courseDetails=await Course.findOne(
                            {_id:courseId,
                            studentEnrolled:{$elemMatch: {$eq: userId}},
                        });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student not enrolled in course"
            });
        }
        // check user already reviewed
        const alreadyReviewed=await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        })
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"the Course is already reviewed by our dear user"
            });
        }
        // db entry
        const ratingReview=await RatingAndReview.create({
            user:userId,
            rating:rating,
            review:review,
            course:courseId,
        })
        // update course
        const updatedCourse=await Course.findByIdAndUpdate(courseId,
                        {
                            $push:{
                                ratingAndReview: ratingReview._id,
                            },
                        },
                        {new:true});
        console.log(updatedCourse);
        // return res
        return res.status(200).json({
            success:true,
            message:"RatingAndReview Created successfully",
            ratingReview
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot create rating"
        });
    }
}

// getAverage rating
exports.getAverageRating=async(req,res)=>{
    try {
        // get courseId
        const courseId=req.body.courseId;
        // calc avg rating
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        // return res
        if(result.length>0){
            return res.status(200).json({
                success:true,
                message:"Fetched average rating successfully",
                averageRating:result[0].averageRating,
            });
        }
        // if no rating
        return res.status(200).json({
            success:true,
            message:"no rating exists",
            averageRating:0,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot get average rating",
            error:error.message,
        });
    }
}

// get all ratings
exports.getAllRating=async(req,res)=>{
    try {
        const allReviews=await RatingAndReview.find({})
                            .sort({rating:"desc"})
                            .populate({
                                path:"user",
                                select:"firstName lastName email image",
                            })
                            .populate({
                                path:"course",
                                select:"courseName",
                            })
                            .exec();
        return res.status(200).json({
            success:true,
            message:"Fetched all rating successfully",
            data:allReviews,
        })
    } catch (error) {
        return res.status(200).json({
            success:true,
            message:"Cannot fetch all ratings",
        })
    }
}