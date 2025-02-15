import React from 'react'
import "./Favourite.css"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FavouriteProductBox from './FavouriteProductBox.'
import Filterbar from '../Filterbar/Filterbar'
const Favourite = () => {
    const { items } = useSelector(state => state.favouriteproducts)
    return (
        <>
            <Filterbar />
            <div className="favouritecOntainer">
                {
                    items && items.length > 0 && items.map((data, index) => {
                        return (
                            <FavouriteProductBox
                                item={data}
                                key={index}
                            />
                        )
                    }


                    )
                }
            </div>
        </>
    )
}

export default Favourite