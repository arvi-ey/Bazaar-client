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
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.recentView)


    useEffect(() => {
        dispatch(getRecentView())
    }, [dispatch])

    const GotoProducts = () => {
        navigate("/products")
    }
    return (
        <>
            <Slider />
            <CategorySection />
            <HomeProducts />
            {items && items.length > 0 ?
                <Recentview recentViewItems={items} />
                : null
            }
            <div
                onClick={GotoProducts}
                style={{ width: "100%", marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center" }} >
                <p className='viewAllProductsButton'>View all products</p>
            </div>
        </>
    )
}

export default Home