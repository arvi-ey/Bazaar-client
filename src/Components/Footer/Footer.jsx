import React from 'react'
import "./Footer.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter'
import Appstore from "../../assets/Appstore.svg"
import Playstore from "../../assets/Palystore.svg"

const Footer = () => {

    const iconColor = "white"
    const iconSize = "30px"

    const SocialMediaArray = [
        {
            title: "Instagram",
            icon: <InstagramIcon sx={{ color: iconColor, fontSize: iconSize }} />
        },
        {
            title: "Facebook",
            icon: <FacebookIcon sx={{ color: iconColor, fontSize: iconSize }} />
        },
        {
            title: "YouTube",
            icon: <YouTubeIcon sx={{ color: iconColor, fontSize: iconSize }} />
        },
        {
            title: "Twiter",
            icon: <TwitterIcon sx={{ color: iconColor, fontSize: iconSize }} />
        },
    ]

    return (
        <div className="footerContainer">
            <div className='FooterHeader'>
                <div className="div1">
                    <div className="div1title">
                        Get Bazzar in inbox
                    </div>
                    <div className="div1Inputbox">
                        <input
                            placeholder='Enter your email address'
                            className='div1Input'
                        />
                    </div>
                    <div className="socialBox">
                        {
                            SocialMediaArray.map((social, index) => {
                                return (
                                    <div className="socialIcon" style={{ border: index == SocialMediaArray.length - 1 && "none" }} >
                                        {social.icon}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="downLoadOptionDiv">
                        <img src={Playstore} className='downLoadIMage' />
                        <img src={Appstore} className='downLoadIMage' />
                    </div>
                </div>
                <div className="div2">
                    <p className='div2Title'>SHOP</p>
                    <div className='div2Contect'>
                        <p className='div2Text'>The Conrol Kit</p>
                        <p className='div2Text'>Cleansers & Removers</p>
                        <p className='div2Text'>Bonds & Sellers</p>
                        <p className='div2Text'>Gift Sets & Merch</p>
                    </div>
                </div>
                <div className="div2">
                    <p className='div2Title'>LEARN</p>
                    <div className='div2Contect'>
                        <p className='div2Text'>Book a 1:1</p>
                        <p className='div2Text'>Video Tutorial</p>
                        <p className='div2Text'>Live Streaming</p>
                        <p className='div2Text'>Help & FAQ</p>
                        <p className='div2Text'>Blog</p>
                    </div>
                </div>
                <div className="div2">
                    <p className='div2Title'>ABOUT</p>
                    <div className='div2Contect'>
                        <p className='div2Text'>About Bazaar</p>
                        <p className='div2Text'>Press</p>
                        <p className='div2Text'>Patents & IP</p>
                        <p className='div2Text'>Shipping & Return</p>
                        <p className='div2Text'>Contact us</p>
                    </div>
                </div>
            </div>
            <div className='LastDiv'>
                <p className='lastDivText'>2025, Bazaar, All rights reservs</p>
                <p className='lastDivText'>Privacy</p>
                <p className='lastDivText'>Terms</p>
            </div>
        </div>
    )
}

export default Footer