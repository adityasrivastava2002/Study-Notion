import React from 'react'

const Stats = () => {
    const Stats = [
        {count:'5K', label: "Active Students"},
        {count:'10+', label: "Mentors"},
        {count:'200+', label: "Courses"},
        {count:'50+', label: "Awards"},
    ]
  return (
    <section className='flex justify-center'>
        <div className='flex w-11/12 justify-around mt-30 min-h-[20%] font-bold max-md:gap-10 max-md:flex-col lg:flex-row'>
            {
                Stats.map((Stat, index)=>(
                    <div key={index} className='text-richblack-5 flex justify-center items-center flex-col'>
                        <h1 className='text-4xl'>{Stat.count}</h1>
                        <p className='text-[1rem] text-richblack-400'>{Stat.label}</p>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Stats