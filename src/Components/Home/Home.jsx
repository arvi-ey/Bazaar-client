import React from 'react'
import Navbar from '../Navbar/Navbar'
import Slider from '../Slider/Slider'
import CategorySection from '../Categories/CategorySection'
import HomeProducts from '../HomeProducts/HomeProducts'
import "./Home.css"

const Home = () => {
    return (
        <>
            <Slider />
            <CategorySection />
            <HomeProducts />
            <div style={{ width: "100%", marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <p className='viewAllProductsButton'>View all products</p>
            </div>
        </>
    )
}

export default Home