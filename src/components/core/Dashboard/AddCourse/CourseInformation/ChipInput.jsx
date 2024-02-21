import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) => {
    const {editCourse, course} = useSelector((state)=>state.course)
    const [chips,setChips] = useState([])
    useEffect(()=>{
        if(editCourse) {
            setChips(course?.tag)
        }
        register(name, {required:true, validate: (value) => value.length > 0})
    },[])
    useEffect(()=>{
        setValue(name, chips)
    },[chips])

    const handleKeyDown = (event) => {
        if(event.key === "Enter" || event.key === ",") {
            event.preventDefault()
            const chipValue = event.target.value.trim()
            if(chipValue && !chips.includes(chipValue)) {
                const newChips = [...chips, chipValue]
                setChips(newChips)
                event.target.value = ""
            }
        }
    }

    const handleDeleteChip = (chipIndex) => {
        const newChips = chips.filter((_,index) => index !==chipIndex)
        setChips(newChips)
    }
  return (
    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor={name}>
            {label} <sup className="text-pink-200">*</sup>
        </label>
        <div className="flex w-full flex-wrap gap-y-2">
            {chips.map((chip, index) => (
                <div
                    key={index}
                    className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'
                >
                    {chip}
                    <button
                    type='button'
                    className='ml-2 focus:outline-none'
                    onClick={()=>handleDeleteChip(index)}>
                        <MdClose className='text-sm' />
                    </button>
                </div>
            ))}
            <input
                id={name}
                name={name}
                placeholder={placeholder}
                type='text'
                onKeyDown={handleKeyDown}
                style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
        </div>
        {errors[name] && (
            <span className='ml-2 text-xs text-pink-200'>
                {label} is required
            </span>
        )}
    </div>
  )
}

export default ChipInput