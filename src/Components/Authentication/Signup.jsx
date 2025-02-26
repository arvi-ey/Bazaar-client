import React from 'react'
import "./Auth.css"
import { useFormik } from 'formik';
import { AuthvalidationSchema } from './authvalidation';
import TextField from '@mui/material/TextField';
import Google from "../../assets/google.svg"
const Signup = () => {


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
            resetForm();
        },
    });

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
                <div className="authButton">
                    <p style={{ fontSize: "25px" }}>
                        Sign UP
                    </p>
                </div>
                <div className="childAuthText">
                    <p>Alrady have an account ?</p>
                    <p>Go to login</p>
                </div>
                <div className="otherOptions">
                    <img src={Google} style={{ height: "2em", width: "2em" }} />
                    <p>Sign Up with google</p>
                </div>


            </div>
        </div>
    )
}

export default Signup
