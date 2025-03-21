import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { AddressValidationSchema } from './addressValidation';
import { AddAddress } from '../../../Redux/Slice/addressSlicer';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../Hooks/useAuth';
import Button from "@mui/material/Button";
const Address = ({ enableCheckout, setEnableCheckout }) => {
    const dispatch = useDispatch()
    const { auth } = useAuth()
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
        formik.validateField(value);
    };

    const AddressTypeArray = ["HOME", "OFFICE", "OTHER"];

    const HandleAddressType = (data) => {
        if (enableCheckout) return
        formik.setFieldValue("addressType", data);
    };

    const HandleSaveAddress = async () => {
        const errors = await formik.validateForm()
        if (Object.keys(errors).length > 0) {

            Object.keys(errors).forEach(field => {
                console.log(field);
                formik.setFieldTouched(field, true);
            });
            formik.setErrors(errors);
            return
        }
        const AddresData = {
            ...formik.values,
            userId: auth.userId
        }
        const resData = await dispatch(AddAddress(AddresData))
        if (resData && resData?.payload?._id) {
            setEnableCheckout(true)

        }
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
                disabled={enableCheckout}
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
                disabled={enableCheckout}
                error={formik.touched.phone && (formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
            />
            <div style={{ display: "flex", gap: "1em", width: "100%" }}>
                <TextField
                    required
                    id="state"
                    sx={{ width: "50%" }}
                    value={formik.values.state}
                    disabled={enableCheckout}
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
                    disabled={enableCheckout}
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
                disabled={enableCheckout}
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
                    disabled={enableCheckout}
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
                    disabled={enableCheckout}
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
                disabled={enableCheckout}
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
                                cursor: enableCheckout ? "auto" : "pointer",
                                border: formik.values.addressType === data ? "1px solid #ecacca" : "1px solid rgba(24, 23, 23, 0.249)",
                                backgroundColor: formik.values.addressType === data ? "#ecacca" : "white",
                            }}
                        >
                            <p>{data}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Button
                onClick={HandleSaveAddress}
                disabled={enableCheckout}
                variant="contained"
                sx={{
                    width: "50vmin",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#ec0d75",
                    borderRadius: "5px",
                    fontWeight: "500",
                    fontSize: "1.3vmax",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#c00b60",
                    },
                }}
            >
                Save Address
            </Button>
        </div>
    );
};

export default Address;