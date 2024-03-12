// const Subsection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadImageToCloudinary}=require("../utils/imageUploader");
const SubSection = require("../models/SubSection");

// create subsection
exports.createSubSection=async(req,res)=>{
    try {
        // fetch data
        const {sectionId,title,description}=req.body;
        const video=req.files.video;
        // validation
        if(!sectionId || !title || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        // upload video to cloduinary
        const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        // create subsection
        const subsectionDetails=await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });
        // update section with this subsection objectid
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
                            {$push:{
                                subSection:subsectionDetails._id
                            }},
                            {new:true})
                            .populate("subSection")
        return res.status(200).json({
            success:true,
            message:"subsection created successfully",
            data:updatedSection,
            subsectionDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create subsection",
            error:error.message,
        });
    }
}

// update subsection
exports.updateSubSection=async(req,res)=>{
    try {
        const {sectionId,subSectionId,title,description}=req.body;
        const subSection=await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Unable to get subsection",
                error:error.message,
            });
        }
        if(title!==undefined){
            subSection.title=title
        }
        if(description!==undefined){
            subSection.description=description
        }
        if(req.files && req.files.video!==undefined){
            const video=req.files.video;
            const uploadDetails=await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME,
            )
            subSection.videoUrl=uploadDetails.secure_url,
            subSection.timeDuration=`${uploadDetails.duration}`
        }
        subSection.save()

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success:true,
            data:updatedSection,
            message:"Updated subsection",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update subsection",
            error:error.message,
        });
    }
}

// delete subsection
exports.deleteSubSection=async(req,res)=>{
    try {
        const {subSectionId, sectionId}=req.body;
        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull:{subSection:subSectionId}
            },
            {new:true}
        );
        const subSection=await SubSection.findByIdAndDelete({_id:subSectionId});
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Unable to delete subsection",
                error:error.message,
            });
        }
        const updatedSection = await Section.findById(sectionId).populate("subSection");
        return res.status(200).json({
            success:true,
            message:"deleted subsection",
            data:updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete subsection",
            error:error.message,
        });
    }
}