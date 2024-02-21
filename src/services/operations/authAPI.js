import toast from "react-hot-toast";
import { setLoading, setToken } from "../../Redux/slices/authSlice";
import { apiConnector } from "../apiconnector";
import {endpoints} from "../apis"
import { setUser } from "../../Redux/slices/profileSlice";
import {resetCart} from "../../Redux/slices/cartSlice"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} =  endpoints

export function sendOtp (email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            })
            console.log("SENDOTP API RESPONSE........")
            console.log(response.data.success)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR.....")
            toast.error("Could not send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })

            console.log("SIGNUP API RESPONSE........")

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Succesful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR.........")
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })
            console.log("LOGIN API RESPONSE..........", response)
            if(!response.data.success){
               throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image ?
                        response.data.user.image :
                        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}%20${response.data.user.lastName}`
            dispatch(setUser({...response.data.user, image:userImage}))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify({...response.data.user, image:userImage}))
            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("LOGIN API ERROR.......", error)
            toast.error("Login failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            })
            console.log("RESETPASSTOKEN API RESPONSE........")
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch (error) {
            console.log("RESETPASSTOKEN ERROR........")
            toast.error("Failed To Send Reset Email")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            })
            console.log("RESTPASSWORD API RESPONSE...........")

            if(!response.data.success)  {
                throw new Error(response.data.message)
            }

            toast.success("Password Reset Successful")
            navigate("/login")
        } catch (error) {
            console.log("RESETPASSWORD ERROR........")
            toast.error("Failed To Reset Password")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}
