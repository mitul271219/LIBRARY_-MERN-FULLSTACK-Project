import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  clearCartThunk,
  createOrderThunk,
} from "../../ReduxStore/LibrarySlice";

import { useNavigate } from "react-router-dom";
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";

export const OrderPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cartData = useSelector((state) => state.LibraryProject.cartData);

  const token = localStorage.getItem("userTOKEN");

  // ADDRESS
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    addressLine: "",
  });

  // PAYMENT METHOD
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // TOTAL PRICE
  const totalPrice = cartData?.reduce(
    (acc, item) => {
      return acc + item.quantity * item?.productId?.productSalePrice;
    },

    0
  );

  // PRODUCTS ARRAY
  const products = cartData?.map((item) => {
    return {
      productId: item?.productId?._id,
      quantity: item?.quantity,
    };
  });

  // PLACE ORDER
  const handleOrder = () => {
    dispatch(
      createOrderThunk({
        token,
        products,
        address,
        paymentMethod,
        totalPrice,
      })
    ).then((res) => {
      dispatch(clearCartThunk(token));
      navigate("/orderHistory");
    });
  };

  return (
    <>
      <NavbarLibrary />
      <div className="container mt-5">
        <h1>Checkout Page</h1>

        {/* FULL NAME */}
        <input
          type="text"
          placeholder="Full Name"
          className="form-control mb-3"
          onChange={(e) =>
            setAddress({
              ...address,
              fullName: e.target.value,
            })
          }
        />

        {/* MOBILE */}
        <input
          type="text"
          placeholder="Mobile Number"
          className="form-control mb-3"
          onChange={(e) =>
            setAddress({
              ...address,
              mobile: e.target.value,
            })
          }
        />

        {/* CITY */}
        <input
          type="text"
          placeholder="City"
          className="form-control mb-3"
          onChange={(e) =>
            setAddress({
              ...address,
              city: e.target.value,
            })
          }
        />

        {/* STATE */}
        <input
          type="text"
          placeholder="State"
          className="form-control mb-3"
          onChange={(e) =>
            setAddress({
              ...address,
              state: e.target.value,
            })
          }
        />

        {/* PINCODE */}
        <input
          type="text"
          placeholder="Pincode"
          className="form-control mb-3"
          onChange={(e) =>
            setAddress({
              ...address,
              pincode: e.target.value,
            })
          }
        />

        {/* ADDRESS */}
        <textarea
          placeholder="Address"
          className="form-control mb-3"
          onChange={(e) =>
            setAddress({
              ...address,
              addressLine: e.target.value,
            })
          }
        />

        {/* PAYMENT METHOD */}

        <h3>Select Payment Method</h3>

        <div className="mb-3">
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash On Delivery
        </div>

        <div className="mb-3">
          <input
            type="radio"
            checked={paymentMethod === "FAKE_ONLINE"}
            onChange={() => setPaymentMethod("FAKE_ONLINE")}
          />
          Fake Online Payment
        </div>

        {/* TOTAL */}

        <h2>Total Price : ₹ {totalPrice}</h2>

        {/* ORDER BUTTON */}

        <button className="btn btn-success" onClick={handleOrder}>
          Place Order
        </button>
      </div>
      <FooterLibrary />
    </>
  );
};
