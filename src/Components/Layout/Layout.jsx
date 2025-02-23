import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../ScrolltoTop';
const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>

        </>
    )
}

export default Layout