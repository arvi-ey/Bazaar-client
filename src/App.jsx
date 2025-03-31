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
import Account from './Components/Account/Account'
import Order from './Components/Order/Order'
import Payment from './Components/Payment/Payment'
import Success from './Components/Success/Success'
import Failed from './Components/Success/Failed'
import OrderDetails from './Components/Order/OrderDetails'
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

      {
        element: <ProtectedRoute />,
        children: [
          { path: "user/account", element: <Account /> },
          { path: "user/cart", element: <Cart /> },
          { path: "user/about", element: <About /> },
          { path: "user/payment", element: <Payment /> },
          { path: "user/orders", element: <Order /> },
          { path: "user/success", element: <Success /> },
          { path: "user/failed", element: <Failed /> },
          { path: "user/orderdetails/:id", element: <OrderDetails /> },
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
