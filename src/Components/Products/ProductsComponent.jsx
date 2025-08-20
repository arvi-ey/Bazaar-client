import React, { useEffect, useState } from 'react'
import Productbox from './Productbox'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetProductsByCategory, GetProducts, GetFilteredProducts, GetAllProducts } from '../../../Redux/Slice/productsSlicer'
import LoaderBox from '../../Common/LoaderBox'
import Loading from '../../Common/Loading'
import SearchIcon from '@mui/icons-material/Search';
import Filterbar from '../Filterbar/Filterbar'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const ProductsComponent = ({ categoryName }) => {
    const dispatch = useDispatch()
    const { products, allProducts, filteredProducts, loading, hasMore, scrollLoading } = useSelector(state => state.product)
    const { pricerange } = useSelector(state => state.filter)
    const [pageNo, setPageno] = useState(1)
    const [filteredProduct, setfilteredProduct] = useState([])


    useEffect(() => {
        if (pricerange > 0) {
            dispatch(GetFilteredProducts(pricerange))
        }
        if (pricerange == 0) {
            setfilteredProduct(products)
        }
    }, [pricerange, dispatch, products])

    useEffect(() => {
        setfilteredProduct(filteredProducts)
    }, [filteredProducts])

    useEffect(() => {
        window.addEventListener("scroll", HandleScroll)
        return () => {
            window.removeEventListener("scroll", HandleScroll);
        };
    }, [])

    const HandleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
            setPageno((prev) => prev + 1)
        }
    }

    useEffect(() => {
        if (hasMore && pricerange == 0) {
            dispatch(GetProducts({ page: pageNo, limit: 8, dsc: 'dsc', category: categoryName || "" }))
        }
    }, [pageNo, pricerange])




    return (
        <div className="productComponent">
            <div className='ProductPageTitle'>
                All products
            </div>
            {/* <div className="searchbox">
                <div className="seachContainer">
                    <SearchIcon sx={{ opacity: "0.5" }} />
                    <input
                        placeholder='Search product ....'
                        className='searchInputBox'
                    />
                </div>
            </div> */}
            <Filterbar />


            <div className='ProductList'>
                {loading ? (

                    Array.from({ length: 20 }).map((data, index) => {
                        return (
                            <LoaderBox />
                        )
                    }
                    )

                ) : (
                    Array.isArray(filteredProduct) &&
                    filteredProduct.map((data, index) => (
                        <Productbox
                            products={data}
                            key={index}
                            loading={loading}
                        />
                    ))
                )}
            </div>


            {scrollLoading &&
                <div className='Loading'>
                    <p style={{ fontSize: "1.5vmax", color: "black", opacity: "0.7" }} >Loading.....</p>
                </div>
            }
            {
                hasMore === false &&
                <div className='Hasmore'>
                    No more products to load ....
                </div>
            }
        </div>
    )
}

export default ProductsComponent