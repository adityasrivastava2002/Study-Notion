const Section=require("../models/Section");
const Course=require("../models/Course");
const SubSection = require("../models/SubSection")

exports.createSection=async(req,res)=>{
    try {
        // data fetch
        const {sectionName,courseId}=req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing properties",
            })
        }
        // create section
        const newSection=await Section.create({sectionName});
        // update course with section id
        const updatedCourseDetails=await Course.findByIdAndUpdate(
                                    courseId,
                                    {
                                        $push:{
                                            courseContent:newSection._id,
                                        }
                                    },
                                    {new:true},
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create a section",
            error:error.message,
        })
    }
}

exports.updateSection=async(req,res)=>{
    try {
        // data fetch
        const {sectionName,sectionId,courseId}=req.body;
        // validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success:false,
                message:"Missing properties",
            })
        }
        // update data
        const section=await Section.findByIdAndUpdate({_id:sectionId},{sectionName:sectionName},{new:true});
        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();
        // return res
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:course,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update a section",
            error:error.message,
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try {
        const {courseId,sectionId}=req.body;
        const section = await Section.findById(sectionId);
        // HW to update in course
        await Course.findByIdAndUpdate(courseId,
                        {
                            $pull:{courseContent:sectionId,}
                        },
                        );
        if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully",
            data:course,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete section",
        })
    }
}