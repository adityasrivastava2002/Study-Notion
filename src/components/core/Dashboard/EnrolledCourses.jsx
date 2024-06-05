import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'
import {SlOptionsVertical} from "react-icons/sl"
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {
    const {token} = useSelector((state)=>state.auth)
    const navigate = useNavigate()

    const [enrolledCourses, setEnrolledCourses] = useState([])

    const [showDescription, setShowDescription] = useState(false)

    const getEnrolledCourses = async() => {
        try {
            const response = await getUserEnrolledCourses(token)
            setEnrolledCourses(response)
        } catch (error) {
            console.log("Unable to get user enrolled courses")
        }
    }

    useEffect(()=>{
        getEnrolledCourses();
    },[])
  return (
    <div className='text-richblack-100 mx-auto'>
        <div className='text-3xl text-richblack-5'>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>Loading...</div>) :
            enrolledCourses.length<1 ? 
            (<div>You have not been enrolled in any of the courses yet.</div>) :
            (
                <div className='border-[1px] border-richblack-700 rounded-md my-8'>
                    <div className='flex bg-richblack-700 gap-x-4 p-4'>
                        <p className='w-[50%]'>Course Name</p>
                        <p className='w-[20%]'>Duration</p>
                        <p className='w-[20%]'>Progress</p>
                    </div>
                    {/* course card */}

                        {
                            enrolledCourses.map((course, index) => (
                                <div className='flex gap-x-4 p-4 border-b-[1px] border-b-richblack-700' key={index}>
                                    <div className='flex w-[50%]'
                                        onClick={() => {
                                            navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                                        }}
                                    >
                                        <img  src={course.thumbnail}
                                            className='aspect-square w-[40px] h-[40px] rounded-md'
                                        />
                                        <div className='px-4'>
                                            <p className='text-richblack-5'>{course.courseName}</p>
                                            <p>
                                                {showDescription === course._id ? 
                                                (<div>
                                                    {course.courseDescription}
                                                    <span className='text-yellow-50' onClick={(e)=>{
                                                        e.stopPropagation();
                                                        setShowDescription(null)
                                                    }}>
                                                        <br/>
                                                        Hide Description
                                                    </span>
                                                </div>) : 
                                                <div className='text-yellow-50' onClick={(e)=>{
                                                    e.stopPropagation();
                                                    setShowDescription(course._id)
                                                }}>Show Description</div>}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='w-[20%]'>
                                        {course?.totalDuration}
                                        {/* 2hr 30min */}
                                    </div>

                                    <div className='w-[20%]'>
                                        <p>Progress: {course.progressPercentage || 0}%</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}
                                            />
                                    </div>
                                    <div className='flex items-center justify-center w-[5%]'>
                                        <SlOptionsVertical />
                                    </div>
                                </div>
                            ))
                        }

                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses