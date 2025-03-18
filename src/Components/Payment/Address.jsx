import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { AddressValidationSchema } from './addressValidation';

const Address = () => {
    const formik = useFormik({
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
    });

    const HandleBlur = (value) => {
        formik.setFieldTouched(value, true);
        formik.validateField(value); // Validate only the field that lost focus
    };

    const AddressTypeArray = ["HOME", "OFFICE", "OTHER"];

    const HandleAddressType = (data) => {
        formik.setFieldValue("addressType", data);
    };

    const HandleSaveAddress = async () => {
        const errors = await formik.validateForm()
        if (Object.keys(errors).length > 0) {

            Object.keys(errors).forEach(field => {
                console.log(field);
                formik.setFieldTouched(field, true);
            });

            // Set formik errors
            formik.setErrors(errors);
            return
        }
        console.log(formik.values);
    }
    return (
        <div className="addressComponent">
            <p style={{ fontSize: "1.5vmax" }}>Delivery Address</p>
            <TextField
                required
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                label="Name"
                variant="outlined"
                onBlur={() => HandleBlur("name")}
                error={formik.touched.name && (formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
                required
                id="phone"
                value={formik.values.phone}
                label="Phone Number"
                onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                    formik.setFieldValue('phone', numericValue);
                }}
                variant="outlined"
                inputMode='numeric'
                onBlur={() => HandleBlur("phone")}
                error={formik.touched.phone && (formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
            />
            <div style={{ display: "flex", gap: "1em", width: "100%" }}>
                <TextField
                    required
                    id="state"
                    sx={{ width: "50%" }}
                    value={formik.values.state}
                    label="State"
                    onChange={formik.handleChange}
                    variant="outlined"
                    onBlur={() => HandleBlur("state")}
                    error={formik.touched.state && (formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                />
                <TextField
                    required
                    sx={{ width: "50%" }}
                    id="city"
                    value={formik.values.city}
                    label="City"
                    onChange={formik.handleChange}
                    variant="outlined"
                    onBlur={() => HandleBlur("city")}
                    error={formik.touched.city && (formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
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
                error={formik.touched.street && (formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
            />
            <div style={{ display: "flex", gap: "1em", width: "100%" }}>
                <TextField
                    required
                    sx={{ width: "50%" }}
                    id="pinCode"
                    value={formik.values.pinCode}
                    label="Pin Code"
                    onChange={formik.handleChange}
                    inputMode='numeric'
                    variant="outlined"
                    onBlur={() => HandleBlur("pinCode")}
                    error={formik.touched.pinCode && (formik.errors.pinCode)}
                    helperText={formik.touched.pinCode && formik.errors.pinCode}
                />
                <TextField
                    required
                    sx={{ width: "50%" }}
                    id="houseNumber"
                    value={formik.values.houseNumber}
                    label="House number"
                    onChange={formik.handleChange}
                    variant="outlined"
                    onBlur={() => HandleBlur("houseNumber")}
                    error={formik.touched.houseNumber && (formik.errors.houseNumber)}
                    helperText={formik.touched.houseNumber && formik.errors.houseNumber}
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
                <p style={{ fontSize: "1vmax" }}>Select Address Type</p>
                <div style={{ display: "flex", gap: "1em", marginTop: "5px" }}>
                    {AddressTypeArray.map((data, index) => (
                        <div
                            onClick={() => HandleAddressType(data)}
                            key={index}
                            style={{
                                borderRadius: "5px",
                                padding: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                border: formik.values.addressType === data ? "1px solid #ecacca" : "1px solid rgba(24, 23, 23, 0.249)",
                                backgroundColor: formik.values.addressType === data ? "#ecacca" : "white",
                            }}
                        >
                            <p>{data}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div
                onClick={HandleSaveAddress}
                style={{
                    width: "50vmin",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#ec0d75",
                    borderRadius: "5px",
                }}
            >
                <p style={{ color: "white", fontWeight: "500", cursor: "pointer", fontSize: "1.3vmax" }}>Save Address</p>
            </div>
        </div>
    );
};

export default Address;