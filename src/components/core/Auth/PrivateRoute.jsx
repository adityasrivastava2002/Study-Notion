import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {token} = useSelector((state)=>state.profile)

    if(token !== null) {
        return children
    } else {
        return <Navigate to={"/login"} />
    }
  return (
    <div>
        
    </div>
  )
}

export default PrivateRoute