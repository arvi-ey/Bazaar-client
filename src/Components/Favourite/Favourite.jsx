import React from 'react'
import "./Favourite.css"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FavouriteProductBox from './FavouriteProductBox.'
import Filterbar from '../Filterbar/Filterbar'
import Recentview from "../RecentlyViewed/Recentview"
import EmptyBox from "../../assets/empty-box.svg"
const Favourite = () => {
    const { items } = useSelector(state => state.favouriteproducts)
    return (
        <>
            <div className='favouriteDiv' >
                <div className="favouritecOntainer">
                    {
                        items?.length == 0 ?
                            <div className='EmptyFavouritelistbox' >
                                <img src={EmptyBox} className='Empty-cart-image' />
                                <h1 className='emptytext' >Your Wishlist is empty</h1>
                            </div>
                            :

                            items.map((data, index) => {
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