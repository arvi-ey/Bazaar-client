import React, { useState, useEffect } from 'react'
import "./Auth.css"
import { useFormik } from 'formik';
import { AuthvalidationSignin } from './authvalidation';
import TextField from '@mui/material/TextField';
import Google from "../../assets/google.svg"
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { signinUser, AddUserInfo } from '../../../Redux/Slice/authSlicer';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router';

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.auth)
    const location = useLocation();
    const productId = location.state?.productId;
    const [errorText, setErrorText] = useState()

    const formik = useFormik({
        initialValues: {
            email: 'tuhinroyand@gmail.com',
            password: 'Tuhin@1234',
        },
        validationSchema: AuthvalidationSignin,
        onSubmit: (values, { resetForm }) => {
        },
    });

    const HandleSignIN = async () => {
        const signinObj = formik.values
        formik.handleSubmit()
        const errors = await formik.validateForm()
        if (!formik.isValid || Object.keys(errors).length > 0) {
            return;
        }
        const response = await dispatch(signinUser(signinObj))
        if (response.payload) {
            if (response.payload._id) {
                dispatch(AddUserInfo({ userId: response.payload._id, userType: response.payload.userType }))
                if (productId) navigate(`/product/${productId}`)
                else navigate("/")
            }
            if (response.payload.user === false) {
                setErrorText(response.payload.message)
                return
            }
        }
    }

    return (
        <div className="signINContainer">
            <div className="AuthBoxSignIn">
                <p className='Authtext' >Sign In</p>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    className="InputField"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    className="InputField"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                {
                    errorText &&
                    <p className='ErrrorText'>{errorText}</p>
                }
                {
                    loading ?
                        <CircularProgress sx={{ color: "#ec0d75" }} /> :

                        <div className="authButton" onClick={HandleSignIN}>
                            <p style={{ fontSize: "25px" }}>
                                Sign In
                            </p>
                        </div>
                }

                <div className="childAuthText">
                    <p>Don't have an account ?</p>
                    <p onClick={() => navigate("/signup")} > Sign up</p>
                </div>
                <div className="otherOptions">
                    <img src={Google} style={{ height: "4vmin", width: "4vmin" }} />
                    <p>Sign In with google</p>
                </div>


            </div>
        </div>
    )
}

export default Signin