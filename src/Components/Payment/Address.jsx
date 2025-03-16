import React from 'react'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField';
import { AddressValidationSchema } from './addressValidation';

const Address = () => {

    const formik = useFormik(
        {
            initialValues: {
                name: "",
                phone: "",
                state: "",
                city: "",
                pinCode: "",
                street: "",
                houseNumber: "",
                landMark: "",
                addressType: "HOME"
            },
            validationSchema: AddressValidationSchema,
            validateOnBlur: true,
            validateOnChange: true,
            enableReinitialize: true
        }
    )

    const HandleBlur = (value) => {
        formik.setFieldTouched(value, true);
        formik.validateField(value);
    }

    const AddressTypeArray = ["HOME", "OFFICE", "OTHER"]

    const HandleAddressType = (data) => {
        formik.setFieldValue("addressType", data)
    }

    const HandleSaveAddress = async () => {
        const errors = await formik.validateForm()
        console.log(errors)
    }

    const HandleInputChnage = (e) => {
        formik.setFieldValue(e.target.name, e.target.value)

    }


    return (
        <div className="addressComponent">
            <p style={{ fontSize: "2vmax", }}>Delivery Address</p>
            <TextField
                required
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                label="Name"
                variant="outlined"
                onBlur={() => HandleBlur("name")}
                error={formik.errors.name || formik.errors.name}
                helperText={formik.errors.name}
            />
            <TextField
                required
                id="phone"
                value={formik.values.phone}
                label="Phone Number"
                onChange={formik.handleChange}
                variant="outlined"
                inputMode='numeric'
                onBlur={() => HandleBlur("phone")}
                error={formik.errors.phone || formik.touched.phone}
                helperText={formik.errors.phone}
            />
            <div style={{ display: "flex", gap: "1em", width: "100%" }}>
                <TextField
                    required
                    id="state"
                    sx={{
                        width: "50%"
                    }}
                    value={formik.values.state}
                    label="State"
                    onChange={formik.handleChange}
                    variant="outlined"
                    onBlur={() => HandleBlur("state")}
                    error={formik.errors.state || formik.touched.state}
                    helperText={formik.errors.state}
                />

                <TextField
                    required
                    sx={{
                        width: "50%"
                    }}
                    id="city"
                    value={formik.values.city}
                    label="City"
                    onChange={formik.handleChange}
                    variant="outlined"
                    onBlur={() => HandleBlur("city")}
                    error={formik.errors.city || formik.touched.city}
                    helperText={formik.errors.city}
                />
            </div>
            <TextField
                required
                id="street"
                value={formik.values.street}
                label="Street"
                onChange={formik.handleChange}
                variant="outlined"
                onBlur={() => HandleBlur("street")}
                error={formik.errors.street || formik.touched.street}
                helperText={formik.errors.street}
            />
            <div style={{ display: "flex", gap: "1em", width: "100%" }}>

                <TextField
                    required
                    sx={{
                        width: "50%"
                    }}
                    id="pinCode"
                    value={formik.values.pinCode}
                    label="Pin Code"
                    onChange={formik.handleChange}
                    inputMode='numeric'
                    variant="outlined"
                    onBlur={() => HandleBlur("pinCode")}
                    error={formik.errors.pinCode || formik.touched.pinCode}
                    helperText={formik.errors.pinCode}
                />
                <TextField
                    required
                    sx={{
                        width: "50%"
                    }}
                    id="houseNumber"
                    value={formik.values.houseNumber}
                    label="House number"
                    onChange={formik.handleChange}
                    variant="outlined"
                    onBlur={() => HandleBlur("houseNumber")}
                    error={formik.errors.houseNumber || formik.touched.houseNumber}
                    helperText={formik.errors.houseNumber}
                />
            </div>
            <TextField
                id="landMark"
                value={formik.values.landMark}
                label="Landmark"
                onChange={formik.handleChange}
                variant="outlined"
                onBlur={() => HandleBlur("landMark")}
                helperText="Enter landmark for better search"
            />
            <div>
                <p style={{ fontSize: "1vmax", }}>Select Address Type</p>
                <div style={{ display: "flex", gap: "1em", marginTop: "5px" }} >
                    {
                        AddressTypeArray.map((data, index) => {
                            return (
                                <div onClick={() => HandleAddressType(data)} key={index} style={{ borderRadius: "5px", display: "flex", padding: "8px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", border: formik.values.addressType == data ? "1px solid red" : "1px solid black", backgroundColor: formik.values.addressType == data ? "#ecacca" : "white", }} >
                                    <p>{data}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div onClick={HandleSaveAddress} style={{ width: "50vmin", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", backgroundColor: "#ec0d75", borderRadius: "5px" }} >
                <p style={{ color: "white", fontWeight: "500", cursor: "pointer", fontSize: "1.3vmax" }}>Save Address</p>
            </div>
        </div >

    )
}

export default Address