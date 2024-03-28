import React from 'react'
import RenderCartCourses from '../components/core/Dashboard/Cart/RenderCartCourses'
import RenderTotalAmount from '../components/core/Dashboard/Cart/RenderTotalAmount'
import { useSelector } from 'react-redux'

const Cart = () => {
    const {total, totalItems} = useSelector((state)=>state.cart)
  return (
    <div className='text-richblack-5'>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>My Wishlist</h1>
        <p className='border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400'>{totalItems} courses in your cart</p>
        
        {
            total<1 ? 
            (<div className='mt-14 text-center text-3xl text-richblack-100'>Your Cart is Empty</div>) :
            (<div className='mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row'>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div>)
        }
    </div>
  )
}

export default Cart