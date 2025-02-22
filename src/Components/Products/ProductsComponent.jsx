import React, { useEffect, useState } from 'react'
import Productbox from './Productbox'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetProductsByCategory, GetProducts, GetAllProducts } from '../../../Redux/Slice/productsSlicer'
import LoaderBox from '../../Common/LoaderBox'
import Loading from '../../Common/Loading'
import SearchIcon from '@mui/icons-material/Search';
const ProductsComponent = ({ categoryName }) => {
    const dispatch = useDispatch()
    const { products, loading, hasMore, scrollLoading } = useSelector(state => state.product)
    const [pageNo, setPageno] = useState(1)

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
        dispatch(GetProducts({ page: pageNo, limit: 8, dsc: 'dsc', category: categoryName || "" }))
    }, [pageNo])

    useEffect(() => {
        if (categoryName) {
            dispatch(GetProductsByCategory(categoryName))
        }
    }, [dispatch, categoryName])

    const loadingArray = [1, 2, 3, 4, 4, 5, 5, 6, 7, 8, 8]

    return (
        <div className="productComponent">
            <div className="searchbox">
                <div className="seachContainer">
                    <SearchIcon sx={{ opacity: "0.5" }} />
                    <input
                        placeholder='Search product ....'
                        className='searchInputBox'
                    />
                </div>
            </div>
            {
                loading && loadingArray.map((data, index) => <LoaderBox />)

            }
            {
                Array.isArray(products) && products?.map((data, index) => (
                    <Productbox
                        products={data}
                        key={index}
                        loading={loading}
                    />
                ))
            }
            {scrollLoading &&
                <div className='Loading'>
                    <Loading />
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