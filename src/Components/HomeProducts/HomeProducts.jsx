import React, { useRef } from 'react'
import "./HomeProduct.css"
import HomeProductBox from './HomeProductBox'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { GetAllProducts, GetHomeProducts } from '../../../Redux/Slice/productsSlicer'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const HomeProducts = () => {
    const boxref = useRef(null)
    const dispatch = useDispatch()
    const { homeProducts, loading } = useSelector(state => state.product)
    const [hideLeft, setHideLeft] = useState(true)
    const [hideRight, setHideRight] = useState(false)

    useEffect(() => {
        dispatch(GetHomeProducts(20))
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

    const LoaderAray = [1, 2, 3, 4, 5, 6]

    if (loading) {
        return (
            <div style={{ marginTop: "20px", width: "100%", }}>
                <p className='recetViewText' >All Items</p>
                <div style={{ display: "flex", width: "100vw", justifyContent: "center" }} ></div>
                <div style={{ display: "flex", width: "100vw", justifyContent: "center" }} >
                    <div className='RecentViewComp' ref={boxref}>
                        {
                            LoaderAray.map((data, index) => {
                                return (
                                    <Stack style={{ display: "flex", flexDirection: "column" }} >
                                        <Skeleton variant="rounded" width={350} height={470} />
                                        <Skeleton variant='text' width={350} height={50} />
                                    </Stack>
                                )
                            })

                        }
                    </div>
                </div>

            </div>
        )
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
                        !homeProducts && [...Array(4)].map((data, index) => {
                            return (
                                <Stack style={{ display: "flex", flexDirection: "column" }} >
                                    <Skeleton variant="rounded" width={350} height={470} />
                                    <Skeleton variant='text' width={350} height={50} />
                                </Stack>
                            )
                        })

                    }
                    {
                        homeProducts && homeProducts.slice(0, 30).map((product, index) => <HomeProductBox products={product} />)
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