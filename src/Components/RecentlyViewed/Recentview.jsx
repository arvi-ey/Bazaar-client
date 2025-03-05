import React from 'react'
import "./Recentview.css"
import Recentviewbox from './Recentviewbox'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Recentview = ({ recentViewItems }) => {
    return (
        <div className='recentViewDiv'>
            <p className='recetViewText' >Recently viewed</p>
            <div style={{ display: "flex", width: "100vw", justifyContent: "center" }} >
                <div style={{ height: "450px", width: "50px", display: "flex", justifyContent: "center", cursor: "pointer", alignItems: "center" }}>
                    <ArrowBackIosNewIcon />
                </div>
                <div className='RecentViewComp'>
                    {
                        recentViewItems && recentViewItems.map((item, index) => <Recentviewbox item={item} />)
                    }
                </div>
                <div style={{ height: "450px", width: "50px", display: "flex", justifyContent: "center", cursor: "pointer", alignItems: "center" }}>
                    <ArrowForwardIosIcon />
                </div>
            </div>
        </div>
    )
}

export default Recentview