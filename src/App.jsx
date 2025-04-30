import { useState } from 'react'
import { 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import LoginLayot from './layouts/loginLayot'


function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<h1 className='font-bold text-4xl text-blue-600'>HI</h1>} />
  ))

  return <RouterProvider router={router}/>
}

export default App
