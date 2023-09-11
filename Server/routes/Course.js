const express=require("express");
const router=express.Router();

const {
    showAllcategory,
    createCategory,
    categoryPageDetails,
}=require("../controllers/Category");

const {
    createCourse,
    getAllCourse,
    getCourseDetails
}=require("../controllers/Course");

const {
    getAllRating,
    getAverageRating,
    createRating
}=require("../controllers/RatingAndReview");

const {
    createSection,
    updateSection,
    deleteSection
}=require("../controllers/Section");

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
}=require("../controllers/Subsection");

const {auth, isAdmin, isInstructor, isStudent}=require("../middlewares/auth");

// course routes
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection",auth, isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor, deleteSection);
router.post("/updateSubSection",auth, isInstructor, updateSubSection);
router.post("/deleteSubSection",auth, isInstructor, deleteSubSection);
router.post("/addSubSection",auth,isInstructor,createSubSection);
router.get("/getAllCourses",getAllCourse);
router.get("/getCourseDetails",getCourseDetails);

// category routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories",showAllcategory);
router.get("/getCategoryPageDetails",categoryPageDetails);

// rating and review routes
router.post("/createRating",auth, isStudent, createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRating);

module.exports=router;