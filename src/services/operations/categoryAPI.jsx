import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogData } from "../apis"

export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const res = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, categoryId);
        if(!res?.data?.success) {
            throw new Error("Could not fetch catgory data")
        }
        console.log("CATALOG PAGE DATA API FETCHED...........",res)
        result = res?.data
    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR...........",error)
        toast.error(error.message)
        result = error.res?.data
    }
    toast.dismiss(toastId)
    return result
}