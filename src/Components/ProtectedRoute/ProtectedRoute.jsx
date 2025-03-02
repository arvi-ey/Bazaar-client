import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
// import AddUserId from "../../../Redux/Slice/authSlicer"
import useAuth from "../Hooks/useAuth";
const ProtectedRoute = () => {
    const { auth, loading } = useAuth()

    console.log("Inside protected route", auth)

    if (loading) {
        console.log(loading, "loading")
        return (
            < div > Loading...</div >
        )
    }
    console.log(loading, "loading222")
    console.log("✅ Authentication check complete. UserId:", auth);

    return auth ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
