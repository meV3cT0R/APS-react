import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import Browse from './pages/Browse/Browse'
import AboutUsPage from './pages/aboutUs/AboutUsPage'
import ProductInfo from './pages/Browse/ProductInfo'
import Login from './pages/login/Login'
import Register from './pages/login/Register'
import Cart from './pages/cart/Cart'
import { GlobalContext } from './GlobalContext'
import { useState } from 'react'
import { ProductType } from './pages/Browse/ProductType'
import { axiosGetData } from './utility/axios_util'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api/';

function App() {

  const [cart, setCart] = useState<ProductType[]>([]);
  return (
    <GlobalContext.Provider value={
      { cart, setCart }
    }>
      <RouterProvider router={createBrowserRouter([
        {
          path: "/",
          element: <RootLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
            {
              path: "products",
              element: <Browse />
            },
            {
              path: "products/:id",
              loader : async({params})=> {
                  return axiosGetData(`getAllProducts/${params.id}`);
              },
              element: <ProductInfo />
            },
            {
              path: "about-us",
              element: <AboutUsPage />
            },
            {
              path: "login",
              element: <Login />
            },
            {
              path: "register",
              element: <Register />
            },
            {
              path: "cart",
              element: <Cart />
            }
          ]
        }
      ])} />
    </GlobalContext.Provider>
  )
}

export default App
