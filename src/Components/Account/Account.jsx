import React from 'react'
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
const Account = () => {

    const color = '#ec0d75'
    const height = "30px"
    const width = "30px"


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
                            <div className="AccountnavInfo">
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

            </div>
        </div >
    )
}

export default Account