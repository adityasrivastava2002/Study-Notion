import React, { useEffect, useState } from 'react'
import { deleteCourse, getAllInstructorCourses } from '../services/operations/courseAPI'
import { useSelector } from 'react-redux'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { FaClock, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../components/common/ConfirmationModal'
import IconBtn from '../components/common/IconBtn'

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
        <div className='flex justify-between w-[100%]'>
            <h1 className='text-3xl text-richblack-5'>My Courses</h1>
            <IconBtn
                customClasses={"flex items-center gap-x-2 font-semibold text-richblack-900 bg-yellow-50 rounded-md px-[12px] py-[8px]"} 
                type={"button"}
                onclick={() => navigate("/dashboard/add-course")}
                text={"Add Courses +"}
            />
        </div>
        
        <div className='border-[1px] border-richblack-700 rounded-md my-6'>
            <div className='max-md:hidden flex p-4 border-b-[1px] border-b-richblack-700'>
                <p className='w-[70%]'>Courses</p>
                <p className='w-[10%] text-center'>Duration</p>
                <p className='w-[10%] text-center'>Price</p>
                <p className='w-[10%] text-center'>Action</p>
            </div>
            {/* course card */}
            {
                courses.map((course, index)=>(
                    <div className='flex p-4 max-md:flex-col max-md:mx-auto' key={index}>
                        <div className='flex items-center w-[70%] gap-x-4 max-md:flex-col max-md:mx-auto'>
                            <img
                                src={course?.thumbnail}
                                className='w-[150px] h-[90px] aspect-auto rounded-md'
                            />
                            <div className='max-md:flex max-md:flex-col max-md:justify-center gap-y-4'>
                                <p className='text-richblack-5 max-md:text-center'>{course?.courseName}</p>
                                <p className='max-md:text-center'>{course?.courseDescription}</p>
                                <p className='max-md:mx-auto'>{course?.status === "Draft" ? 
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
                        <div className='md:w-[10%] flex text-center items-center max-md:py-2 justify-center'>{"2hr 30min"}</div>
                        <div className='md:w-[10%] flex text-center items-center max-md:py-2 justify-center'>{course?.price}</div>
                        <div className='md:w-[10%] flex gap-x-2 items-center max-md:py-2 justify-center text-lg'>
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