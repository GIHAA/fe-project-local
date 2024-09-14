import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoginPage from './components/Login/Login'
import RegisterPage from './components/Register/Register'
import HomePage from './components/HomePage/HomePage'


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
      </Route>
    )
  )
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}
export default App
