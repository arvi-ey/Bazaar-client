import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
// import AddUserId from "../../../Redux/Slice/authSlicer"
import useAuth from "../Hooks/useAuth";
const ProtectedRoute = () => {
    const { auth, loading } = useAuth()


    if (loading) {
        return <div>Loading...</div>;
    }

    return auth ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
