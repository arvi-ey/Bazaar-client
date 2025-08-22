import React from 'react'
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { URL } from '../../../config';
import { AddUserInfo } from '../../../Redux/Slice/authSlicer';
import { useNavigate } from 'react-router';

const useOAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const handleGoogleAuth = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                const userData = res.data;
                if (userData?.email) {
                    const payloadData = {
                        email: userData.email,
                        name: userData.name,
                        profile_image: userData.picture

                    }
                    const result = await axios.post(URL + `auth/googleauth`, payloadData, { withCredentials: true })
                    console.log(result)
                    if (result?.data.statusCode == 200 && result?.data?.user?._id) {
                        const data = result?.data?.user
                        dispatch(AddUserInfo({ userId: data._id, userType: data.userType }))
                        // dispatch(AddUser(data))
                        navigate("/")
                    }
                }

            } catch (error) {
                throw error
            }
        },
        onError: () => {
            throw error
        }
    });


    return { handleGoogleAuth }
}

export default useOAuth