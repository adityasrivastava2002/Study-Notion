import React, { useEffect, useState } from 'react'
import { deleteCourse, getAllInstructorCourses } from '../services/operations/courseAPI'
import { useSelector } from 'react-redux'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { FaClock, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../components/common/ConfirmationModal'

const MyCourses = () => {
    const navigate = useNavigate()
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [loading, setLoading] = useState(false)

    const [courses, setCourses] = useState([])

    const {token} = useSelector((state)=>state.auth)

    const handleCourseDelete = async(courseId) => {
        setLoading(true)
        console.log("called")
        await deleteCourse({courseId:courseId}, token)
        fetchInstructorCourses()
        setConfirmationModal(null)
        setLoading(false)
    }

    async function fetchInstructorCourses () {
        try {
            const response = await getAllInstructorCourses(token)
            setCourses(response)
        } catch (error) {
            console.log("Failed fetching My Courses")
        }
    }

    useEffect(()=>{
        fetchInstructorCourses();
    },[])
  return (
    <div className='text-richblack-100'>
        <h1 className='text-3xl text-richblack-5'>My Courses</h1>
        <div className='border-[1px] border-richblack-700 rounded-md my-6'>
            <div className='flex p-4 border-b-[1px] border-b-richblack-700'>
                <p className='w-[70%]'>Courses</p>
                <p className='w-[10%] text-center'>Duration</p>
                <p className='w-[10%] text-center'>Price</p>
                <p className='w-[10%] text-center'>Action</p>
            </div>
            {/* course card */}
            {
                courses.map((course, index)=>(
                    <div className='flex p-4'>
                        <div className='flex items-center w-[70%] gap-x-4'>
                            <img
                                src={course?.thumbnail}
                                className='w-[150px] h-[90px] aspect-auto rounded-md'
                            />
                            <div>
                                <p className='text-richblack-5'>{course?.courseName}</p>
                                <p>{course?.courseDescription}</p>
                                <p>{course?.status === "Draft" ? 
                                (<span className='bg-richblack-700 rounded-full text-pink-400 max-w-max flex px-2 gap-x-2 items-center'>
                                    <FaClock />
                                    <span>Draft</span>
                                </span>) : (
                                <span className='bg-richblack-700 rounded-full text-yellow-50 max-w-max flex px-2 gap-x-2 items-center'>
                                    <FaCheckCircle />
                                    <span>Published</span>
                                </span>
                                )}</p>
                            </div>
                        </div>
                        <div className='w-[10%] flex text-center items-center justify-center'>{course?.duration}</div>
                        <div className='w-[10%] flex text-center items-center justify-center'>{course?.price}</div>
                        <div className='w-[10%] flex gap-x-2 items-center justify-center text-lg'>
                            <button
                            title={"Edit"}
                            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                            onClick={()=>navigate(`/dashboard/edit-course/${course._id}`)}
                            >
                                <VscEdit />
                            </button>
                            <button
                                onClick={() => {
                                setConfirmationModal({
                                    text1: "Do you want to delete this course?",
                                    text2:
                                    "All the data related to this course will be deleted",
                                    btn1Text: !loading ? "Delete" : "Loading...  ",
                                    btn2Text: "Cancel",
                                    btn1Handler: !loading
                                    ? () => handleCourseDelete(course._id)
                                    : () => {},
                                    btn2Handler: !loading
                                    ? () => setConfirmationModal(null)
                                    : () => {},
                                })
                                }}
                                title="Delete"
                                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                            >
                                <VscTrash />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default MyCourses