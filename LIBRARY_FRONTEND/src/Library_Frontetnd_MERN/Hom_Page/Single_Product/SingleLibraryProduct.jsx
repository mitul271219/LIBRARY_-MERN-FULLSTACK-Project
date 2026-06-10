import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {
  addCartThunk,
  getCartThunk,
  getSingleProductThunk,
} from "../../../ReduxStore/LibrarySlice";

import "./SingleLibraryProduct.css";

import { NavbarLibrary } from "../../Navbar_Library/NavbarLibrary";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FooterLibrary } from "../Footer_Component/FooterLibrary";

export const SingleLibraryProduct = () => {
  const state = useSelector((state) => state?.LibraryProject);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const userToken = localStorage.getItem("userTOKEN");

  const singleProductData = state?.singleProductData;

  // SALE DATE
  const currentDate = new Date();

  const saleStartDate = new Date(singleProductData?.productSaleStartDate);

  const saleEndDate = new Date(singleProductData?.productSaleEndDate);

  // CHECK SALE
  const isSaleActive =
    currentDate >= saleStartDate && currentDate <= saleEndDate;

  // GET CART IDS
  const cartProductIds =
    state?.getCartData?.map((item) => item?.productId?._id) || [];

  // CHECK ALREADY IN CART
  const isAlreadyInCart = cartProductIds.includes(singleProductData?._id);

  const checkUserLogin = () => {
    if (!userToken) {
      toast.error("Please Login / Sign Up First");
      return false;
    }
    return true;
  };

  useEffect(() => {
    dispatch(getSingleProductThunk(id));

    if (userToken) {
      dispatch(getCartThunk(userToken));
    }
  }, [dispatch, id, userToken]);

  const isLibraryLoading = useSelector(
    (state) => state.LibraryProject.isLibraryLoading
  );

  const discountPercentage = singleProductData?.productOrgPrice
    ? Math.round(
        ((singleProductData.productOrgPrice -
          singleProductData.productSalePrice) /
          singleProductData.productOrgPrice) *
          100
      )
    : 0;

  if (isLibraryLoading) {
    return (
      <>
        <NavbarLibrary />
        <div className="single-loader-wrapper">
          <div className="single-loader"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarLibrary />

      <div className="single-product-page container">
        <div className="row align-items-center g-5">
          {/* IMAGE SECTION */}
          <div className="col-lg-6">
            <div className="product-image-card">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {state?.multipleImages?.map((ele, index) => (
                    <div
                      key={ele?._id}
                      className={
                        index === 0 ? "carousel-item active" : "carousel-item"
                      }
                    >
                      <img
                        className="d-block w-100 slider-image"
                        src={`http://localhost:3011/upload_Image_Products_&_Category/${ele?.productImage}`}
                        alt="product"
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    style={{ filter: "brightness(0)" }}
                  ></span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    style={{ filter: "brightness(0)" }}
                  ></span>
                </button>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="col-sm">
            <div className="single-product-details">
              {/* CATEGORY */}
              <span className="category-badge">
                {singleProductData?.productCategory?.categoryName}
              </span>

              {/* PRODUCT NAME */}
              <h1 className="product-title">
                {singleProductData?.productName}
              </h1>

              {/* DESCRIPTION */}
              <p className="product-description">
                {singleProductData?.productDesc}
              </p>

              {/* PRICE */}
              <div className="price-section">
                {isSaleActive ? (
                  <>
                    <h3 className="sale-price">
                      ₹ {singleProductData?.productSalePrice}
                    </h3>

                    <h5 className="org-price">
                      <del>₹ {singleProductData?.productOrgPrice}</del>
                    </h5>

                    <span className="discount-badge">
                      {discountPercentage}% OFF
                    </span>

                    <span className="sale-badge">Sale Live</span>
                  </>
                ) : (
                  <>
                    <h3 className="normal-price">
                      ₹ {singleProductData?.productOrgPrice}
                    </h3>

                    <span className="expired-badge">Sale Ended</span>
                  </>
                )}
              </div>

              {/* SALE DATE */}
              <div className="sale-date-box">
                <p>
                  <strong>Sale Start :</strong>

                  {new Date(
                    singleProductData?.productSaleStartDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Sale End :</strong>

                  {new Date(
                    singleProductData?.productSaleEndDate
                  ).toLocaleDateString()}
                </p>
              </div>

              {/* ADD TO CART */}
              {/* ACTION BUTTONS */}
              <div className="product-action-buttons">
                {/* READ BOOK */}
                {/* <a
                        href={singleProductData?.readBookLink}
                        target="_blank"
                        rel="noreferrer"
                        >
                        <button className="read-book-btn">
                            Read Book
                        </button>
                    </a> */}
                <button
                  className="read-book-btn"
                  onClick={() => {
                    if (!checkUserLogin()) return;
                    window.open(singleProductData?.readBookLink, "_blank");
                  }}
                >
                  📖 Read Book
                </button>

                {/* ADD TO CART */}
                <button
                  disabled={isAlreadyInCart}
                  className={
                    isAlreadyInCart ? "buy-btn already-cart-btn" : "buy-btn"
                  }
                  onClick={() => {
                    if (!checkUserLogin()) return;
                    if (isAlreadyInCart) return;

                    dispatch(
                      addCartThunk({
                        productId: singleProductData?._id,
                        token: userToken,
                      })
                    ).then(() => {
                      toast.success("Added To Cart");
                      dispatch(getCartThunk(userToken));
                    });
                  }}
                >
                  {isAlreadyInCart ? "✓ Already Added" : "🛒 Add To Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLibrary />
    </>
  );
};
