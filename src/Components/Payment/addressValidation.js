import * as Yup from 'yup';

export const AddressValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits and in number format'), // Example: 10-digit phone number

    city: Yup.string()
        .required('City is required'),

    state: Yup.string()
        .required('State is required'),
    street: Yup.string()
        .required("Street is equired"),
    houseNumber: Yup.string()
        .required('House number is required')
        .max(20, 'House number must be at most 20 characters'),

    landMark: Yup.string()
        .max(100, 'Landmark must be at most 100 characters'),
    addressType: Yup.string()
        .required("Address type is required"),

    pinCode: Yup.string()
        .required('Postal code is required')
        .matches(/^\d{6}$/, 'Postal code must be exactly 6 digits'),
});