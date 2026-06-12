import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistoryThunk } from "../../ReduxStore/LibrarySlice";
import "./Orders.css";

export const Orders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.LibraryProject.orderHistory
  );

  useEffect(() => {
    const token = localStorage.getItem("userTOKEN");
    dispatch(getOrderHistoryThunk(token));
  }, [dispatch]);

  return (
    <div className="orders-container">
      <h2 className="orders-title">📦 Orders</h2>

      {orders?.length === 0 ? (
        <div className="empty-orders">
          <h3>No Orders Found</h3>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders?.map((order) => (
          <div key={order._id} className="order-card">
            {/* Header */}
            <div className="order-header">
              <div>
                <h4>Order #{order._id.slice(-6)}</h4>
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <span className="payment-badge">
                {order.paymentMethod}
              </span>
            </div>

            {/* Address */}
            <div className="address-box">
              <h5>Shipping Address</h5>

              <p>
                <strong>{order.address.fullName}</strong>
              </p>

              <p>{order.address.mobile}</p>

              <p>
                {order.address.addressLine},
                {" "}
                {order.address.city}
              </p>
            </div>

            {/* Products */}
            <div className="products-section">
              {order.products.map((p) => (
                <div
                  key={p._id}
                  className="product-item"
                >
                  <img
                    src={`https://library-mern-fullstack-project.onrender.com/upload_Image_Products_&_Category/${p.productId.productThumb}`}
                    alt={p.productId.productName}
                  />

                  <div className="product-info">
                    <h5>{p.productId.productName}</h5>
                    <p>Qty: {p.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="order-footer">
              <h3>₹ {order.totalPrice}</h3>

            
            </div>
          </div>
        ))
      )}
    </div>
  );
};