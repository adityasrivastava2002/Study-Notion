import React from 'react'
import RenderCartCourses from '../components/core/Dashboard/Cart/RenderCartCourses'
import RenderTotalAmount from '../components/core/Dashboard/Cart/RenderTotalAmount'
import { useSelector } from 'react-redux'

const Cart = () => {
    const {total, totalItems} = useSelector((state)=>state.cart)
  return (
    <div className='text-richblack-5'>
        <h1 className='text-3xl'>My Wishlist</h1>
        <p>{totalItems} courses in your cart</p>
        <div className='border-[1px] border-richblack-700 mt-4'></div>
        
        {
            total<1 ? 
            (<div className='text-3xl flex justify-center items-center'>Your Cart is Empty</div>) :
            (<div>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div>)
        }
    </div>
  )
}

export default Cart