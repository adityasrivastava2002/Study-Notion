import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCatalogPageData } from '../services/operations/categoryAPI'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import CourseSlider from "../components/core/Catalog/CourseSlider"
import CourseCard from '../components/core/Catalog/CourseCard'

const Catalog = () => {
    const [loading, setLoading] = useState(false)
    const [categoryId, setCategoryId] = useState("")
    const [catalogPageData, setCatalogPageData] = useState(null)
    const {catalogName} = useParams()

    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            const category_id = res?.data?.allcategory?.filter((cn) => cn.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id
            setCategoryId(category_id)
            // console.log(res)
            // console.log(categoryId)
        }
        getCategories()
    },[catalogName])

    useEffect(() => {
        const getCategoryPageDetails = async() => {
            try {
                const res = await getCatalogPageData({categoryId:categoryId})
                // console.log("CATALOG..................",res)
                setCatalogPageData(res)
            } catch (error) {
                console.log(error)
            }
        }
        if(categoryId){
            getCategoryPageDetails();
        }
    },[categoryId])

    if(loading) {
        return(
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center spinner"></div>
        )
    }
    // if(!loading && !catalogPageData.success){
    //     return <Error/>
    // }
  return (
    <div className='text-richblack-5'>
        {/* hero section */}
        <div className='bg-richblack-800 text-richblack-300 px-20 py-16 flex flex-col gap-4'>
            <p>Home / Catalog / <span className='text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
            <p className='text-richblack-5 text-4xl'>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        {/* section 1 */}
        <div className='px-20 py-10'>
            <div className='text-3xl font-semibold mb-8'>Courses to get you started</div>
            <div>
                <CourseSlider
                    Courses = {catalogPageData?.data?.selectedCategory?.course}
                />
            </div>
        </div>
        {/* section 2 */}
        <div className='px-20 py-10'>
            <div className='text-3xl font-semibold mb-8'>Top Courses in {catalogPageData?.data?.differentCategories[0]?.name}</div>
            <div>
                <CourseSlider
                    Courses = {catalogPageData?.data?.differentCategories[0]?.course}
                />
            </div>
        </div>
        {/* section 3 */}
        <div className='px-20 py-10'>
            <div className='text-3xl font-semibold mb-8'>Frequently Bought</div>
            <div className='flex flex-wrap justify-between gap-4'>
                {catalogPageData?.data?.mostSellingCourses
                ?.slice(0,4)
                .map((course,i) => (
                    <CourseCard
                        course = {course} key={i} Height={"h-[360px]"}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Catalog