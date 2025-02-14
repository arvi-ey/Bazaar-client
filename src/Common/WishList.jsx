import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
const WishList = ({ select }) => {

    return (
        <>
            {
                select ?
                    <FavoriteIcon style={{ color: "#ec0d75" }} />
                    :
                    <FavoriteBorderIcon style={{ color: "#ec0d75" }} />
            }
        </>
    )
}

export default WishList