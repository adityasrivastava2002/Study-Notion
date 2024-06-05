import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../Redux/slices/profileSlice";

const { profileEndpoints } = require("../apis");

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API} = profileEndpoints

// export function getUserDetails (token) {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...")
//         try {
//             const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
//                 Authorization: `Bearer ${token}`
//             })
//             console.log("GET USER DETAILS API RESPONSE", response)
//             if(!response.data.success) {
//                 throw new Error(response.data.message)
//             }
//             // dispatch(setUser(response.data.))
//         } catch (error) {
            
//         }
//     }
// }

export async function getUserEnrolledCourses (token) {
    const toastId = toast.loading("Loading...")
    let result=[]
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })
        console.log("GET USER ENROLLED COURSES API RESPONSE", response)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch (error) {
        console.log("GET USER ENROLLED COURSES API FAILED", error)
        toast.error("Failed to Fetch Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(token) {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_INSTRUCTOR_API_RESPONSE", response);
        result = response?.data?.courses
    } catch (error) {
        console.log("GET_INSTRUCTOR_DATA_APII error",error);
        toast.error("Could not fetch instructor data")
    }
    toast.dismiss(toastId);
    return result;
}