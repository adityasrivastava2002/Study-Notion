const Course=require("../models/Course");
const User=require("../models/User");
const Category=require("../models/Category");
const Section=require("../models/Section")
const SubSection=require("../models/SubSection")
const {uploadImageToCloudinary}=require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration")

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

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(JSON.stringify(updates[key]))
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
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

exports.getFullCourseDetails = async (req, res) => {
    try {
        const courseId = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne(courseId)
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        })
        .exec()

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        console.log("courseProgressCount : ", courseProgressCount)

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:"Could not find course"
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
        })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
        success: true,
        data: {
            courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
  
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 })
  
      // Return the instructor's courses
      res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }

exports.deleteCourse = async(req, res) => {
    try {
        const {courseId} = req.body

        // find the course
        const course = await Course.findById(courseId)
        if(!course) {
            return res.status(404).json({
                message: "Course Not Found"
            })
        }

        // Unroll students from course
        const studentsEnrolled = course.studentEnrolled
        for(const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId,{
                $pull: {courses: courseId},
            })
        }

        // delete sections and subsection
        const courseSections = course.courseContent
        for(const sectionId of courseSections) {
            // delete subsection
            const section = await Section.findById(sectionId)
            if(section) {
                const subSections = section.subSection
                for(const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            // delete section
            await Section.findByIdAndDelete(sectionId)
        }
        // delete course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success:true,
            message:"Course Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message,
        })
    }
}