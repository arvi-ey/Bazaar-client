import React, { useRef } from 'react'
import "./HomeProduct.css"
import HomeProductBox from './HomeProductBox'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { GetAllProducts } from '../../../Redux/Slice/productsSlicer'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const HomeProducts = () => {
    const boxref = useRef(null)
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)
    const [hideLeft, setHideLeft] = useState(true)
    const [hideRight, setHideRight] = useState(false)

    useEffect(() => {
        dispatch(GetAllProducts())
    }, [dispatch])

    const ScrollToNext = () => {
        const { scrollWidth, scrollLeft, clientWidth } = boxref.current
        if (scrollLeft == 0) {
            setHideLeft(true)
        }
        else {
            setHideLeft(false)
        }
        if (scrollLeft + clientWidth >= scrollWidth) {
            setHideRight(true)
        }
        else {
            setHideRight(false)
        }
    }
    useEffect(() => {
        boxref.current.addEventListener("scroll", ScrollToNext)
        return () => {
            document.removeEventListener("scroll", ScrollToNext);
        };
    }, [])

    const ScrollLeft = () => {
        const width = boxref.current.clientWidth
        console.log(boxref.current.scrollLeft)
        boxref.current.scrollLeft = boxref.current.scrollLeft - width
    }

    const ScrollRight = () => {
        const width = boxref.current.clientWidth
        boxref.current.scrollLeft = boxref.current.scrollLeft + width

    }


    return (
        <div style={{ marginTop: "20px", width: "100%", }}>
            <p className='recetViewText' >All Items</p>
            <div style={{ display: "flex", width: "100vw", justifyContent: "center" }} ></div>
            <div style={{ display: "flex", width: "100vw", justifyContent: "center" }} >
                <div style={{ height: "500px", width: "50px", display: "flex", justifyContent: "center", alignItems: "center", opacity: hideLeft ? "0.2" : "1" }}>
                    <ArrowBackIosNewIcon sx={{ cursor: "pointer", fontSize: "35px" }} onClick={ScrollLeft} />
                </div>
                <div className='RecentViewComp' ref={boxref}>
                    {
                        products && products.slice(0, 30).map((product, index) => <HomeProductBox products={product} />)
                    }
                </div>
                <div style={{ height: "500px", width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ArrowForwardIosIcon sx={{ cursor: "pointer", fontSize: "35px", opacity: hideRight ? "0.2" : "1" }} onClick={ScrollRight} />
                </div>
            </div>

        </div>
    )
}

export default HomeProducts