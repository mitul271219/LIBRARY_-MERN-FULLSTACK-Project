import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserResetPasswordPost } from '../../ReduxStore/LibrarySlice';
import './UserResetPassLink.css'
import { NavbarLibrary } from '../Navbar_Library/NavbarLibrary';

export const UserResetPassLink = () => {

  const { isLibraryLoading } = useSelector((state) => state?.LibraryProject);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { rtoken } = useParams()

  const [resetPassLink, setResetPassLink] = useState({
    reset_token: rtoken,
    passwordreset: ''
  });

  const HandleLogin = (e) => {
    const { name, value } = e.target;
    setResetPassLink({ ...resetPassLink, [name]: value });
  };

  const HandleLoginClick = () => {
    dispatch(UserResetPasswordPost(resetPassLink)).then((res) => {
      if (res.payload?.status === 200) {
        toast.success(res?.payload?.data?.msg)
        navigate('/loginUser')
      } else {
        toast.error(res?.payload?.response?.data?.msg)
      }
    })
  }

  return (
    <>
        <NavbarLibrary/>
        <div className="reset-container">

      <div className="overlay">

        <div className="card-box">
          <h2 className="title">📚 Library Reset Password</h2>

          <input
            type="password"
            placeholder="Enter New Password"
            name="passwordreset"
            value={resetPassLink.passwordreset}
            onChange={HandleLogin}
            className="input-field"
          />

          <button
            onClick={HandleLoginClick}
            className="submit-btn"
            disabled={isLibraryLoading}
          >
            {isLibraryLoading ? (
              <span className="spinner"></span>
            ) : (
              "Change Password"
            )}
          </button>

        </div>

      </div>
    </div>

    </>
  )
}