import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseAPI'
import { setCourse, setStep } from '../../../../../Redux/slices/courseSlice'
import toast from 'react-hot-toast'
import {COURSE_STATUS} from "../../../../../utils/constants"
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import {MdNavigateNext} from "react-icons/md"
import IconBtn from '../../../../common/IconBtn'
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementsField"
import Upload from '../Upload'

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm()

  const dispatch = useDispatch()

  const {course, editCourse} = useSelector((state)=> state.course)
  const {token} = useSelector((state)=>state.auth)

  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(()=>{
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if(categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if(editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }

    getCategories()
  },[])

  const isFormUpdated = () => {
    const currentValues = getValues()
    if(
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if( isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        data.courseTags.forEach((item) => formData.append("tag", item))
        formData.append("whatYouWillLearn", data.courseBenefits)
        if(currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        data.courseRequirements.forEach((item) => formData.append("instructions", item))
        formData.append("thumbnailImage", data.courseImage)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("no changes made to the form")
      }
      return
    }
    // console.log(data.course)

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    data.courseTags.forEach((item) => formData.append("tag", item))
    // formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    data.courseRequirements.forEach((item) => formData.append("instructions", item))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if(result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  } 

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
    >
      {/* course title */}
      <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='courseTitle'>
          Course Title <sup className='text-pink-200'>*</sup>
        </label>
        <input
          id='courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle", {required: true})}
          style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"       
        />
        {errors.courseTitle && (
          <span className='ml-2 text-xs tracking-wide text-pink-200'>
            Course title is required
          </span>
        )}
      </div>

      {/* course description */}
      <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='courseShortDesc'>
          Course Short Description <sup className='text-pink-200'>*</sup>
        </label>
        <textarea
          id='courseShortDesc'
          placeholder='Enter Description'
          {...register("courseShortDesc", {required: true})}
          style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
          className="min-h-[130px] w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"       
        />
        {errors.courseShortDesc && (
          <span className='ml-2 text-xs tracking-wide text-pink-200'>
            Course Description is required
          </span>
        )}
      </div>

      {/* course price */}
      <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor='coursePrice'>
          Course Price <sup className='text-pink-200'>*</sup>
        </label>
        <div className='relative'>
          <input
            id='coursePrice'
            placeholder='Enter Course Price'
            {...register("coursePrice", {required: true})}
            style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 !pl-12"       
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className='ml-2 text-xs tracking-wide text-pink-200'>
            Course price is required
          </span>
        )}
      </div>

      {/* course category */}
      <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor="courseCategory">
          Course Category <sup className='text-pink-200'>*</sup>
        </label>
        <select
        {...register("courseCategory", {required: true})}
        defaultValue={""}
        id='courseCategory'
        style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
        className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        >
          <option value="" disabled>
            Choose a category
          </option>
          {!loading &&
            courseCategories?.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course category is required
          </span>
        )}
      </div>
      
      {/* course tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* course thumbnail image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* benfits of course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
          className="w-full min-h-[130px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>

      {/* requirements/instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      {/* next button */}
      <div className="flex justify-end gap-x-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex items-center gap-x-2 mt-6 font-medium rounded-md px-[12px] py-[8px] bg-richblack-300 text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editCourse ? "Next" : "Save Changes"}
          customClasses={"flex items-center gap-x-2 mt-6 font-medium text-richblack-900 bg-yellow-50 rounded-md px-[12px] py-[8px]"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}

export default CourseInformationForm