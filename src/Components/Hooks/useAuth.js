import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { AddUserInfo } from "../../../Redux/Slice/authSlicer";

const useAuth = () => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (!userInfo) {
            checkAuth();
        }
        if (userInfo) {
            setAuth(userInfo)
            setLoading(false)
        }
    }, [dispatch, userInfo]);

    const checkAuth = async () => {
        try {
            const response = await axios.post(URL + `auth/checkauth`, {}, { withCredentials: true });
            if (response?.data?.id) {
                setAuth({ userId: response.data.id, name: response.data.name, email: response.data.email, userType: response.data.role });
                dispatch(AddUserInfo({ userId: response.data.id, userType: response.data.role }))
            } else {
                setAuth(null);
                dispatch(AddUserInfo(null))
            }
        } catch (error) {
            setAuth(null);
        } finally {
            setLoading(false);
        }
    };
    return { auth, loading };
};

export default useAuth;
