import React from 'react'
import "./Category.css"
import CategoryBox from './CategoryBox'
import { useSelector, useDispatch } from 'react-redux'

const CategorySection = () => {
    const dispatch = useDispatch()
    const { category } = useSelector(state => state.category)

    console.log(category)
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