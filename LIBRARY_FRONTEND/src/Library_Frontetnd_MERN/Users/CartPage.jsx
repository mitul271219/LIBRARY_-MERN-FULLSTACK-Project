import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  clearCartThunk,
  getCartThunk,
  removeCartThunk,
  updateCartThunk,
} from "../../ReduxStore/LibrarySlice";

import "./CartPage.css";
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";

export const CartPage = () => {
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.LibraryProject.cartData);
  console.log(cartData);
  const navigate = useNavigate();

  const token = localStorage.getItem("userTOKEN");
  //   const userToken = localStorage.getItem('userTOKEN');

  useEffect(() => {
    if (!token) {
      toast.error("Please Loin/SignUP");
      navigate("/loginUser");
    } else if (token) {
      dispatch(getCartThunk(token));
    }
  }, [dispatch, token, navigate]);

  // TOTAL PRICE
  const totalPrice = cartData?.reduce((acc, item) => {
    return acc + item.quantity * item?.productId?.productSalePrice;
  }, 0);

  return (
    <>
      <NavbarLibrary />

      <div className="cart-container">
        <div className="cart-header">
          <h1>My Cart ({cartData?.length})</h1>

          {/* CLEAR ALL BTN */}
          {cartData?.length > 0 && (
            <button
              className="clear-cart-btn"
              onClick={() => {
                dispatch(clearCartThunk(token));
              }}
            >
              Delete All Products
            </button>
          )}
        </div>

        {cartData?.cartLoading ? (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        ) : cartData?.length === 0 ? (
          <h2 className="empty-cart">Cart Is Empty</h2>
        ) : (
          cartData?.map((item) => {
            return (
              <div key={item._id} className="cart-card">
                {/* IMAGE */}
                <img
                // for localhost API use
                  // src={`http://localhost:3011/upload_Image_Products_&_Category/${item?.productId?.productThumb}`}
                  src={`https://library-mern-fullstack-project.onrender.com/upload_Image_Products_&_Category/${item?.productId?.productThumb}`}
                  alt={item?.productId?.productName}
                  className="cart-image"
                />

                {/* DETAILS */}
                <div className="cart-details">
                  <h3>{item?.productId?.productName}</h3>

                  <h4>₹ {item?.productId?.productSalePrice}</h4>

                  <p>Quantity :{item.quantity}</p>

                  <h5>
                    Total : ₹{item.quantity * item?.productId?.productSalePrice}
                  </h5>

                  {/* QUANTITY */}
                  <div className="quantity-box">
                    {/* DECREASE */}
                    <button
                      onClick={() => {
                        dispatch(
                          updateCartThunk({
                            cartId: item._id,
                            type: "dec",
                            token,
                          })
                        ).then(() => {
                          dispatch(getCartThunk(token));
                        });
                      }}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    {/* INCREASE */}
                    <button
                      onClick={() => {
                        dispatch(
                          updateCartThunk({
                            cartId: item._id,
                            type: "inc",
                            token,
                          })
                        ).then(() => {
                          dispatch(getCartThunk(token));
                        });
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE BTN */}
                  <button
                    className="remove-btn"
                    onClick={() => {
                      dispatch(
                        removeCartThunk({
                          cartId: item._id,
                          token,
                        })
                      );
                    }}
                  >
                    Remove Product
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* TOTAL PRICE */}
        {cartData?.length > 0 && (
          <div className="cart-total-box">
            <h2>Grand Total : ₹ {totalPrice}</h2>

            <button className="buy-btn" onClick={() => navigate("/order")}>
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>
      <FooterLibrary />
    </>
  );
};
