import React, { useEffect } from "react";
import "./OrderHistory.css";

import { useDispatch, useSelector } from "react-redux";

import { getOrderHistoryThunk } from "../../ReduxStore/LibrarySlice";
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";

export const OrderHistory = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("userTOKEN");

  const orders = useSelector((state) => state.LibraryProject.orderHistory);
  console.log(orders);

  useEffect(() => {
    if (token) {
      dispatch(getOrderHistoryThunk(token));
    }
  }, [dispatch, token]);

  return (
    <>
      <NavbarLibrary />

      <div className="order-history-page container">
        <div className="order-history-header">
          <h2>My Orders</h2>
          <p>Track all your recent purchases here</p>
        </div>

        {orders?.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              {/* TOP */}
              <div className="order-top">
                <div>
                  <h4 className="order-id">Order #{order._id.slice(-8)}</h4>

                  <p className="order-status">🚚 Delivered in 2 days</p>
                </div>

                <div className="payment-badge">{order.paymentMethod}</div>
              </div>

              {/* ADDRESS */}
              <div className="address-box">
                <h5>Delivery Address</h5>

                <p>{order?.address?.fullName}</p>

                <p>{order?.address?.mobile}</p>

                <p>
                  {order?.address?.addressLine}, {order?.address?.city} -{" "}
                  {order?.address?.pincode}
                </p>
              </div>

              {/* PRODUCTS */}
              <div className="products-list">
                {order.products.map((item) => (
                  <div key={item._id} className="product-row">
                    <img
                      src={`http://localhost:3011/upload_Image_Products_&_Category/${item?.productId?.productThumb}`}
                      alt="product"
                    />

                    <div className="product-info">
                      <h5>{item?.productId?.productName}</h5>

                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="order-footer">
                <span>
                  Payment Status:
                  {order.paymentStatus}
                </span>

                <h4>Total: ₹ {order.totalPrice}</h4>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-orders">No Orders Found</div>
        )}
      </div>
      <FooterLibrary />
    </>
  );
};
