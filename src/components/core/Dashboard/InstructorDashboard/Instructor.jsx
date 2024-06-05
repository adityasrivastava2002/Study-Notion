import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getInstructorData} from "../../../../services/operations/profileAPI"
import { Link } from 'react-router-dom';
import { getAllInstructorCourses } from '../../../../services/operations/courseAPI';
import InstructorChart from './InstructorChart';

const Instructor = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true);

            const instructorApiData = await getInstructorData(token);
            const result = await getAllInstructorCourses(token);
            console.log(instructorApiData);

            if(instructorApiData.length) {
                setInstructorData(instructorApiData);
            }
            if(result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    },[])

    const totalAmount = instructorData?.reduce((acc,curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);
  return (
    <div className='text-white'>
        <div className='flex flex-col gap-1'>
            <h1 className='text-xl font-bold'>Hi {user?.firstName}👋</h1>
            <p className='text-richblack-200 text-md'> Let's start something new</p>
        </div>

        {loading ? (<div className='spinner'></div>)
        :courses.length > 0
            ?(<div className='my-4'>
                <div>
                    <div className='flex gap-2'>
                        <InstructorChart courses={instructorData}/>
                        <div className='bg-richblack-800 p-4 w-[24%]'>
                            <p className='font-bold my-2'>Statistics</p>
                            <div>
                                <p className='text-richblack-200'>Total Courses</p>
                                <p className='text-xl font-bold'>{courses.length}</p>
                            </div>

                            <div>
                                <p className='text-richblack-200'>Total Students</p>
                                <p className='text-xl font-bold'>{totalStudents}</p>
                            </div>

                            <div>
                                <p className='text-richblack-200'>Total Income</p>
                                <p className='text-xl font-bold'>{totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                <div className='bg-richblack-800 mt-2 flex justify-between'>
                    <p className='font-bold p-4 bg-richblack-800'>Your Courses</p>
                    <Link to="/course/my-courses">
                        <p className='p-4 text-yellow-50'>View all</p>
                    </Link>
                </div>
                <div className='gap-4 bg-richblack-800 flex justify-center'>
                    {
                        courses.slice(0,3).map((course)=> (
                            <div key={course._id}
                            className='w-[30%]'>
                                <Link to={'/course/my-courses'}>
                                    <img 
                                        src={course.thumbnail}
                                        alt='course_thumbnail'
                                    />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <div className='flex gap-2 text-richblack-200'>
                                            <p>{course.studentEnrolled.length} students</p>
                                            <p> | </p>
                                            <p> Rs {course.price}</p>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                </div>
            </div>)
            :(<div>
                <p>You have not created any courses yet</p>
                <Link to={"/dashboard/addCourse"}>
                    Create a Course
                </Link>
            </div>)}
    </div>
  )
}

export default Instructor