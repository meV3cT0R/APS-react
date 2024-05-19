import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import Browse from './pages/Browse/Browse'
import AboutUsPage from './pages/aboutUs/AboutUsPage'
import ProductInfo from './pages/Browse/ProductInfo'

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
            }
          ]
        }
      ])}/>
  )
}

export default App
