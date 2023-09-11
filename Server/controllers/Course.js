const Course=require("../models/Course");
const User=require("../models/User");
const Category=require("../models/Category");
const {uploadImageToCloudinary}=require("../utils/imageUploader");

// create course handler
exports.createCourse=async(req,res)=>{
    try {
        //fetch data
        const userId=req.user.id;
        let {courseName,courseDescription,whatYouWillLearn,price,tag,category,status,instructions}=req.body;
        const thumbnail=req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category ||!thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        if(!status || status===undefined){
            status="Draft";
        }

        // check for instructor
        const instructorDetails=await User.findById(userId,{accountType:"Instructor"});
        console.log("Instructor Details",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor does not exists",
            })
        }

        // check for category
        const categoryDetails=await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category Details does not exist",
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tag,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status:status,
            instructions:instructions,
        })

        // add new course to user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                },
            },
            {new:true},
        );

        // update category shema
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $push:{
                    course:newCourse._id,
                },
            },
            {new:true}
        )
        // return res
        return res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:newCourse,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.getAllCourse=async(req,res)=>{
    try {
        const response=await Course.find({},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            data:response,
            message:"Successfully fetched all courses",
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            error:error.message,
            message:"Cannot fetch courses",
        })
    }
}

exports.getCourseDetails=async(req,res)=>{
    try {
        // get id
        const {courseId}=req.body;
        // find course
        const courseDetails=await Course.find({_id:courseId})
                            .populate(
                                {
                                    path:"instructor",
                                    populate:
                                        {
                                            path:"additionalDetails",
                                        },
                                }
                            )
                            .populate("category")
                            .populate("ratingAndReview")
                            .populate({
                                path:"courseContent",
                                populate:{
                                    path:"subSection",
                                },
                            })
                            .exec();
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Course not found ${courseId}`,
            });
        }
        return res.status(200).json({
            success:true,
            data:courseDetails,
            message:"Successfully fetched",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot fetch the course",
        })
    }
}