import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Slider from '../Slider/Slider'
import CategorySection from '../Categories/CategorySection'
import HomeProducts from '../HomeProducts/HomeProducts'
import "./Home.css"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Recentview from '../RecentlyViewed/Recentview'
import { getRecentView } from '../../../Redux/Slice/recentlyView'
const Home = () => {
    const navigate = useNavigate()






    const GotoProducts = () => {
        navigate("/products")
    }
    return (
        <>
            <Slider />
            <CategorySection />
            <HomeProducts />
            <div
                onClick={GotoProducts}
                style={{ width: "100%", marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <p className='viewAllProductsButton'>View all products</p>
            </div>
            <Recentview />
        </>
    )
}

export default Home