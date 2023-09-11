import React from 'react'
import HighlightText from './HighlightText';
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-[60px]'>
        <div className='flex flex-col gap-5'>

            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for
                <HighlightText text={" learning any language"} />
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
                progress tracking, custom schedule and more.
            </div>

            <div className='flex lg:flex-row flex-col items-center justify-center mt-5'>
                <img
                    src={know_your_progress}
                    alt='KnowYourProgress'
                    className='objext-contain lg:mr-[-100px]'
                />
                <img
                    src={compare_with_others}
                    alt='CompareWithOthers'
                    className='objext-contain'
                />
                <img
                    src={plan_your_lessons}
                    alt='PlanYourLessons'
                    className='objext-contain lg:ml-[-150px]'
                />
            </div>

            <div className='mx-auto w-fit'>
                <CTAButton active={true} linkTo={"/signup"}>
                    Learn More
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection