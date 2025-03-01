import React, { useState } from 'react'
import "./Account.css"
import user from "../../assets/user.jpg"
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ShieldIcon from '@mui/icons-material/Shield';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import { AuthvalidationSchema } from '../Authentication/authvalidation';
import { logOutUser } from "../../../Redux/Slice/authSlicer"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
const Account = () => {
    const navigate = useNavigate()
    const { loading, error } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const color = '#ec0d75'
    const height = "30px"
    const width = "30px"

    const [editClicked, setEditClicked] = useState([])


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone_number: '',
        },
        validationSchema: AuthvalidationSchema,
        onSubmit: (values, { resetForm }) => {
            console.log('Form Data:', values);
            resetForm();
        },
    });

    const NavigationArray = [
        {
            title: "My orders",
            icon: <Inventory2Icon sx={{ color, height, width }} />
        },
        {
            title: "Favourite products",
            icon: <FavoriteBorderIcon sx={{ color, height, width }} />
        },
        {
            title: "Payments",
            icon: <AccountBalanceWalletIcon sx={{ color, height, width }} />
        },
        {
            title: "Gift card",
            icon: <CardGiftcardIcon sx={{ color, height, width }} />
        },
        {
            title: "Privacy",
            icon: <ShieldIcon sx={{ color, height, width }} />
        },
        {
            title: "Settings",
            icon: <SettingsIcon sx={{ color, height, width }} />
        },
        {
            title: "Log out",
            icon: <LogoutIcon sx={{ color: "red", height, width }} />
        },
    ]


    const EditFieldArray = [
        {
            title: "name",
            label: "Name"
        },
        {
            title: "email",
            label: "Email Address"
        },
        {
            title: "phone_number",
            label: "Phone number"
        }
    ]

    const OnEditClick = (data) => {

        setEditClicked(prev => [...prev, data.title])
    }


    const OnCancelClick = (data) => {
        setEditClicked(prev => prev.filter(value => value !== data.title))
    }


    const HandleClick = (data) => {
        if (data == "Log out") Logout()
    }

    const Logout = async () => {
        const response = await dispatch(logOutUser())
        if (response) {
            navigate('/signin')
        }
    }
    return (
        <div className="accountBox">
            <div className="accountinfo">
                <div className="accountImageBox">
                    <img src={user} className='UserImage' />
                    <p className='AccountUserName'>Arman Tsarukyan</p>
                </div>
                <div className="accountNav">
                    {NavigationArray.map((data, index) => {
                        return (
                            <div className="AccountnavInfo" onClick={() => HandleClick(data.title)}>
                                <div className="accountNavIcon">
                                    {data.icon}
                                </div>
                                <p className='AccountNavText' style={{ color: index == NavigationArray.length - 1 ? "red" : "", opacity: index == NavigationArray.length - 1 ? "1" : "" }}>
                                    {data.title}
                                </p>
                            </div>
                        )
                    })}
                </div>

            </div>
            <div className="accountDetails">
                <p className='accountDetailsTitle'>Personal Information</p>
                <div className="accountEditDetails">
                    {
                        EditFieldArray.map((data, index) => {
                            return (
                                <div>
                                    <div className='accountEditDetailsTitleBox' >
                                        <p className='accountEditDetailsTitle'>{data.label}</p>
                                        {
                                            editClicked.includes(data.title) ?
                                                <p className='accountEditDetailEdit' onClick={() => OnCancelClick(data)} >Cancel</p>
                                                :
                                                <p className='accountEditDetailEdit' onClick={() => OnEditClick(data)} >Edit</p>
                                        }
                                    </div>
                                    <div className='inPutSection'>
                                        <TextField
                                            id={data.title}
                                            variant="outlined"
                                            className="InputField"
                                            value={formik.values[data.title]}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched[data.title] && Boolean(formik.errors[data.title])}
                                            helperText={formik.touched[data.title] && formik.errors[data.title]}
                                        />
                                        {
                                            editClicked.includes(data.title) ?

                                                <div className='SaveButton' >
                                                    Save
                                                </div>
                                                : null
                                        }
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Account