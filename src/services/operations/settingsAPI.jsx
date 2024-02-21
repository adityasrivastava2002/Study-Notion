import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from "../apis"
import {setLoading} from "../../Redux/slices/profileSlice"
import {setUser} from "../../Redux/slices/profileSlice"
import { logout } from "./authAPI"

const {
    DELETE_PROFILE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    UPDATE_DISPLAY_PICTURE_API,
} = settingsEndpoints

export function updateAdditionalDetails(token, dateOfBirth, about, contactNumber, gender) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            // console.log(token)
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
                dateOfBirth,
                about,
                contactNumber,
                gender,
            },
            {
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE USERDETAILS API RESPONSE...........", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            const userImage = response?.data?.userDetails?.image ?
                        response.data.userDetails.image :
                        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetails.firstName}%20${response.data.userDetails.lastName}`
            dispatch(setUser({...response.data.userDetails, additionalDetails:response.data.profileDetails, image:userImage}))
            toast.success("User Details Updated")
        } catch (error) {
            console.log("UPDATE USERDETAILS ERROR.........")
            toast.error("Failed to Update User Details")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function updateProfilePicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData,{
                "Content-Type": "multitype/form-data",
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE PROFILE API RESPONSE......", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setUser(response.data.data))
            toast.success("Profile Photo Updated Successfully")
        } catch (error) {
            console.log("PROFILE UPDATE FAILED API RESPONSE", error)
            toast.error("Could Not Update Profile Picture")
        }
        toast.dismiss(toastId)
    }
}

export function deleteProfile(token, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null,{
                Authorization: `Bearer ${token}`
            })
            console.log("DELETE PROFILE RESPONSE API..........",response)
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Account Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("FAILED DELETING ACCOUNT API RESPONSE........")
            toast.error("Account Cannot be Deleted")
        }
        toast.dismiss(toastId)
    }
}

export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
  }