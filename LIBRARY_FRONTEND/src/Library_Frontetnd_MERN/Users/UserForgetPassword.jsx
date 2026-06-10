import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UserForgotPassword.css';
import { NavbarLibrary } from '../Navbar_Library/NavbarLibrary';
import { UserForgotResetPassPost } from '../../ReduxStore/LibrarySlice';

export const UserForgetPassword = () => {

    const state = useSelector((state) => state?.LibraryProject);
    console.log(state);
    

  const dispatch = useDispatch();

  const [resetForm, setResetForm] = useState({
    email: ''
  });
  const [getLink , serGetLink] = useState(null)

  const HandleLogin = (e) => {
    const { name, value } = e.target;
    setResetForm({ ...resetForm, [name]: value });
  };

  const HandleLoginClick = () => {

    if (!resetForm.email) {
      toast.error("Please enter your email");
      return;
    }

// ✅ Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(resetForm.email)) {
        toast.error("Please enter a valid email address");
        return;
    }

    //    console.log(resetForm);
    dispatch(UserForgotResetPassPost(resetForm)).then((res) => {
        console.log(res);
      if (res.payload?.status === 200) {
        toast.success(res?.payload?.data?.msg);
        setResetForm({ email: '' })
        serGetLink(res?.payload?.data?.mail_Link)
      } else {
        toast.error(res?.payload?.response?.data?.msg);
      }
    });
    
  };

  return (
    <>
      <NavbarLibrary />

      <div className="forgot-container">
        <div className="forgot-card">

          <h2 className="title">Forgot Password?</h2>
          <p className="subtitle">Enter your email to reset your password</p>

          <input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={resetForm.email}
            onChange={HandleLogin}
            className="input-field"
          />

            <button
            onClick={HandleLoginClick}
            className="reset-btn"
            disabled={state?.isLibraryLoading}
            >
            {state?.isLibraryLoading ? (
                <span className="spinner"></span>
            ) : state?.Libraryreject ? (
                "Retry"
            ) : (
                "Send"
            )}
            </button>


            {getLink ?  <u>
             <NavLink to={getLink}>Click here to Going (MailBox)</NavLink>
            </u> : null}
           

        </div>
      </div>
    </>
  );
};