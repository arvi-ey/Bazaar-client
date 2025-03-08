import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../../ScrolltoTop';
import Footer from '../Footer/Footer';
const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout