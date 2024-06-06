import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import {useNavigate, useLocation, useParams} from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { MdOutlineArrowBackIos } from "react-icons/md";

const VideoDetailsSidebar = ({reviewModal, setReviewModal}) => {

  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const location = useLocation()
  const {sectionId, subSectionId} = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const navigate = useNavigate()

  const handleAddReview = () => {
    setReviewModal(true)
  }

  useEffect(() => {
    const setActiveFlags = () => {
      if(!courseSectionData.length) {
        return;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      )
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id);
    }
    setActiveFlags();
  },[courseSectionData, courseEntireData, location.pathname])

  return (
    <div className={`text-richblack-5 bg-richblack-800 min-h-screen w-[300px] max-md:w-full max-md:min-h-min
     ${reviewModal ? "blur-md z-1" : ""}'`}>
        {/* button and heading */}
        <div>
          <div className='flex items-center justify-between p-[16px]'>
            <div
            className='p-2 rounded-full bg-richblack-600'
            onClick={() => navigate("/dashboard/enrolled-courses")}>
              <MdOutlineArrowBackIos/>
            </div>

            <div>
              <IconBtn
                text={"Add Review"}
                onclick={() => handleAddReview()}
                customClasses={"bg-yellow-50 rounded-md text-richblack-900 px-[10px] py-[6px]"}
              />
            </div>
          </div>

          <div className='px-[16px]'>
            <p className='text-lg text-richblack-5'>{courseEntireData?.courseName}</p>
            <p className='text-sm text-richblack-200'>{completedLectures?.length} / {totalNoOfLectures}</p>
          </div>
        </div>

        {/* sections and subsections */}
        <div className=''>
          {
            courseSectionData?.map((course, index) => (
              <div
                onClick={() => setActiveStatus(course._id)}
                key={index}
              >
                {/* section */}
                <div className='p-[16px]'>
                  <p>{course?.sectionName}</p>
                  {/* add icon */}
                </div>

                {/* subsection */}
                <div>
                  {
                    activeStatus === course?._id && (
                      <div>
                        {
                          course.subSection?.map((topic, index) => (
                            <div
                              className={`flex border-[1px] border-richblack-600 gap-5 p-5 ${
                                                          videoBarActive === topic._id
                                                          ? "bg-yellow-200 text-richblack-900"
                                                          : "bg-richblack-900 text-white"
                                                      }`}
                              key={index}
                              onClick={() => {
                                navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)
                                setVideoBarActive(topic?._id)
                              }}

                            >
                              <input
                                type='checkbox'
                                checked = {completedLectures.includes(topic?._id)}
                                onChange={() => {}}
                              />
                              <span>
                                {topic.title}
                              </span>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default VideoDetailsSidebar