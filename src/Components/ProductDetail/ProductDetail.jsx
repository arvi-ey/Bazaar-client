import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { GetSingleProduct } from '../../../Redux/Slice/productSlicer'
import "./ProductDetail.css"
import StarRating from '../../Common/StarRating'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Genuine from "../../assets/Genuine.svg"
import secure from "../../assets/secure.svg"
import exchange from "../../assets/exchange.svg"
import cash from "../../assets/cash.svg"
import DeliveryTruck from "../../assets/deliveryTruck.svg"
import WishList from '../../Common/WishList'
import { updateFavouriteItem } from '../../../Redux/Slice/favouriteItemSlicer'
import { GetProductsByCategory } from '../../../Redux/Slice/productsSlicer'
import CommonCategory from '../Commoncategory/CommonCategory'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import useAuth from '../Hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { addrecentView, getRecentView } from '../../../Redux/Slice/recentlyView'
import Recentview from "../RecentlyViewed/Recentview"
import SnackbarComponent from '../../Common/Snackbar'
import { AddToCart } from '../../../Redux/Slice/cartSlicer'
// import { CheckAuth } from '../../ulits/checkAuth'

const ProductDetail = () => {
    const dispatch = useDispatch()
    const { auth } = useAuth()
    const navigate = useNavigate()
    const { product } = useSelector(state => state.singleproduct)
    const { items } = useSelector(state => state.recentView)
    const { id } = useParams()
    const [selectImageview, setSelectImageView] = useState({ image: "", index: null })
    const [selectSize, setSelectSize] = useState("")
    const location = useLocation();
    const isFavourite = location.state?.favourite || false;
    const [openSnackBar, setOpenSnackbar] = useState(false)
    const [selectSnackbarMessage, setSelectSnackBarMessage] = useState("")
    const [sizeerror, setSizeerror] = useState("")

    useEffect(() => {
        dispatch(GetSingleProduct(id))
        dispatch(getRecentView())
        setSizeerror("")
        setSelectSize("")
    }, [dispatch, id])

    useEffect(() => {
        if (product?.images?.length > 0) {
            setSelectImageView({
                image: product.images[0],
                index: 0
            })

        }
        if (product && product._id) {
            dispatch(addrecentView(product))
        }
    }, [product])

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

    const HandleSelectImage = (image, index) => {
        setSelectImageView({ image, index })
    }
    const randomDecimal = (Math.random() * 0.9);

    const SelectSize = (data) => {
        setSelectSize(data)
    }

    const sizeArray = ["XS", "S", "M", "L", "XL", "XXL"]



    if (!product) {
        return (
            <div className="productDetailContainer">
                <div className="productImageList">
                    {[...Array(4)].map((_, index) => (
                        <Skeleton key={index} variant="rounded" width={70} height={70} />
                    ))}
                </div>
                <div className="productImageView">
                    <Skeleton variant="rounded" width={550} height={600} />
                </div>
                <Stack spacing={2} className="productDetailsBox">
                    <Skeleton variant="text" width={500} height={40} />
                    <Skeleton variant="text" width={450} height={30} />
                    <Skeleton variant="text" width={300} height={20} />
                    <Skeleton variant="rounded" width={200} height={50} />
                    <Skeleton variant="rounded" width={100} height={40} />
                </Stack>
            </div>
        )
    }

    const AddtoCart = async () => {
        setSizeerror("")
        if (!selectSize) {
            setSizeerror("Please select size")
            return
        }
        if (!auth) navigate("/signin", { state: { productId: product._id } })
        else {
            const cartObj = {
                title: product?.title,
                userId: auth?.userId,
                subTotal: product?.price && product.price * (1 - 0.40) || 0,
                count: 1,
                product_id: product?._id,
                description: product?.description || '',
                stock: product?.stock || 0,
                image: product?.images?.[0] || '',
                numReviews: product?.numReviews || 0,
                ratings: product?.ratings || 0,
                deliveryTime: product?.deliveryTime || 0,
                createdAt: Date.now().toString(),
                category: product?.category || '',
                price: product?.price,
                discount: product?.discount,
                actualprice: Math.floor(product?.price + product?.price * product?.discount / 100),
                size: selectSize || ""
            }
            const data = await dispatch(AddToCart(cartObj))
            if (data.payload._id) {
                setOpenSnackbar(true)
                setSelectSnackBarMessage("Item Aded to Cart")
                setTimeout(() => {
                    setOpenSnackbar(false)
                }, 1500)
                return
            }
        }

    }


    return (
        <>
            <div className="productDetailContainer">
                <div className="productImageList">
                    {
                        product && product.images && product.images.map((image, index) => {
                            return (
                                <div key={index} className={`imagelistBox ${selectImageview.index == index ? "selectedImage" : ''} `} onClick={() => HandleSelectImage(image, index)} >
                                    <img src={image} alt='image' className='DetaillistImage' />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="productImageView">
                    <img src={selectImageview.image} alt='selected-image' className='detailImage' />
                </div>
                <div className="productDetailsBox">
                    <div className="detailImageTitle">
                        {product?.title}
                    </div>
                    <div className="detailImagedesc">
                        {product?.description.length > 100 ? `${product?.description.slice(0, 100)}...` : product?.description}
                    </div>
                    <div>
                        <StarRating
                            value={product?.ratings}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.7, }}>
                        <p className='productPrice' style={{ fontSize: "1.5vmax" }}>
                            <span style={{ fontSize: "1vmax", fontWeight: "600" }}>
                                ₹
                            </span>
                            {product?.price}
                        </p>
                        <s className='productReducedPrice' style={{ fontSize: "1vmax" }}>
                            <span style={{ fontSize: "0.6", fontWeight: "600" }}>
                                ₹
                            </span>
                            {Math.floor(product?.price + product?.price * product?.discount / 100)}
                        </s>
                        <p className='discountClass' style={{ fontSize: "1.5vmax" }} >
                            {product?.discount}%OFF
                        </p>
                    </div>
                    <p style={{ opacity: 0.6, fontSize: "0.7vmax", fontWeight: "400" }} >
                        inclusive of all taxes
                    </p>
                    <p style={{ opacity: 0.9, fontSize: "1vmax", fontWeight: "400", marginTop: "10px" }}>Select Size:</p>
                    <div className="sizeDiv">
                        {sizeArray.map((data, index) => {
                            return (
                                <div key={index} className={`sizelement ${selectSize == data ? `selectedSizeelement` : ""}`} onClick={() => SelectSize(data)} >
                                    {data}
                                </div>
                            )
                        })}
                    </div>
                    <p style={{ opacity: 0.7, fontSize: "1vmax", fontWeight: "400", marginTop: "10px" }}>{`Only ${product?.stock} items remaining`}</p>
                    <div className='FavouriteDeliveryDetailBox'>
                        <img src={cash} alt='Cash-delivery' style={{ height: "2vmax", width: "2vmax" }} />
                        <p className='FavouriteDeliveryDetailText' style={{ fontSize: "1vmax", opacity: 0.7, }}>Cash on delivery available</p>
                    </div>
                    <div className='FavouriteDeliveryDetailBox'>
                        <img src={DeliveryTruck} alt='Delivery-Truck' style={{ height: "2vmax", width: "2vmax" }} />
                        <p className='FavouriteDeliveryDetailText' style={{ fontSize: "1vmax", opacity: 0.7, }}>Free Delivery by {GetDeliveryDate(product?.deliveryTime)}</p>
                    </div>
                    <div className="favouriteAddtocart"
                        onClick={AddtoCart}
                        style={{ marginTop: "20px", width: "20vmax", height: "3vmax", fontSize: "1.5vmax", fontWeight: "400", padding: "10px 20px 10px 20px" }}>
                        Add to cart
                    </div>
                    <div style={{ color: "red", fontSize: "1vmax", marginTop: "5px", height: "10px" }}>
                        {sizeerror &&
                            <p>{sizeerror}</p>
                        }
                    </div>
                    <div className="deliveryLocation">
                        <FmdGoodOutlinedIcon sx={{ opacity: "0.7" }} />
                        <p style={{ fontWeight: "500", opacity: "0.7", fontSize: "1vmax" }} >
                            Check for Delivery Details
                        </p>
                    </div>
                    <div style={{ marginTop: "10px" }} >
                        <div className='Loacationearch'>
                            <input
                                placeholder='Enter Pincode'
                                className='inputLocation'
                            />
                            <p style={{ cursor: 'pointer', fontWeight: "500", fontSize: "1vmax", opacity: "0.7", color: "#ec0d75", justifyContent: "flex-end" }}>Check</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", widows: "100%", justifyContent: "center", alignItems: "center", gap: "4vmax", marginTop: "2vmax" }}>
                        <div style={{ display: 'flex', opacity: "0.8", width: "8vmax", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: "10px", }} >
                            <img src={secure} style={{ height: "5vmax", width: "5vmax" }} />
                            <p style={{ opacity: "0.5", fontSize: "0.6vmax", textAlign: "center", wordWrap: "break-word" }}>100% SECURE PAYMENT</p>
                        </div>
                        <div style={{ display: 'flex', opacity: "0.8", width: "8vmax", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: "10px", }} >
                            <img src={exchange} style={{ height: "5vmax", width: "5vmax" }} />
                            <p style={{ opacity: "0.5", fontSize: "0.6vmax", textAlign: "center", wordWrap: "break-word" }}>EASY RETURNS AND INSTANT REFUND</p>
                        </div>
                        <div style={{ display: 'flex', opacity: "0.8", width: "8vmax", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: "10px", }} >
                            <img src={Genuine} style={{ height: "5vmax", width: "5vmax" }} />
                            <p style={{ opacity: "0.5", fontSize: "0.6vmax", textAlign: "center", wordWrap: "break-word" }}>100% GENUINE PRODUCT</p>
                        </div>
                    </div>
                </div>
                <div className="productImageLishorizontal">
                    {
                        product && product.images && product.images.map((image, index) => {
                            return (
                                <div key={index} className={`imagelistBoxHorizontal ${selectImageview.index == index ? "selectedimagelistBoxHorizontal" : ''} `} onClick={() => HandleSelectImage(image, index)} >
                                    <img src={image} alt='image' className='DetaillistImageHorizontal' />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="productDetailsBoxHorizontal">
                    <div className="detailImageTitle">
                        {product?.title}
                    </div>
                    <div className="detailImagedesc">
                        {product?.description.length > 100 ? `${product?.description.slice(0, 100)}...` : product?.description}
                    </div>
                    <div>
                        <StarRating
                            value={product?.ratings}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.7, }}>
                        <p className='productPrice' style={{ fontSize: "1.5vmax" }}>
                            <span style={{ fontSize: "1vmax", fontWeight: "600" }}>
                                ₹
                            </span>
                            {product?.price}
                        </p>
                        <s className='productReducedPrice' style={{ fontSize: "1vmax" }}>
                            <span style={{ fontSize: "0.6", fontWeight: "600" }}>
                                ₹
                            </span>
                            {Math.floor(product?.price + product?.price * product?.discount / 100)}
                        </s>
                        <p className='discountClass' style={{ fontSize: "1.5vmax" }} >
                            {product?.discount}%OFF
                        </p>
                    </div>
                    <p style={{ opacity: 0.6, fontSize: "0.7vmax", fontWeight: "400" }} >
                        inclusive of all taxes
                    </p>
                    <p style={{ opacity: 0.9, fontSize: "1vmax", fontWeight: "400", marginTop: "10px" }}>Select Size:</p>
                    <div className="sizeDiv">
                        {sizeArray.map((data, index) => {
                            return (
                                <div key={index} className={`sizelement ${selectSize == data ? `selectedSizeelement` : ""}`} onClick={() => SelectSize(data)} >
                                    {data}
                                </div>
                            )
                        })}
                    </div>
                    <p style={{ opacity: 0.7, fontSize: "1.2vmax", fontWeight: "400", marginTop: "10px" }}>{`Only ${product?.stock} items remaining`}</p>
                    <div className='FavouriteDeliveryDetailBox'>
                        <img src={cash} alt='Cash-delivery' style={{ height: "2vmax", width: "2vmax" }} />
                        <p className='FavouriteDeliveryDetailText' style={{ fontSize: "1vmax", opacity: 0.7, }}>Cash on delivery available</p>
                    </div>
                    <div className='FavouriteDeliveryDetailBox'>
                        <img src={DeliveryTruck} alt='Delivery-Truck' style={{ height: "2vmax", width: "2vmax" }} />
                        <p className='FavouriteDeliveryDetailText' style={{ fontSize: "1vmax", opacity: 0.7, }}>Free Delivery by {GetDeliveryDate(product?.deliveryTime)}</p>
                    </div>
                    <div className="favouriteAddtocart"
                        onClick={AddtoCart}
                        style={{ marginTop: "20px", width: "20vmax", height: "5vmax", fontSize: "1.5vmax", fontWeight: "400", padding: "10px 20px 10px 20px" }}>
                        Add to cart
                    </div>
                    <div style={{ color: "red", fontSize: "1vmax", marginTop: "5px", height: "10px" }}>
                        {sizeerror &&
                            <p>{sizeerror}</p>
                        }
                    </div>
                    <div className="deliveryLocation">
                        <FmdGoodOutlinedIcon sx={{ opacity: "0.7" }} />
                        <p style={{ fontWeight: "500", opacity: "0.7", fontSize: "1vmax" }} >
                            Check for Delivery Details
                        </p>
                    </div>
                    <div style={{ marginTop: "10px" }} >
                        <div className='Loacationearch'>
                            <input
                                placeholder='Enter Pincode'
                                className='inputLocation'
                            />
                            <p style={{ cursor: 'pointer', fontWeight: "500", fontSize: "1vmax", opacity: "0.7", color: "#ec0d75", justifyContent: "flex-end" }}>Check</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", widows: "100%", justifyContent: "center", alignItems: "center", gap: "4vmax", marginTop: "2vmax" }}>
                        <div style={{ display: 'flex', opacity: "0.8", width: "8vmax", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: "10px", }} >
                            <img src={secure} style={{ height: "5vmax", width: "5vmax" }} />
                            <p style={{ opacity: "0.5", fontSize: "0.6vmax", textAlign: "center", wordWrap: "break-word" }}>100% SECURE PAYMENT</p>
                        </div>
                        <div style={{ display: 'flex', opacity: "0.8", width: "8vmax", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: "10px", }} >
                            <img src={exchange} style={{ height: "5vmax", width: "5vmax" }} />
                            <p style={{ opacity: "0.5", fontSize: "0.6vmax", textAlign: "center", wordWrap: "break-word" }}>EASY RETURNS AND INSTANT REFUND</p>
                        </div>
                        <div style={{ display: 'flex', opacity: "0.8", width: "8vmax", flexDirection: "column", justifyContent: 'center', alignItems: "center", gap: "10px", }} >
                            <img src={Genuine} style={{ height: "5vmax", width: "5vmax" }} />
                            <p style={{ opacity: "0.5", fontSize: "0.6vmax", textAlign: "center", wordWrap: "break-word" }}>100% GENUINE PRODUCT</p>
                        </div>
                    </div>
                </div>
                {selectSnackbarMessage &&
                    <SnackbarComponent severity="success" bgColor="#9ee721" isOpen={openSnackBar} message={selectSnackbarMessage} />
                }
            </div>
            <div className='ViewSimilar'>
                You May Also Like
            </div>

            <CommonCategory
                category={product?.category}
                mainProductId={product?._id}
            />
            <Recentview />
        </>
    )
}

export default ProductDetail