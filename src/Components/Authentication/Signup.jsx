import React from 'react'
import "./Auth.css"
import { useFormik } from 'formik';
import { AuthvalidationSchema } from './authvalidation';
import TextField from '@mui/material/TextField';
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
            <div className="signUpbox">
                <p className='Authtext' >Sign UP</p>

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

            </div>
        </div>
    )
}

export default Signup
