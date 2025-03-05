import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../Hooks/useAuth";
import CircularProgress from '@mui/material/CircularProgress';
const ProtectedRoute = () => {
    const { auth, loading } = useAuth()

    if (loading) {
        return (
            <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <CircularProgress size="5rem" />
            </div>
        )
    }

    return auth ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
