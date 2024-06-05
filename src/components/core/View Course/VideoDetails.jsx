import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import {AiFillPlayCircle} from "react-icons/ai"
import IconBtn from "../../common/IconBtn";
import {markLectureAsComplete} from "../../../services/operations/courseAPI"
import {updateCompletedLectures} from "../../../Redux/slices/viewCourseSlice"

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state) => state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async() => {
      // if(!courseSectionData.length) {
      //   return;
      // }
      if(!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
  
        const filteredVideoData = filteredData?.[0].subSection.filter(
          (data) => data._id === subSectionId
        )
  
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    }
    setVideoSpecificDetails();
  },[courseSectionData, courseEntireData, location.pathname])

  const handleLectureCompletion = async() => {
    setLoading(true);
    const res = await markLectureAsComplete({courseId:courseId, subSectionId: subSectionId}, token);
    if(res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  }
  return (
    <div className='text-4xl text-richblack-5'>
      {
        !videoData 
        ? (<div>
          No Data Found
        </div>) 
        : (
          <Player
          ref={playerRef}
          aspectRatio='16:9'
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
          className={"min-h-[80vh] min-w-[75vw] m-[14px]"}
          >
            {
              videoEnded && (
                <div className='flex gap-4 py-8 justify-end'>
                  {
                    !completedLectures.includes(subSectionId) && (
                      <IconBtn
                      customClasses={"text-lg bg-yellow-100 text-black px-3 py-2 rounded-md"}
                        disabled={loading}
                        onclick={() => handleLectureCompletion()}
                        text={!loading ? "Mark As Completed" : "Loading..."}
                      />
                    )
                  }

                  <IconBtn customClasses="text-lg bg-yellow-100 text-black px-3 py-2 rounded-md"
                    disabled={loading}
                    onclick={() => {
                      if(playerRef?.current) {
                        playerRef.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    text={"Rewatch"}
                  />

                    {/* <div>
                        {!isFirstVideo() && (
                            <button
                            disabled={loading}
                            onClick={goToPrevVideo}
                            className='blackButton'
                            >
                                Prev
                            </button>
                        )}
                        {!isLastVideo() && (
                            <button
                            disabled={loading}
                            onClick={goToNextVideo}
                            className='blackButton'>
                                Next
                            </button>
                        )}
                    </div> */}
                </div>
              )
            }
          </Player>
        )
      }
      <h1 className='px-4 pt-4'>{videoData?.title}</h1>
      <p className='p-4 text-sm'>{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails