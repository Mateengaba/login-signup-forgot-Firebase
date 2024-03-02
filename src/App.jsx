
import './App.css'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "font-awesome/css/font-awesome.min.css"
import Body from './Components/Body'
import Navbar from './Components/Navbar'
import AuthRoute from './Authsrout/AuthRoute'
import ProtectedRoutes from './Authsrout/ProtectedRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgot from './Components//Forgot'


function App() {

  return (
<>
    <ToastContainer  />


    <Routes>
  {/* AuthRoute for protecting routes */}
  <Route element={<AuthRoute />}>
    <Route index element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Route>
  
  {/* Route for forgot password page */}
  <Route path="/forgot" element={<Forgot />} />
  
  {/* Protected routes */}
  <Route element={<ProtectedRoutes />}>
    <Route path='/Body' element={<Body />} />
  </Route>
</Routes>

    </>

 

  )
}

export default App
