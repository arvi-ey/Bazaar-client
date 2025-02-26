import React from 'react'
import "./Auth.css"
import { useFormik } from 'formik';
import { AuthvalidationSchema } from './authvalidation';
import TextField from '@mui/material/TextField';
import Google from "../../assets/google.svg"
import { useLocation } from 'react-router';

const Signin = () => {
    const location = useLocation();
    const productId = location.state?.productId;

    console.log(productId)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: AuthvalidationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('Form Data:', values);
            resetForm();
        },
    });

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
                <div className="authButton">
                    <p style={{ fontSize: "25px" }}>
                        Sign In
                    </p>
                </div>
                <div className="childAuthText">
                    <p>Don't have an account ?</p>
                    <p>Sign up</p>
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