import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {IoAddCircleOutline} from "react-icons/io5"
import IconBtn from "../../../../common/IconBtn"
import { MdNavigateNext } from 'react-icons/md'
import NestedView from './NestedView'

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
  const [editSchemeName, setEditSchemeName] = useState(null)
  const dispatch = useDispatch()

  const cancelEdit = () => {
    setEditSchemeName(null)
    setValue("sectionName", "")
  }

  const handleEditSectionName = (sectionId, sectionName) => {
    if(editSchemeName === sectionId) {
      cancelEdit()
      return
    }
  }
  return (
    <div>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Section Name <sup className='text-pink-200'>*</sup>
          </label>
          <input
            id='sectionName'
            disabled={loading}
            placeholder='Add a section to build your course'
            {...register("sectionName", {required:true})}
            className='w-full'
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className='flex items-end gap-x-4'>
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSchemeName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSchemeName && (
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
      {course.courseContent.length > 0 && (
        <NestedView handleEditSectionName={handleEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div className='flex justify-end gap-x-3'>
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} onclick={goToNext} text={"Next"}>
          <MdNavigateNext/>
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm