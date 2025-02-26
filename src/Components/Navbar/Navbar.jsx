import React, { useState } from 'react'
import "./Navbar.css"
import Logo from "../../assets/Bazaarlogo.svg"
import DemoUser from "../../assets/user.jpg"
import Search from "../../assets/search.svg"
import { NavLink } from 'react-router-dom';
import UserProfile from '../../Common/Avatar'
import Cart from "../../Common/Cart"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
    const navigate = useNavigate()
    const [showLongNavbar, setShowLongNavbar] = useState(false)
    const navItemArray = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Products",
            path: "/products"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Help",
            path: "/help"
        }
    ]

    const GoToAccount = () => {
        navigate("user/account")
    }
    return (
        <div className="nav">
            <div className="logo">
                <img src={Logo} alt='Logo' className='imageLogo' />
            </div>
            <div className="navItems">
                {navItemArray.map((data, index) => {
                    return (
                        <NavLink key={index} to={data.path} className={({ isActive }) => (isActive ? 'activeNav' : 'navItem')}>
                            <p>
                                {data.name}
                            </p>
                            <div className='navLayer' />
                        </NavLink>
                    )
                })}
            </div>
            <div className='navInfo'>
                <div className='FavouriteIcon' onClick={() => navigate("/favourite")} >
                    <FavoriteBorderOutlinedIcon />
                </div>
                <div className='cart'>
                    <Cart
                        count={0}
                    />
                </div>
                <div className="AccountBox" onClick={GoToAccount} >
                    <UserProfile
                        image={DemoUser}
                        name={""}
                    />
                </div>
            </div>
            <div className="hamberger" onClick={() => setShowLongNavbar(true)}>
                <MenuOpenIcon className='menuIcon' />
            </div>
            {showLongNavbar &&
                <div className={`longNavbar ${showLongNavbar ? 'show' : ''}`}>
                    <div className="closeIcon">
                        <CloseIcon className='close' onClick={() => setShowLongNavbar(false)} />
                    </div>
                    <div className="ResponsivenavItems">
                        {navItemArray.map((data, index) => {
                            return (
                                <NavLink key={index} to={data.path} className={({ isActive }) => (isActive ? 'activeNav' : 'navItem')}>
                                    <p>
                                        {data.name}
                                    </p>
                                    <div className='navLayer' />
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default Navbar