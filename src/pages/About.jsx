import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Stats from '../components/core/AboutPage/Stats'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

const About = () => {
  return (
    <div>
        {/* section 1 */}
        <section className='bg-richblack-700 lg:max-h-[72vh] mb-[30vh] mx-auto'>
            <div className='text-4xl flex flex-col font-semibold text-center justify-center items-center'>
                <header className='w-7/12 text-richblack-5 flex flex-col mt-20 mb-14'>
                    Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"} />
                    <p className='text-richblack-400 mt-4 text-[1rem] font-semibold leading-[1.625rem]'>
                        Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
                <div className='flex justify-around gap-10 max-md:flex-col lg:flex-row max-lg:px-2'>
                    <img src={BannerImage1} />
                    <img src={BannerImage2} />
                    <img src={BannerImage3} />
                </div>
            </div>
        </section>

        {/* section 2 */}
        <section className='min-h-[40%]'>
            <div className='text-4xl font-semibold text-center mx-auto mb-40 text-richblack-5 flex justify-center'>
                    <p className='w-11/12'>
                    We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text="combines technology"/>, expertise, and community to create an <HighlightText text="unparalleled educational experience."/>
                    </p>
                </div>
        </section>

        {/* section 3 */}
        <section className='bg-richblack-700 mx-auto py-20'>
            <div>
                <Stats/>
            </div>
        </section>
        {/* section 4 */}
        <section>
            <ContactFormSection/>
        </section>
    </div>
  )
}

export default About