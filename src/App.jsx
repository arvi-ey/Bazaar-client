import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { GetBanners } from '../Redux/Slice/bannerSlicer'
import { GetAllCategory } from "../Redux/Slice/categorySlicer"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './Components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import About from './Components/About/About'
import Products from './Components/Products/Products'
import { getfavouriteItem } from '../Redux/Slice/favouriteItemSlicer'
import Favourite from './Components/Favourite/Favourite'
import ProductDetail from './Components/ProductDetail/ProductDetail'
import ProductCategory from './Components/Category/ProductCategory'
import Signup from './Components/Authentication/Signup'
import Signin from "./Components/Authentication/Signin"
import Cart from './Components/Cart/Cart'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import axios from 'axios'
import { URL } from '../config'
import Account from './Components/Account/Account'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "favourite", element: <Favourite /> },
      { path: "products/:category", element: <ProductCategory /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "user/account", element: <Account /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "user/cart", element: <Cart /> },
          { path: "user/about", element: <About /> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(GetBanners())
    dispatch(GetAllCategory())
    dispatch(getfavouriteItem())
  }, [dispatch])


  return (
    <RouterProvider router={router} />
  )
}

export default App
