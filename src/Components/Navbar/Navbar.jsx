import React from 'react'
import "./Navbar.css"
import Logo from "../../assets/Bazaarlogo.svg"
// import DemoUser from "../../assets/demo_user.jpg"
import DemoUser from "../../assets/user.svg"
import Search from "../../assets/search.svg"
import Cart from "../../assets/cart.svg"

const Navbar = () => {
    const navItemArray = ["Home", "Products", "Accounts", "Help"]
    return (
        <div className="nav">
            <div className="logo">
                <img src={Logo} alt='Logo' height={60} width={60} />
            </div>
            <div className="navItems">
                {navItemArray.map((data, index) => {
                    return (
                        <div className="navItem" key={index}>
                            <p>
                                {data}
                            </p>
                            <div className='navLayer' />
                        </div>
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
                <img src={Cart} alt='cart' className='cart' />
            </div>
            <div className="AccountBox" >
                <img src={DemoUser} alt='user' className='userImage' />
            </div>
        </div>
    )
}

export default Navbar