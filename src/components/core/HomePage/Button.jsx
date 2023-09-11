import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, linkTo}) => {
  return (
    <div className={`${active ? "text-black bg-yellow-50":"bg-richblack-800"}
    text-center text-lg px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200`}>
        <Link to={linkTo}>
            {children}
        </Link>
    </div>
  )
}

export default Button