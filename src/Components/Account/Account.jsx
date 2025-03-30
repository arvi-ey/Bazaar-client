import React, { useEffect, useState } from 'react'
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
import { logOutUser, AddUserInfo } from "../../../Redux/Slice/authSlicer"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import useAuth from '../Hooks/useAuth';
import { GetUserInfo, UpdateUser } from '../../../Redux/Slice/userSlicer';
const Account = () => {
    const navigate = useNavigate()
    const { loading, error } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { auth } = useAuth()
    const [editClicked, setEditClicked] = useState([])


    useEffect(() => {
        if (auth?.userId) dispatch(GetUserInfo(auth?.userId))
    }, [dispatch, auth])


    const color = '#ec0d75'
    const height = "30px"
    const width = "30px"



    const formik = useFormik({
        initialValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone_number: user?.phone_number || " ",
        },
        validationSchema: AuthvalidationSchema,
        enableReinitialize: true,
        validateOnChange: true,
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
        if (data == "My orders") navigate("/user/orders")
        if (data == "Log out") Logout()
    }


    const HandleEditUserInfo = async (value) => {
        await dispatch(UpdateUser({ userId: user?._id, obj: value }))
        setEditClicked((prev) => prev.filter(data => data != Object.keys(value)[0]))

    }

    const Logout = async () => {
        if (!auth) return
        const response = await dispatch(logOutUser())
        dispatch(AddUserInfo(null))
        if (response) {
            navigate('/signin')
        }
    }


    useEffect(() => {
        console.log(editClicked, "KKKKK")
    }, [editClicked])

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
                                            editClicked?.length > 0 && editClicked.includes(data.title) ?
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
                                            disabled={!editClicked?.includes(data.title)}
                                            error={formik.touched[data.title] && Boolean(formik.errors[data.title])}
                                            helperText={formik.touched[data.title] && formik.errors[data.title]}
                                        />
                                        {
                                            editClicked?.length > 0 && editClicked?.includes(data.title) ?

                                                <div className='SaveButton' onClick={() => HandleEditUserInfo({ [data.title]: formik.values[data.title] })} >
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