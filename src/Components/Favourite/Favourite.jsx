import React from 'react'
import "./Favourite.css"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FavouriteProductBox from './FavouriteProductBox.'
import Filterbar from '../Filterbar/Filterbar'
import Recentview from "../RecentlyViewed/Recentview"
const Favourite = () => {
    const { items } = useSelector(state => state.favouriteproducts)
    return (
        <>
            <div className='favouriteDiv' >
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
            </div>
            <Recentview />
        </>
    )
}

export default Favourite