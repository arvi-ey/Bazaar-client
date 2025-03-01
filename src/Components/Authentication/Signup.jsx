import React, { useEffect, useState } from 'react'
import "./Auth.css"
import { useFormik } from 'formik';
import { AuthvalidationSchema } from './authvalidation';
import TextField from '@mui/material/TextField';
import Google from "../../assets/google.svg"
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { signinUser, signupUser } from '../../../Redux/Slice/authSlicer';
import SnackbarComponent from '../../Common/Snackbar';
import { useNavigate } from 'react-router';
const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.auth)
    const [errorText, setErrorText] = useState()
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [snackBarMessage, setSnackbarMessage] = useState("")


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone_number: '',
        },
        validationSchema: AuthvalidationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('Form Data:', values);
        },
    });

    useEffect(() => {
        if (openSnackBar) {
            const timer = setTimeout(() => setOpenSnackBar(false), 500);
            return () => clearTimeout(timer);
        }
    }, [openSnackBar]);

    const HandleSignUp = async () => {
        setErrorText("")
        setSnackbarMessage("")
        const signUpObj = {
            name: formik.values.name,
            email: formik.values.email,
            password: formik.values.password,
            phone_number: formik.values.phone_number
        }
        const data = await dispatch(signupUser(signUpObj))
        if (data.payload) {
            setOpenSnackBar(true)
            if (data.payload.user == false) {
                setErrorText(data.payload.message)
                setSnackbarMessage("Sign up failed")
                return
            }
            if (data.payload._id) {
                setSnackbarMessage("Sign up successfull")
                setTimeout(() => {
                    navigate("/signin")
                }, 1000)
            }
        }
    }

    return (
        <div className="signUpContainer">
            <div className="AuthBox">
                <p className='Authtext' >Sign Up</p>

                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    className="InputField"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
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
                    id="phone_number"
                    label="Phone"
                    variant="outlined"
                    className="InputField"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                    helperText={formik.touched.phone_number && formik.errors.phone_number}
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
                <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    className="InputField"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                {
                    errorText &&
                    <p className='ErrrorText'>{errorText}</p>
                }
                {
                    loading ?
                        <CircularProgress sx={{ color: "#ec0d75" }} /> :

                        <div className="authButton" onClick={HandleSignUp}>
                            <p style={{ fontSize: "25px" }}>
                                Sign UP
                            </p>
                        </div>
                }
                <div className="childAuthText">
                    <p>Alrady have an account ?</p>
                    <p onClick={() => navigate("/signin")}>Go to login</p>
                </div>
                <div className="otherOptions">
                    <img src={Google} style={{ height: "2em", width: "2em" }} />
                    <p>Sign Up with google</p>
                </div>


            </div>
            {
                <SnackbarComponent bgColor="#9ee721" severity={snackBarMessage == "Sign up failed" ? "error" : 'success'} isOpen={openSnackBar} message={snackBarMessage} />
            }
        </div>
    )
}

export default Signup
