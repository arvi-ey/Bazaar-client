import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
// import { AddUserId } from "../../../Redux/Slice/authSlicer"

const useAuth = () => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(URL + "auth/checkauth", { withCredentials: true });

                if (response.data && response.data.id) {
                    setAuth({ userId: response.data.id, userType: response.data.role });
                } else {
                    setAuth(null);
                }
            } catch (error) {
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { auth, loading };
};

export default useAuth;
