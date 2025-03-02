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
        const checkAuth = async () => {
            try {
                setLoading(true)
                const response = await axios.post(URL + `auth/checkauth`, {}, { withCredentials: true });
                if (response?.data?.id) {
                    setAuth({ userId: response.data.id, userType: response.data.role });
                    dispatch(AddUserInfo({ userId: response.data.id, userType: response.data.role }))
                    setLoading(false);
                } else {
                    setAuth(null);
                    dispatch(AddUserInfo(null))
                    setLoading(false);
                }
            } catch (error) {
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };
        if (!userInfo) {
            checkAuth();
        }
        if (userInfo) {
            setAuth(userInfo)
            setLoading(false)
        }
    }, [dispatch, userInfo]);
    return { auth, loading };
};

export default useAuth;
