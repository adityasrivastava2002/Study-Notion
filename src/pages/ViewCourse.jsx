import React, { useEffect, useState } from 'react'
import VideoDetailsSidebar from '../components/core/View Course/VideoDetailsSidebar'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/View Course/CourseReviewModal'
import { useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../services/operations/courseAPI'
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../Redux/slices/viewCourseSlice'

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false)
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            console.log(courseData)
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            });
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails()
    },[])
  return (
    <div className='flex max-md:flex-col'>
        <VideoDetailsSidebar reviewModal={reviewModal} setReviewModal={setReviewModal} />
        <div className={`${reviewModal ? "blur-md z-1" : ""}'`}>
            <Outlet/>
        </div>
        {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
    </div>
  )
}

export default ViewCourse