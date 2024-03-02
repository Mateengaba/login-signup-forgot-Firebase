import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebaseconfg';  
import { Link, useNavigate } from "react-router-dom";

import './Style.css';
import { toast } from 'react-toastify';

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!fullName || !email || !password) {
        toast.warning("All fields are required.");
        setLoading(false); // Set loading to false if there's an error
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Sign-up successfully");

      navigate("/");

    } catch (error) {
      console.log("error", error.message);
      toast.error("error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={SignupHandler} className='signup template d-flex justify-content-center align-items-center vh-100 bg-red-200'>
      <div className='form_container shadow p-5 rounded bg-white'>
        <h2 className='text-center'>Sign-up</h2>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="fullName">Full Name</label>
          <input type="text" placeholder='Enter Full Name' className='form-control' onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="email">Email</label>
          <input type="email" placeholder='Enter Email' className='form-control' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="password">Password</label>
          <input type="password" placeholder='Enter Password' className='form-control' onChange={(e) => setPassword(e.target.value)} />
        </div>


        <div className='d-grid pt-3  '>
  {loading ? (
    <div className="spinner-border text-primary d-flex justify-content-center align-items-center" role="status">
      <span className="visually-hidden ">Loading...</span>
    </div>
  ) : (
    <button className='btn btn-primary '>SIGN UP</button>

  )}

        <p className='text-end mt-3'>
          <Link to="/" className='signupLink ms-2'>Already Have An Account?</Link>
        </p> 
</div>

{/* 
         <div className='d-grid pt-3'>
          <button className='btn btn-primary' disabled={loading}>
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>
        </div>  */}

  
      </div>
    </form>
  );
}

export default Signup;