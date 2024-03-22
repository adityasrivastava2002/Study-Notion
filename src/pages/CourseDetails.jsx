import React, { useEffect, useState } from 'react'
import { fetchCourseDetails } from '../services/operations/courseAPI'
import { useNavigate, useParams } from 'react-router-dom'
import Error from './Error'
import { FaEarthAmericas } from "react-icons/fa6";
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineVideoCamera } from "react-icons/hi";

const CourseDetails = () => {
  const {courseId} = useParams()
  const [courseData, setCourseData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const {token} = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [sectionCollapse, setSectionCollapse] = useState(false)

  useEffect(() => {
    const getCourseFullDetails = async() => {
      try {
        const res = await fetchCourseDetails(courseId)
        console.log(res)
        setCourseData(res)
      } catch (error) {
        console.log("Could not fetch course details")
      }
    }
    getCourseFullDetails()
  },[courseId])

  const handleBuyCourse = () => {
    if(token) {
      // handleBuyCourse(token, [courseId], user, navigate, disptach);
      return;
    }
    setConfirmationModal({
      text1:"you are not Logged in",
      text2:"Please login to purchase the course",
      btn1Text:"Login",
      btn2Text:"Cancel",
      btn1Handler:() => navigate("/login"),
      btn2Handler:()=>setConfirmationModal(null),
    })
  }

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  useEffect(() => {
    let lectures = 0
    let totalDur = 0
    courseData?.data[0]?.courseContent?.forEach((sec) => {
      lectures += sec?.subSection.length || 0
      sec?.subSection?.forEach((subSec) => {
        totalDur += parseInt((subSec?.timeDuration),10)
      })
    });
    setTotalNoOfLectures(lectures)
    setTotalDuration(totalDur)
  },[courseData])

  if(!courseData || loading) {
    return (
      <div>Loading...</div>
    )
  }

  if(!courseData?.success) {
    return (
      <div><Error/></div>
    )
  }

  const {
    _id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
  } = courseData?.data[0]
  return (
    <div className='text-richblack-5'>
      <div className='bg-richblack-800 xl:px-28 max-xl:mx-auto max-xl:items-center max-xl:px-10 py-8 pb-10 flex flex-col gap-4 relative'>
      {/* course intro */}
        <div className='text-richblack-5 flex flex-col max-xl:max-w-[830px] gap-4 xl:w-2/3'>
          <p className='text-4xl font-semibold'>{courseName}</p>
          <p className='text-xl text-richblack-400'>{courseDescription}</p>
          <p className='text-xl'>{studentEnrolled.length} enrolled students</p>
          <p className='text-xl'>Created By {instructor?.firstName} {instructor?.lastName}</p>
          <div className='flex items-center gap-2 text-xl'>
            <FaEarthAmericas/>
            English
          </div>
        </div>
        <div className='xl:bg-richblack-700 max-xl:max-w-[830px] xl:w-[400px] max-xl:text-center max-xl:border-y-[1px] max-xl:border-richblack-500 xl:rounded-md max-xl:py-5 max-xl:w-[100%] xl:p-10 xl:absolute right-28 top-20 xl:w-1/3 mx-auto max-w-maxContentTab xl:max-w-[810px]'>
          <CourseDetailsCard 
            course={courseData?.data[0]}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
            />
        </div>
      </div>
      {/* what u will learn */}
      <div className='xl:w-2/3 xl:px-28 max-xl:max-w-[830px] max-xl:mx-auto max-xl:px-10 py-8 mt-12'>
        <div className='p-10 flex flex-col gap-4 border-[1px] rounded-md border-richblack-200'>
          <p className='text-3xl'>What You Will Learn</p>
          <div>{whatYouWillLearn}</div>
        </div>
      </div>

      {/* section nd subsec */}
      <div className='xl:w-2/3 xl:px-28 max-xl:max-w-[830px] max-xl:mx-auto max-xl:px-10 py-8'>
        <div>
          <p className='text-3xl font-semibold'>Course Content</p>
        </div>

        <div>
          <div className='flex justify-between py-2 max-sm:flex-col'>
            <div className='flex gap-4 py-2 max-sm:flex-col'>
              <span>{courseContent.length} section(s)</span>
              <span>{totalNoOfLectures} lecture(s)</span>
              <span>{totalDuration}min total length</span>
            </div>
            <div className='text-yellow-50'>
              <button onClick={() => setSectionCollapse(!sectionCollapse)}>
                Collapse all sections
              </button>
            </div>
          </div>
          {/* <details> */}
            {
              courseData?.data[0]?.courseContent?.map((sec,index) => (
                <details key={index} open={sectionCollapse}
                className='border-[1px] border-richblack-600'>
                  <summary className='bg-richblack-700 px-8 py-6'>
                    {sec?.sectionName}
                  </summary>
                  {
                    sec?.subSection?.map((sub,i) => (
                      <div className='flex items-center gap-2 bg-richblack-900 px-8 py-6 border-b-[1px] border-richblack-600' key={i}>
                        <HiOutlineVideoCamera/>
                        <p>{sub.title}</p>
                      </div>
                    ))
                  }
                </details>
              ))
            }
          {/* </details> */}
        </div>
      </div>

      {/* author */}
      <div className='xl:w-2/3 xl:px-28 max-xl:max-w-[830px] max-xl:mx-auto max-xl:px-10 py-8 pb-10 flex flex-col gap-4'>
        <p className='text-3xl font-semibold'>Author</p>
        <div className='flex gap-4 items-center'>
          <img
            src={instructor?.image}
            alt='instructor dp'
            className='w-[50px] h-[50px] rounded-full'
          />
          <p className='text-lg'>{instructor.firstName} {instructor.lastName}</p>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails