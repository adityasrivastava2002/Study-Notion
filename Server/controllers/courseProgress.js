const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress =async(req, res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try {
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection) {
            return res.status(404).json({error:"Invalid subsection"});
        }

        let courseProgress = await CourseProgress.findOne({
            courseId:courseId,
            userId: userId,
        });
        if(!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course Progress does not exists",
            });
        } else {
            if(courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    error:"SubSection already completed",
                });
            }

            courseProgress.completedVideos.push(subSectionId);
            await courseProgress.save();
            return res.status(200).json({
                success:true,
                message:"Course Progress Updated Successfully",
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error:"Could not update course progress"
        })
    }
}