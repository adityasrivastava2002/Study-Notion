import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import CTAButton from "./Button";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColour
}) => {
  return (
    <div className={`flex max-sm:flex-col max-md:flex-col ${position} my-20 items-center justify-between gap-10`}>
        {/* Section 1 */}
        <div className='lg:w-[50%] md:w-full flex flex-col gap-8 text-4xl font-semibold'>
            {heading}

            <div className='text-richblack-300 text-lg font-semibold'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>
        {/* Section 2 */}
        <div className='h-fit w-[100%] lg:w-[500px] flex flex-row relative rounded-sm border-richblack-400 border-[1px]'>
            <div className={`${backgroundGradient}  rounded-full w-[300px] h-[200px] absolute flex items-center justify-center z-2`}>
            </div>
            <div className='flex flex-row backdrop-filter backdrop-blur-3xl h-[100%] w-[100%] p-4'>
                <div className='z-10 text-center mr-4 text-richblack-300'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono pr-2 ${codeColour} z-10`}>
                    <TypeAnimation
                        sequence={[codeblock,5000,""]}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={true}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block"
                            }
                        }
                    />
                </div>
            </div>
            
        </div>
        {/* HW fro gradient */}
    </div>
  )
}

export default CodeBlocks