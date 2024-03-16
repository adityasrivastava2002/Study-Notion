import React from 'react'
import CourseCard from './CourseCard'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'

const CourseSlider = ({Courses}) => {
  return (
    <div>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView:3,
            },
          }}
          className={"max-h-[30rem]"}
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={'h-[250px]'} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
            <p className='text-xl text-richblack-5'>No Course Found</p>
          )}
    </div>
  )
}

export default CourseSlider