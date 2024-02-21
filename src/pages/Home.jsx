import React from "react";
import {FaArrowRight} from "react-icons/fa"
import { Link } from "react-router-dom";
import CTAButton from "../components/core/HomePage/Button"
import HighlightText from "../components/core/HomePage/HighlightText";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Banner from "../assets/Images/banner.mp4"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div className="relative mx-auto max-w-maxContent flex flex-col w-11/12 items-left
            text-white justify-between">

                {/* top header */}
                <div className="bg-richblack-800 rounded-full mt-16 p-1 mx-auto font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 hover:bg-richblack-900 border-2 w-fit">
                    <Link to={"/signup"}>
                        <div className="flex flex-row items-center gap-2 rounded-full
                        px-10 py-[5px]">
                            <p>Become Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </Link>
                </div>
                
                    
                

                <div className="mt-8 text-4xl flex flex-row font-semibold text-center justify-center">
                    <div>
                        Empower Your Future With
                        <HighlightText text={"Coding Skills"}/>
                    </div>
                </div>

                <div className=" mt-8 text-center text-lg font-semibold text-richblack-300 w-[90%]">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8 justify-center">
                    <CTAButton active={true} linkTo={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkTo={"/login"}>
                        Book a demo
                    </CTAButton>
                </div>

                {/* video */}
                <div className="mx-4 my-14 shadow-2xl ring-offset-2  shadow-blue-200 ">
                    <video muted loop autoPlay>
                        <source src={Banner} type="video/mp4"></source>
                    </video>
                </div>

                {/* Code Section 1 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={<div>
                            Unlock your 
                            <HighlightText text={"coding potential"}/>
                             with our online courses.
                        </div>}
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                btnText:"Try It Yourself",
                                active:true,
                                linkTo:"/signup"
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                active:false,
                                linkTo:"/signup"
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html lang="en"\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One<a/> <a\n href="/two">Two<a/> <a href="/three">Three<a/>\n </nav>\n</body>`}
                        codeColour={"text-yellow-25"}
                        backgroundGradient={"bg-gradient-to-r from-[green] via-blue-500 to-[purple]"}
                    />
                </div>
                {/* code Section 2 */}
                <div>
                    <CodeBlocks
                        position={"max-lg:flex-row-reverse lg:flex-row-reverse"}
                        heading={<div>
                            <div>
                                Start
                                <HighlightText text={"coding in"}/>
                            </div>
                            <HighlightText text={"seconds"}/>
                        </div>}
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText:"Continue Lesson",
                                active:true,
                                linkTo:"/signup"
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn More",
                                active:false,
                                linkTo:"/signup"
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html lang="en"\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One<a/> <a\n href="/two">Two<a/> <a href="/three">Three<a/>\n </nav>\n</body>`}
                        backgroundGradient={"bg-gradient-to-r from-[lime] via-yellow-300 to-[red]"}
                        codeColour={"text-yellow-25"}
                    />
                </div>
                {/* explore more */}
                <div className="flex items-center justify-center">
                    <ExploreMore/>
                </div>
            </div>

            {/* Section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[310px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto">
                        <div className="lg:h-[180px] md:h-[130px] sm:h-[130px] max-sm:h-[80px]"></div>
                        <div className="flex sm:flex-row flex-col gap-7 text-white">
                            <CTAButton active={true} linkTo={"/signup"}>
                                <div className="flex items-center gap-3">
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkTo={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                        
                    </div>
                </div>
                
                <div className="w-11/12 mx-auto flex flex-col max-w-maxContent items-center justify-center">
                    <LearningLanguageSection/>
                </div>
            </div>

            {/* footer */}
        </div>
        
    )
}
export default Home;