import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import Browse from './pages/Browse/Browse'
import AboutUsPage from './pages/aboutUs/AboutUsPage'
import ProductInfo from './pages/Browse/ProductInfo'
import Login from './pages/login/Login'
import Register from './pages/login/Register'

function App() {


  return (
      <RouterProvider router={createBrowserRouter([
        {
          path : "/",
          element: <RootLayout/>,
          children:[
            {
              path : "",
              element : <Home/>,
            },
            {
              path : "products",
              element : <Browse/>
            },
            {
              path : "products/:id",
              element : <ProductInfo/>
            },
            {
              path : "about-us",
              element : <AboutUsPage/>
            },
            {
              path : "login",
              element : <Login/>
            },
            {
              path : "register",
              element : <Register/>
            }
          ]
        }
      ])}/>
  )
}

export default App
