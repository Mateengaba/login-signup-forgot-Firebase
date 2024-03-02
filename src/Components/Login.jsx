import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebaseconfg';
import './Style.css';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.warning("Invalid Email");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("user", user);
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("email", email);
      navigate("/Body");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <form onSubmit={loginUser} className='signup template d-flex justify-content-center align-items-center vh-100 bg-red-200'>
      <div className='form_container shadow  p-5 rounded bg-white'>
        <h2 className='text-center'>Login</h2>
        <div className='mb-3'>
          <label className='mb-2' htmlFor="email">Email</label>
          <input type="email" placeholder='Enter Email' className='form-control' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mb-3'>
          <label className='mb-2' htmlFor="password">Password</label>
          <input type="password" placeholder='Enter Password' className='form-control' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <button className='btn btn-primary'>Login</button>
        </div>
        <p className='text-end mt-3'>
        <Link to="/forgot" className='ms-2 signupLink'>forgot password?</Link>

          <Link to="/signup" className='ms-2 signupLink'>Don't Have An Account?</Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
