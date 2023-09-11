import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
};

const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers:{
        addToCart: (state,action)=>{
            const course = action.payload;
            const index= state.cart.findIndex((item)=>item._id===course._id);
            // if course is already in cart
            if(index>=0){
                toast.error("Course already in cart");
                return;
            }
            // if not in cart then
            state.totalItems++;
            state.cart.push(course);
            state.total+=course.price
            // update in localXtorage
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to cart")
        },

        removeFromCart: (state,action)=>{
            const courseId=action.payload
            const index=state.cart.findIndex((item)=>item._id===courseId)
            // if element exists
            if(index>=0){
                state.totalItems--;
                state.total-=state.cart[index].price
                state.cart.splice(index,1)
                // update in localmstorage
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from cart")
                return;
            }
            // show toast
            toast.error("Course cannot be removed from cart")
        },
        resetCart:(state)=>{
            state.cart=[]
            state.total=0
            state.totalItems=0
            // update local storage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        },
    },
})

export const {addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;