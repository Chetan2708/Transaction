import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './Dashboard.jsx'
import axios from 'axios'
import './index.css'
import {  createBrowserRouter,RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
axios.defaults.baseURL = "https://transactionbackend-5jyv.onrender.com"
const router = createBrowserRouter([{
  path: '/',
  element: <Dashboard />,
  
}]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
    
  </React.StrictMode>
)
