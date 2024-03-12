import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {IoAddCircleOutline} from "react-icons/io5"
import IconBtn from "../../../../common/IconBtn"
import { MdNavigateNext,MdNavigateBefore } from 'react-icons/md'
import NestedView from './NestedView'
import { toast } from 'react-hot-toast'

import { setCourse, setEditCourse,setStep } from '../../../../../Redux/slices/courseSlice'
import { createSection, updateSection } from '../../../../../services/operations/courseAPI'

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm()

  const {course} = useSelector((state)=>state.course)
  const {token} = useSelector((state)=>state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName",  sectionName)
  }

  const onSubmit = async(data) => {
    setLoading(true)
    let result
    if(editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }
    if(result) {
      dispatch(setCourse(result))
      console.log(result)
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if(course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }
  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
    >
      <p className='text-2xl text-richblack-5 font-semibold'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className='text-sm text-richblack-5' >
            Section Name <sup className='text-pink-200'>*</sup>
          </label>
          <input
            id='sectionName'
            disabled={loading}
            placeholder='Add a section to build your course'
            {...register("sectionName", {required:true})}
            style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"  
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className='flex items-end gap-x-4 my-4'>
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-yellow-50 flex flex-row-reverse justify-center items-center gap-2 border-[1px] border-yellow-50 rounded-md py-2 px-4"}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type='button'
              onClick={cancelEdit}
              className='text-sm text-richblack-300 underline'
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {/* {course.courseContent.length > 0 && ( */}
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      {/* )} */}
      {/* Next Prev Button */}
      <div className='flex justify-end gap-x-3'>
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-800 py-[8px] px-[20px] font-semibold text-richblack-5`}
        >
          <MdNavigateBefore/>
          Back
        </button>
        <button 
        onClick={goToNext} 
        className="flex cursor-pointer items-center gap-x-2 rounded-md py-[8px] px-[20px] font-semibold bg-yellow-50 text-richblack-900">
          Next
          <MdNavigateNext/>
        </button>
      </div>
    </div>
  )
}

export default CourseBuilderForm