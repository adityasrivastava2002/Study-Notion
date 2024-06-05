import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");

    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create options
    const options = {

    };


  return (
    <div className='font-bold p-4 bg-richblack-800 w-[75%]'>
      <p>Visualise</p>
      <div className='flex gap-x-5 p-1'>
        <button
        onClick={() => setCurrChart("students")}
        className={`${currChart === "students" ? 'bg-richblack-700 px-2 py-1 text-yellow-50 rounded-md' : 'px-2 py-1 text-yellow-200'}`}
        >
            Students
        </button>

        <button
        onClick={() => setCurrChart("income")}
        className={`${currChart === "income" ? 'bg-richblack-700 px-2 py-1 text-yellow-50 rounded-md' : 'px-2 py-1 text-yellow-200'}`}
        >
            Income
        </button>
      </div>
      <div className='flex items-center justify-center h-[400px] w-[100%]'>
        <Pie 
            data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
