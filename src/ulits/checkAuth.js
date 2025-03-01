import axios from "axios";
import { URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";


export const CheckAuth = async () => {
    try {
        const response = await axios.post(URL + `auth/checkauth`, {}, { withCredentials: true });
        if (response?.data?.id) {
            return response.data;
        }
        if (response.data.user === false) return response.data
    } catch (error) {
        return error.response?.data;
    }
}
