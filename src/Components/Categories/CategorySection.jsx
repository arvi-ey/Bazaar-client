import React, { useEffect } from 'react'
import "./Category.css"
import CategoryBox from './CategoryBox'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from '@mui/material/Skeleton';
import { GetAllCategory } from '../../../Redux/Slice/categorySlicer';

const CategorySection = () => {
    const dispatch = useDispatch()
    const { category, loading } = useSelector(state => state.category)


    useEffect(() => {
        dispatch(GetAllCategory())
    }, [dispatch]
    )

    if (loading) {
        return (
            <div className="categoyContainer">
                <div className="categorybox">
                    {

                        Array.from({ length: 7 }).map((_, index) => {
                            return (
                                <Skeleton
                                    key={index}
                                    variant="rounded"
                                    height={400}
                                    width={300}
                                />
                            )
                        })
                    }
                </div>
            </div >
        )
    }

    return (
        <div className="categoyContainer">
            <div className="categoryTitle">
                <p className="CategoryText">All Categories</p>
            </div>

            <div className="categorybox">
                {
                    category && category.length > 0 && category.map((data, index) => {
                        return (
                            <CategoryBox
                                categoryImage={data.categoryImage}
                                categoryName={data.categoryName}
                                id={data._id}
                                key={data._id}

                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategorySection