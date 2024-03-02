import React from 'react';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import './Style.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email sent successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleForgot} className='signup template d-flex justify-content-center align-items-center vh-100 bg-red-200'>
    <div className='form_container shadow p-5 rounded bg-white'>
      <h2 className='text-center'>Forgot Password</h2>
      <div className='mb-3'>
        <label className='mb-2' htmlFor="email">Email</label>
        <input type="email" placeholder='Enter Email' className='form-control' onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='d-grid pt-3'>
        <button className='btn btn-primary'>Reset Password</button>
    
      </div>
      
    </div>
  </form>
);
}

export default Forgot;
