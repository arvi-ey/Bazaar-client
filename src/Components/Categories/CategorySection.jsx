import React from 'react'
import "./Category.css"
import CategoryBox from './CategoryBox'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from '@mui/material/Skeleton';

const CategorySection = () => {
    const dispatch = useDispatch()
    const { category } = useSelector(state => state.category)

    if (!category) {
        return (
            <div className="categoyContainer">
                <div className="categorybox">
                    {

                        Array.from({ length: 7 }).map((_, index) => {
                            return (
                                <Skeleton
                                    key={index}
                                    variant="rounded"
                                    height={450}
                                    width={350}
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