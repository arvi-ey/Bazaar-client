import React, { useEffect, useState } from 'react'
import GradeIcon from '@mui/icons-material/Grade';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WishList from '../../Common/WishList';
import { updateFavouriteItem, } from '../../../Redux/Slice/favouriteItemSlicer';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarComponent from '../../Common/Snackbar';
import { useNavigate } from 'react-router-dom';

const Productbox = ({ products, key, loading }) => {
    const navigate = useNavigate()
    const [imageFocus, SetImageFocus] = useState(false)
    const [selectWishLIst, setSelectWishList] = useState(false)
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.favouriteproducts)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [slectSnackBarMessage, setSelectSnackBarMessage] = useState("")


    useEffect(() => {
        if (products && items && items.length > 0) {
            const exists = items.find(item => item._id == products._id)
            if (!exists) setSelectWishList(false)
            if (exists) setSelectWishList(true)
        }
    }, [products, items])

    const randomDecimal = (Math.random() * 0.9);

    const GetDeliveryDate = (days) => {
        if (!days) return
        const today = new Date();
        today.setDate(today.getDate() + days);
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        };
        return today.toLocaleDateString('en-US', options);
    }

    const SelecttoWishList = async () => {
        dispatch(updateFavouriteItem(products))
        setOpenSnackBar(true)
        const exists = items.find(item => item._id == products._id)
        if (!exists) setSelectSnackBarMessage("Item added into favourite list")
        if (exists) setSelectSnackBarMessage("Item removed from favourite list")
    }
    const NavigateProductDetail = () => {
        navigate(`/product/${products._id}`, { state: { favourite: selectWishLIst } });
    }


    return (
        <div className="productBoxs" key={key} >
            <div style={{ position: "relative", overflow: "hidden" }} onClick={NavigateProductDetail}>
                <img src={imageFocus ? products.images[1] : products.images[0]} alt={products.category} className='productImages' onMouseOver={() => SetImageFocus(true)} onMouseOut={() => SetImageFocus(false)} />
                {/* <div onClick={() => SelecttoWishList()} style={{ position: "absolute", top: "15px", right: "5px", cursor: "pointer" }}>
                    <WishList
                        select={selectWishLIst}
                    />
                </div> */}
                <div className='rating'>
                    <GradeIcon sx={{ color: "#FFD700" }} />
                    <p className='ratingText'>
                        {products?.ratings}
                    </p>
                </div>
            </div>
            <div className='detailBoxs'>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <p className='productTitle'>{products?.title.length > 20 ? `${products?.title.substring(0, 20)}...` : products?.title}</p>
                    <div onClick={() => SelecttoWishList()} style={{ cursor: "pointer" }}>
                        <WishList
                            select={selectWishLIst}
                        />
                    </div>
                </div>
                <p className='productdesc'>{products.description.substring(0, 55)}...</p>
                <div style={{ display: "flex", alignItems: "center", }}>
                    <p className='productPrice'>
                        <span style={{ fontSize: "12px", fontWeight: "600" }}>
                            ₹
                        </span>
                        {products?.price}
                    </p>
                    <s className='productReducedPrice'>
                        <span style={{ fontSize: "10px", fontWeight: "600" }}>
                            ₹
                        </span>
                        {parseInt(products.price * randomDecimal + products.price)}
                    </s>
                    <p className='discountClass' >
                        {parseInt(randomDecimal * 100)}%OFF
                    </p>
                </div>
                <div className='DeliveryDetail'>
                    <LocalShippingIcon sx={{ color: '#ec0d75' }} />
                    <p className='DeliveryDetailText'>Free Delivery by {GetDeliveryDate(products.deliveryTime)}</p>
                </div>
            </div>

            <SnackbarComponent
                bgColor="#9ee721"
                isOpen={openSnackBar}
                message={slectSnackBarMessage}
            />
        </div>
    )
}

export default Productbox