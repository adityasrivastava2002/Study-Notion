import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import {AiOutlineShoppingCart} from "react-icons/ai"
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import {IoIosArrowDropdownCircle} from "react-icons/io"
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown';

const Navbar = () => {
    // const subLinks=[
    //     {
    //         title: "python",
    //         link: "/catalog/python"
    //     },
    //     {
    //         title: "web dev",
    //         link: "/catalog/we-dev"
    //     }
    // ]
    const [sidePanel, setSidePanel] = useState(false);
    const [subLinks, setSubLinks]=useState([]);
    const [loading,setLoading] = useState(false)
    const fetchSubLinks=async()=>{
        setLoading(true)
        try{
            const result=await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing sublinks result:", result);
            setSubLinks(result.data.allcategory);
        } catch(error){
            console.log("Could not fetch the category list");
        }
        setLoading(false)
    }

    useEffect( ()=>{
        fetchSubLinks();
    },[] )

    const {token}=useSelector((state)=>state.auth);
    const {totalItems}=useSelector((state)=>state.cart);
    const {user}=useSelector((state)=>state.profile);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
  return (
    <div className={`h-14 flex items-center justify-center border-b-[1px] ${(matchRoute("/") ? "bg-richblack-900" : "bg-richblack-800")} border-b-richblack-700 z-[1000]`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to="/">
                <img src={logo} width={160} height={42} loading='lazy' alt='logo'/>
            </Link>

            {/* nav links*/}
            <nav className="relative">
                <ul className={sidePanel ? 'max-md:pt-4 max-md:flex max-md:flex-col max-md:gap-y-4 max-md:w-[300px] max-md:h-[100vh] max-md:bg-richblack-800 max-md:fixed max-md:right-0 max-md:top-0 md:flex gap-x-6 text-richblack-25' : ' hidden md:flex gap-x-6 text-richblack-25'}>
                    {
                        NavbarLinks.map( (link,index)=>(
                            <li key={index}>
                                {
                                    link.title === "Catalog"
                                    ? (<div className={sidePanel ? 'border-b-2 p-2' : 'relative flex items-center gap-1 group'}>
                                        <div className='flex items-center gap-1'>
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle/>
                                        </div>

                                        <div className={sidePanel ? '' : 'invisible absolute bg-richblack-5 text-black flex flex-col left-[50%] top-[50%] translate-x-[-50%] translate-y-[20%] rounded-md transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-100 w-[300px]'}>
                                            <div className={sidePanel ? '' : 'absolute left-[50%] top-0 translate-x-[70%] translate-y-[-35%] h-6 w-6 rotate-45 rounded bg-richblack-5'}>
                                            </div>
                                            {loading
                                            ? (<div className='spinner'>Loading...</div>)
                                            :
                                                subLinks.length>0 ? (
                                                    subLinks.map((subLink, index)=>(
                                                        <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}
                                                        onClick={() => setSidePanel(false)}
                                                        className={sidePanel ? 'px-2' : 'z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden border-[1px] border-richblack-700 flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-900 hover:bg-richblack-700 hover:text-richblack-25'}>
                                                            <p>{subLink.name}</p>
                                                        </Link>
                                                    ))
                                                ) : (<div></div>)
                                                    
                                            }
                                        </div>

                                    </div>)
                                    : (
                                        <Link to={link?.path} onClick={() => setSidePanel(false)}>
                                            <p className={`${matchRoute(link?.path)? "text-yellow-25": "text-richblack-25"} ${sidePanel ? "border-b-2 p-2" : ""}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ) )
                    }
                </ul>
            </nav>

            {/* login/signup/dashboard */}
            <div className='relative'>
                <div className={sidePanel ? 'absolutte max-md:pt-4 max-md:flex max-md:flex-col max-md:gap-y-4 max-md:w-[300px] max-md:h-[100vh] max-md:bg-richblack-800 max-md:fixed max-md:right-0 max-md:top-[31rem] p-2 md:flex gap-x-6 text-richblack-25' :'hidden md:flex gap-x-4 items-center'}>
                    {
                        user && user.accountType!=="Instructor" && (
                            <Link to="/dashboard/cart" onClick={() => setSidePanel(false)} className='relative'>
                            <AiOutlineShoppingCart className='text-2xl text-richblack-5 relative'/>
                            {
                                totalItems>0 && (
                                    <span className={sidePanel ? 'absolute top-[-6px] animate-bounce right-[255px] text-sm flex items-center justify-center text-richblack-900 bg-yellow-50 rounded-full h-[15px] w-[15px]' :'absolute top-[-6px] animate-bounce right-[-5px] text-sm flex items-center justify-center text-richblack-900 bg-yellow-50 rounded-full h-[15px] w-[15px]'}>
                                        {totalItems}
                                    </span>
                                )
                            }
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/login">
                                <button onClick={() => setSidePanel(false)} className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token===null && (
                            <Link to="/signup">
                                <button onClick={() => setSidePanel(false)} className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                                text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token!==null && <ProfileDropDown/>
                    }
                </div>
            </div>
            <button className="mr-4 md:hidden z-10" onClick={() => setSidePanel(!sidePanel)}>
                {
                    !sidePanel 
                    ? <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                    : <AiOutlineClose fontSize={24} fill="#AFB2BF" />
                }
            </button>
        </div>
    </div>
  )
}

export default Navbar