import React, { useEffect, useState } from 'react'
import Productbox from './Productbox'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetProductsByCategory, GetProducts } from '../../../Redux/Slice/productsSlicer'
const ProductsComponent = ({ categoryName }) => {
    const dispatch = useDispatch()
    const { products, loading, hasMore } = useSelector(state => state.product)
    const [pageNo, setPageno] = useState(1)
    const [loadingData, setLoadingData] = useState(false)

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
        dispatch(GetProducts({ page: pageNo, limit: 8, dsc: 'dsc' }))
    }, [pageNo])



    useEffect(() => {
        console.log(hasMore, "hasMorehasMorehasMore")
    }, [hasMore])

    useEffect(() => {

        if (categoryName) {
            dispatch(GetProductsByCategory(categoryName))
        }
    }, [dispatch, categoryName])

    return (
        <div className="productComponent">
            {
                Array.isArray(products) && products?.map((data, index) => (
                    <Productbox
                        products={data}
                        key={index}
                        loading={loading}
                    />
                ))
            }
            {loading &&
                <div style={{ fontSize: "50px", fontWeight: "900", marginTop: "100px" }}>
                    Loading ...........
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