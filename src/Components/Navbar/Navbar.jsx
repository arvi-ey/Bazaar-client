import React from 'react'
import "./Navbar.css"
import Logo from "../../assets/Bazaarlogo.svg"
import DemoUser from "../../assets/user.jpg"
import Search from "../../assets/search.svg"
import { NavLink } from 'react-router-dom';
import UserProfile from '../../Common/Avatar'
import Cart from "../../Common/Cart"

const Navbar = () => {
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
    return (
        <div className="nav">
            <div className="logo">
                <img src={Logo} alt='Logo' height={60} width={60} />
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
            <div className='searchBox'>
                <div className="search">
                    <input
                        className='searchBar'
                        placeholder='Search products...'
                    />
                    <img src={Search} alt='seachbar' className='SearchIcon' />
                </div>

            </div>
            <div className='CartBox'>
                <Cart
                    count={0}
                />
            </div>
            <div className="AccountBox" >
                <UserProfile
                    image={DemoUser}
                    name={""}
                />
            </div>
        </div>
    )
}

export default Navbar