import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import Browse from './pages/Browse/Browse'

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
            }
          ]
        }
      ])}/>
  )
}

export default App
