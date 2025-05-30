import React, { useEffect, useState } from 'react'
import GradeIcon from '@mui/icons-material/Grade';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WishList from '../../Common/WishList';
import { updateFavouriteItem } from '../../../Redux/Slice/favouriteItemSlicer';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarComponent from '../../Common/Snackbar';
import { useNavigate } from 'react-router-dom';

const Productbox = ({ products, key, loading }) => {
    if (!products) return null;

    const navigate = useNavigate()
    const [imageFocus, SetImageFocus] = useState(false)
    const [selectWishLIst, setSelectWishList] = useState(false)
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.favouriteproducts)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [slectSnackBarMessage, setSelectSnackBarMessage] = useState("")

    useEffect(() => {
        if (items?.length > 0) {
            setSelectWishList(items.some(item => item._id === products._id));
        }
    }, [products, items]);

    const randomDecimal = Math.random() * 0.9;

    const GetDeliveryDate = (days) => {
        if (!days) return;
        const today = new Date();
        today.setDate(today.getDate() + days);
        return today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    useEffect(() => {
        if (openSnackBar) {
            const timer = setTimeout(() => setOpenSnackBar(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [openSnackBar]);

    const SelecttoWishList = async () => {
        dispatch(updateFavouriteItem(products));
        const exists = items.some(item => item._id === products._id);
        setOpenSnackBar(true);
        setSelectSnackBarMessage(exists ? "Item removed from favourite list" : "Item added into favourite list");
    };

    const NavigateProductDetail = () => {
        navigate(`/product/${products._id}`, { state: { favourite: selectWishLIst } });
    };

    return (
        <div className="productBoxs" key={key}>
            <div style={{ position: "relative", overflow: "hidden" }} onClick={NavigateProductDetail}>
                <img src={imageFocus ? products.images[1] : products.images[0]} alt={products.category} className='productImages' onMouseOver={() => SetImageFocus(true)} onMouseOut={() => SetImageFocus(false)} />
                <div className='rating'>
                    <GradeIcon sx={{ color: "#FFD700" }} />
                    <p className='ratingText'>{products?.ratings}</p>
                </div>
            </div>
            <div className='detailBoxs'>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <p className='productTitle'>{products?.title?.length > 20 ? `${products.title.substring(0, 20)}...` : products?.title}</p>
                    <div onClick={SelecttoWishList} style={{ cursor: "pointer" }}>
                        <WishList select={selectWishLIst} />
                    </div>
                </div>
                <p className='productdesc'>{products?.description?.substring(0, 55)}...</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <p className='productPrice'>
                        <span style={{ fontSize: "12px", fontWeight: "600" }}>₹</span>
                        {products?.price}
                    </p>
                    <s className='productReducedPrice'>
                        <span style={{ fontSize: "10px", fontWeight: "600" }}>₹</span>
                        {Math.floor(products?.price + products?.price * products?.discount / 100)}
                    </s>
                    <p className='discountClass'>{products.discount}%OFF</p>
                </div>
                <div className='DeliveryDetail'>
                    <LocalShippingIcon sx={{ color: '#ec0d75' }} />
                    <p className='DeliveryDetailText'>Free Delivery by {GetDeliveryDate(products?.deliveryTime)}</p>
                </div>
            </div>
            {slectSnackBarMessage && (
                <SnackbarComponent severity="success" bgColor="#9ee721" isOpen={openSnackBar} message={slectSnackBarMessage} />
            )}
        </div>
    );
};

export default Productbox;
