import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../utils/avgRating'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'

const CourseCard = ({course, Height}) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews)
    setAvgReviewCount(count)
  },[course])
  return (
    <div>
      <Link to={`/courses/${course._id}`}>
        <div>
          <div className='rounded-lg'>
            <img
              src={course?.thumbnail}
              alt='course thumbnail'
              className={`${Height} w-full rounded-xl object-cover`}
            />
          </div>
          <div className='flex flex-col gap-2 py-3'>
            <p className='text-xl'>{course?.courseName}</p>
            <p className='text-sm'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className='flex items-center gap-2'>
              <span className='text-yellow-50'>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className='text-richblack-400'>{course?.ratingAndReviews?.length}</span> Ratings
            </div>
            <p className='text-xl'>Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard