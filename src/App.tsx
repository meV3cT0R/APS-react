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
import { useEffect, useState } from 'react'
import { axiosGetData } from './utility/axios_util'
import axios from 'axios'
import { CartItem } from './types/Cart'
import AdminLayout from './layouts/AdminLayout'
import AdminProducts from './pages/admin/products/AdminProducts'
import ProductLoader from './pages/admin/products/ProductLoader'
import productLoader from './pages/admin/products/ProductLoader'
import AddProducts from './pages/admin/products/AddProducts'
import SingleProductLoader from './pages/admin/products/SingleProductLoader'
import EditProducts from './pages/admin/products/EditProducts'

axios.defaults.baseURL = 'http://localhost:8080/api/';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<any>();


  useEffect(() => {
    const func = async () => {
      const res = await axios
        .post("loginWithToken", {
          token
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(val => {
          console.log(val);
          setToken(token);
          setUser(val.data);
        })
        .catch((error) => {
          throw new Error(error);
        });
      return res;
    }
    if (token) {
      func();
    }
  }, []);
  return (
    <GlobalContext.Provider value={
      { cart, setCart, token, setToken,user,setUser }
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
              loader: async ({ params }) => {
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
        }, 
        {
          path : "admin",
          element : <AdminLayout/>,
          children:[
            {
              path : "products",
              children : [
                {
                  path : "",
                  loader: productLoader,
                  element : <AdminProducts/>
                },
                {
                  path : "add",

                  element : <AddProducts/>
                },
                {
                  path : "edit/:id",
                  loader:SingleProductLoader,
                  element : <EditProducts/>
                },
              ]
            }
          ]
        }
      ])} />
    </GlobalContext.Provider>
  )
}

export default App
