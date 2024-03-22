import React, { useEffect, useState } from 'react'
import RenderSteps from '../AddCourse/RenderSteps'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseAPI'
import { useParams } from 'react-router-dom'
import { resetCourseState, setCourse, setEditCourse } from '../../../../Redux/slices/courseSlice'

export default function EditCourse() {
    const {course} = useSelector((state)=>state.course)
    const [loading,setLoading] = useState(false)
    const {courseId} = useParams()
    const {token} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)
            if(result?.courseDetails) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
        }
        populateCourseDetails()

        return () => {
            dispatch(resetCourseState());
        };
    },[])

    if(loading) {
        return(
            <div className='grid flex-1 place-items-center'>
                <div className='spinner'>Loading...</div>
            </div>
        )
    }
  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
        <div className="mx-auto max-w-[600px]">
            {course ? (
                <RenderSteps />
            ) : (
                <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                    Course not found
                </p>
            )}
        </div>
    </div>
  )
}
