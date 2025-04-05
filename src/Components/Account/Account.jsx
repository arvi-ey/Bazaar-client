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
import { GetUserInfo, UpdateUser, UploadImage } from '../../../Redux/Slice/userSlicer';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CircularProgress from '@mui/material/CircularProgress';

const Account = () => {
    const navigate = useNavigate()
    const { loading, error } = useSelector(state => state.auth)
    const { user, uploadImageLoading } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { auth } = useAuth()
    const [editClicked, setEditClicked] = useState([])

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = async (event) => {
        // console.log(event.target.files[0])
        const file = event.target.files[0];
        if (file) {
            const obj = { userId: user._id, file };
            await dispatch(UploadImage(obj))
        }
    };

    const handleUploadClick = () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        // Here you can send the file to your server
        console.log("Uploading file:", selectedFile);
        // Add your API call here
    };


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
        console.log("uploadImageLoading", uploadImageLoading)
    }, [uploadImageLoading])

    return (
        <div className="accountBox">
            <div className="accountinfo">
                <div className="accountImageBox">
                    <div style={{ position: "relative", width: "30%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        {
                            uploadImageLoading ? <CircularProgress size={30} sx={{ color: '#ec0d75', }} /> :
                                <>
                                    <img src={user?.profile_image} className='UserImage' />
                                    <div style={{ cursor: "pointer", right: 20, bottom: 10, height: "20px", width: "20px", position: "absolute", borderRadius: "10px", backgroundColor: "#ec0d75", display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        onClick={() => {
                                            document.getElementById('image-upload').click();
                                        }}
                                    >
                                        <CameraAltIcon sx={{ color: "white", height: "10px", width: "10px", }} />
                                    </div>
                                </>
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
                    {/* <div
                        style={{ backgroundColor: "red", padding: "5px", cursor: "pointer" }}
                        onClick={() => {
                            document.getElementById('image-upload').click();
                        }}
                    >
                        Upload Image
                    </div> */}
                    <p style={{ fontSize: "2vmax", fontWeight: "500", opacity: "0.8" }} >{user?.name}</p>
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