import React from 'react'
import "./Recentview.css"
import Recentviewbox from './Recentviewbox'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecentView } from '../../../Redux/Slice/recentlyView';

const Recentview = ({ recentViewItems }) => {
    const boxref = useRef(null)
    const { items } = useSelector(state => state.recentView)
    const dispatch = useDispatch()
    const [hideLeft, setHideLeft] = useState(true)
    const [hideRight, setHideRight] = useState(false)


    useEffect(() => {
        dispatch(getRecentView())
    }, [dispatch])

    const ScrollToNext = () => {
        const { scrollWidth, scrollLeft, clientWidth } = boxref.current
        if (scrollLeft == 0) {
            setHideLeft(true)
        }
        else {
            setHideLeft(false)
        }
        if (scrollLeft + clientWidth + 1 >= scrollWidth) {
            setHideRight(true)
        }
        else {
            setHideRight(false)
        }

    }


    useEffect(() => {
        if (items && items.length > 0) {

            boxref.current.addEventListener("scroll", ScrollToNext)
        }
        return () => {
            document.removeEventListener("scroll", ScrollToNext);
        };
    }, [items])



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
        <>
            {
                items && items.length > 0 &&
                <div className='recentViewDiv'>
                    <p className='recetViewText' >Recently viewed</p>
                    <div style={{ display: "flex", width: "100vw", justifyContent: "center" }} >
                        <div style={{ height: "500px", width: "50px", display: "flex", justifyContent: "center", alignItems: "center", opacity: hideLeft ? "0.2" : "1" }}>
                            <ArrowBackIosNewIcon sx={{ cursor: "pointer", fontSize: "35px" }} onClick={ScrollLeft} />
                        </div>
                        <div className='RecentViewComp' ref={boxref}>
                            {
                                items && items.map((item, index) => <Recentviewbox item={item} />)
                            }
                        </div>
                        <div style={{ height: "500px", width: "50px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ArrowForwardIosIcon sx={{ cursor: "pointer", fontSize: "35px", opacity: hideRight ? "0.2" : "1" }} onClick={ScrollRight} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Recentview