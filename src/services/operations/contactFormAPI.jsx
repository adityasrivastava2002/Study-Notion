import { apiConnector } from "../apiconnector"
import {contactusEndpoint} from "../apis"

export const submitContactForm = async(data) => {
    console.log("Logging data", data);
    try {
        const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
        console.log("Loggin response", response)
    } catch (error) {
        console.log(error.message)
    }
}