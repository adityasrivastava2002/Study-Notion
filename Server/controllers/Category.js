const Category=require("../models/Category");

// create category
exports.createCategory=async(req,res)=>{
    try {
        // fetch data
        const {name,description}=req.body;
        //validation
        if(!name){
            return res.status(400).json({
                success:false,
                message:"All fileds are required",
            })
        }
        // create entry in db
        const categoryDetails=await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);
        // return res
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get all category
exports.showAllCategory=async(req,res)=>{
    try {
        const allcategory=await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All category returned",
            allcategory,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// categoryPagedetails
exports.categoryPageDetails=async(req,res)=>{
    try {
        // get categoryId
        const {categoryId}=req.body;
        // get courses for specified category
        const selectedCategory=await Category.findById(categoryId)
        .populate({
            path: "course",
            match: {status: "Published"},
        })
        .exec()
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"courses does not exist in this category",
            })
        }
        // get courses for different catgeory
        const categoriesExceptSelected=await Category.find({_id:{$ne:categoryId}})
        const differentCategories = await Category.find(
            categoriesExceptSelected[Math.floor(Math.random() * categoriesExceptSelected.length)]._id
        )
        .populate({
            path: "course",
            match: {status: "Published"},
            populate: {
                path: "instructor",
            },
        })
        .exec()
        const allCategories = await Category.find({})
        .populate({
            path: "course",
            match: {status: "Published"},
            populate: {
                path: "instructor",
            },
        })
        .exec()
        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses.sort((a, b) => b.studentEnrolled.length - a.studentEnrolled.length).slice(0,10)
        // top selling
        // const top
        // return response
        return res.status(200).json({
            success:true,
            message:"Fetched category page details successfully",
            data:{
                selectedCategory,
                differentCategories,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"cannot ftech catgoryPageDetails",
            error:error.message,
        })
    }
}