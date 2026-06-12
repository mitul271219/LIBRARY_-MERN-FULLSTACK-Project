

import React, { useState } from "react";
import "./NavbarLibrary.css";

import { IoIosLogOut } from "react-icons/io";
import { FaUserAlt, FaBookOpen } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserLogOutPost } from "../../ReduxStore/LibrarySlice";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";



export const NavbarLibrary = () => {

  const cartData = useSelector(
    (state) => state.LibraryProject.cartData
  );


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const userToken = localStorage.getItem("userTOKEN");
  const userName = localStorage.getItem("userNAME");

  const LogOutClick = () => {
    dispatch(UserLogOutPost(userToken)).then((res) => {
      if (res?.payload?.data?.msg === "successfullyDeleteTokenUser") {
        localStorage.clear();
        toast.success(`Logout successfully (${userName})`);
        navigate("/createUser");
      } else {
        toast.error(res?.payload?.response?.data?.msg);
      }
    });
  };

  return (
    <>
      <nav className="modern-navbar">

        {/* LOGO */}
        <Link to="/" className="logo-section">
          <FaBookOpen className="logo-icon" />
          <div>
            <h2>E-Books</h2>
            <span>Read & Buy</span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="nav-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>

          <NavLink to="/aboutLibrary" className="nav-item">
           About
          </NavLink>

          <NavLink to="/contactFormLibrary" className="nav-item">
            Contact
          </NavLink>


          <NavLink to="/admin" className="nav-item">
            Admin Panel
          </NavLink>

          
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          {userToken ? (
            <>
              <div className="welcome-box">
                <span>Welcome</span>
                <h4>{userName}</h4>
              </div>

              <button onClick={LogOutClick} className="logout-btn">
                <IoIosLogOut size={22} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/createUser" className="login-btn">
              <FaUserAlt />
              Sign Up / Login
            </Link>
          )}


              {/* <NavLink to="/cartPage" className="cart-icon-box">

                <FaShoppingCart size={22} />

                <span className="cart-count">
                  {cartData?.length }
                </span>

              </NavLink> */}
              <NavLink to="/cartPage" className="cart-icon-box">
                <FaShoppingCart className="cart-main-icon" />

                {cartData?.length > 0 && (
                  <span className="cart-count">
                    {cartData.length > 99 ? "99+" : cartData.length}
                  </span>
                )}
              </NavLink>


          {/* MOBILE MENU BUTTON */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <MdClose size={28} />
            ) : (
              <HiOutlineMenuAlt3 size={28} />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={
          mobileMenu
            ? "mobile-navbar active-mobile-menu"
            : "mobile-navbar"
        }
      >
        <NavLink
          to="/"
          onClick={() => setMobileMenu(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/aboutLibrary"
          onClick={() => setMobileMenu(false)}
        >
          About
        </NavLink>

        <NavLink
          to="/contactFormLibrary"
          onClick={() => setMobileMenu(false)}
        >
          Contact
        </NavLink>

      
        <NavLink to="/admin" onClick={() => setMobileMenu(false)}>
            Admin Panel
        </NavLink>


        {!userToken && (
          <NavLink
            to="/createUser"
            onClick={() => setMobileMenu(false)}
          >
            Login / Signup
          </NavLink>
        )}

      </div>
    </>
  );
};