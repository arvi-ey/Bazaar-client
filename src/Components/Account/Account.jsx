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
import { AddUser, GetUserInfo, UpdateUser, UploadImage } from '../../../Redux/Slice/userSlicer';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CircularProgress from '@mui/material/CircularProgress';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';

const Account = () => {
    const navigate = useNavigate()
    const { user, uploadImageLoading } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { auth } = useAuth()
    const [editClicked, setEditClicked] = useState([])
    const [showresponsiveMenu, setShowresponsiveMenu] = useState(false)

    const handleFileChange = async (event) => {
        // console.log(event.target.files[0])
        const file = event.target.files[0];
        if (file) {
            const obj = { userId: user._id, file };
            await dispatch(UploadImage(obj))
        }
    };

    // const handleUploadClick = () => {
    //     if (!selectedFile) {
    //         alert("Please select a file first!");
    //         return;
    //     }

    //     // Here you can send the file to your server
    //     console.log("Uploading file:", selectedFile);
    //     // Add your API call here
    // };


    useEffect(() => {
        if (auth?.userId) dispatch(GetUserInfo(auth?.userId))
    }, [dispatch, auth])


    const color = '#ec0d75'



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
            icon: <Inventory2Icon sx={{ color, }} />
        },
        {
            title: "Favourite products",
            icon: <FavoriteBorderIcon sx={{ color, }} />
        },
        {
            title: "Payments",
            icon: <AccountBalanceWalletIcon sx={{ color, }} />
        },
        {
            title: "Gift card",
            icon: <CardGiftcardIcon sx={{ color, }} />
        },
        {
            title: "Privacy",
            icon: <ShieldIcon sx={{ color, }} />
        },
        {
            title: "Settings",
            icon: <SettingsIcon sx={{ color, }} />
        },
        {
            title: "Log out",
            icon: <LogoutIcon sx={{ color: "red", }} />
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
        dispatch(AddUser(null))
        if (response) {
            navigate('/signin')
        }
    }

    return (
        <div className="accountBox">
            <div className="accountinfo">
                <div className="accountImageBox">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", gap: "10px" }}>
                        <div className='userInfoDetail' >
                            {
                                uploadImageLoading ? <CircularProgress size={30} sx={{ color: '#ec0d75', }} /> :
                                    <div style={{ position: 'relative' }}>
                                        <img src={user?.profile_image} className='UserImage' />
                                        <div style={{ cursor: "pointer", right: 2, bottom: 2, height: "20px", width: "20px", position: "absolute", borderRadius: "10px", backgroundColor: "#ec0d75", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            onClick={() => {
                                                document.getElementById('image-upload').click();
                                            }}
                                        >
                                            <CameraAltIcon sx={{ color: "white", height: "10px", width: "10px", }} />
                                        </div>
                                    </div>
                            }

                        </div>
                        <input
                            type="file"
                            id="image-upload"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // Hide the default input
                        />
                        <p className='UserNameTitle' >{user?.name}</p>
                    </div>
                    <span className='OpenMenu' onClick={() => setShowresponsiveMenu(true)}><MenuOpenIcon /></span>
                </div>
                <div className="accountNav">
                    {NavigationArray.map((data, index) => {
                        return (
                            <div className="AccountnavInfo" onClick={() => HandleClick(data.title)}>
                                <span className="accountNavIcon">
                                    {data.icon}
                                </span>
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
            {showresponsiveMenu &&
                <div className='responsiveMenu' >
                    <span className='responsiveCloseIcon' onClick={() => setShowresponsiveMenu(false)} ><CloseIcon style={{ alignSelf: "center", opacity: "0.7" }} /></span>
                    {NavigationArray.map((data, index) => {
                        return (
                            <div className="AccountnavInfoResponsive" onClick={() => HandleClick(data.title)}>
                                <span className="accountNavIconResponsive">
                                    {data.icon}
                                </span>
                                <p className='AccountNavTextResponsive' style={{ color: index == NavigationArray.length - 1 ? "red" : "", opacity: index == NavigationArray.length - 1 ? "1" : "" }}>
                                    {data.title}
                                </p>
                            </div>
                        )
                    })}
                </div>
            }
        </div >
    )
}

export default Account