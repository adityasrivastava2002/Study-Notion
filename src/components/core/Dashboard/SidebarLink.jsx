import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"

const SidebarLink = ({link, iconName, setSidePanel}) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const Icon=Icons[iconName]
    function matchRoute(route) {
        return matchPath({path:route}, location.pathname)
    }
  return (
    <NavLink 
    to={link.path}
    onClick={() => setSidePanel(false)}
    className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50":"bg-opacity-0"}`}>
        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
        ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}>

        </span>

        <div className='flex item-center gap-x-2' >
            <Icon className='text-lg' />
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink