
import React, { useEffect, useMemo, useState } from "react";
import "./HomePageLibrary.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  AdminUserCategoryGET,
  getAddProduct,
  getCartThunk,
} from "../../ReduxStore/LibrarySlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { ClipLoader } from "react-spinners";

import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { FooterLibrary } from "./Footer_Component/FooterLibrary";
import { AboutLibrary } from "./About_Component/AboutLibrary";



export const HomePgeLibrary = () => {
  const state = useSelector((state) => state?.LibraryProject);

  const dispatch = useDispatch();

  const userToken = localStorage.getItem("userTOKEN");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    dispatch(AdminUserCategoryGET(userToken));
    dispatch(getAddProduct());

    if (userToken) {
      dispatch(getCartThunk(userToken));
    }
  }, [dispatch, userToken]);

  // ALL PRODUCTS
  const allProducts = Array.isArray(state?.libraryBooks?.productGet)
    ? state?.libraryBooks?.productGet
    : [];

  // CART PRODUCTS IDS
  const cartProductIds =
    state?.getCartData?.map((item) => item?.productId?._id) || [];

  // SEARCH FILTER
  const filteredProducts = useMemo(() => {
    return allProducts.filter((ele) => {
      const title = ele?.productName?.toLowerCase() || "";
      const category = ele?.productCategory?.categoryName?.toLowerCase() || "";
      const salePrice = ele?.productSalePrice?.toString() || "";
      const orgPrice = ele?.productOrgPrice?.toString() || "";

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        title.includes(search) ||
        category.includes(search) ||
        salePrice.includes(search) ||
        orgPrice.includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        ele?.productCategory?.categoryName === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchTerm, selectedCategory]);




  return (
    <>
    
      <NavbarLibrary />
      <AboutLibrary/>

      {/* HERO SEARCH */}
      <div className="search-hero">
        <div className="search-wrapper">

          {/* SEARCH BAR */}
          <div className="modern-search-bar">

            <Search size={20} className="search-icon" />

            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <button
                className="clear-btn"
                onClick={() => setSearchTerm("")}
              >
                <X size={18} />
              </button>
            )}

          </div>

          {/* CATEGORY FILTER */}
          <div className="category-filter desktop-filter">

            <button
              className={
                selectedCategory === "All"
                  ? "category-btn active-category"
                  : "category-btn"
              }
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>

            {state?.libraryCategory?.adminGetCategory?.map((cat) => (
              <button
                key={cat?._id}
                className={
                  selectedCategory === cat?.categoryName
                    ? "category-btn active-category"
                    : "category-btn"
                }
                onClick={() => setSelectedCategory(cat?.categoryName)}
              >
                {cat?.categoryName}
              </button>
            ))}
          </div>

          {/* MOBILE FILTER BTN */}
          <button
            className="mobile-filter-btn"
            onClick={() => setShowMobileFilter(!showMobileFilter)}
          >
            <SlidersHorizontal size={20} />
          </button>

          {/* MOBILE FILTER */}
          {showMobileFilter && (
            <div className="mobile-filter-menu">

              <button
                className={
                  selectedCategory === "All"
                    ? "category-btn active-category"
                    : "category-btn"
                }
                onClick={() => {
                  setSelectedCategory("All");
                  setShowMobileFilter(false);
                }}
              >
                All
              </button>

              {state?.libraryCategory?.adminGetCategory?.map((cat) => (
                <button
                  key={cat?._id}
                  className={
                    selectedCategory === cat?.categoryName
                      ? "category-btn active-category"
                      : "category-btn"
                  }
                  onClick={() => {
                    setSelectedCategory(cat?.categoryName);
                    setShowMobileFilter(false);
                  }}
                >
                  {cat?.categoryName}
                </button>
              ))}

            </div>
          )}

        </div>
      </div>

      {/* PRODUCTS */}
      <div className="home-container">

        {state?.libraryCategory?.adminGetCategory?.map((cat) => {

          const categoryProducts = filteredProducts.filter(
            (ele) =>
              ele?.productCategory?.categoryName === cat?.categoryName
          );

          if (categoryProducts.length === 0) return null;

          return (
            <div key={cat?._id} className="category-section">

              <div className="section-header">
                <h2>{cat?.categoryName}</h2>

                <span>
                  <b>{categoryProducts.length}</b> Books
                </span>
              </div>

              <Swiper
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                autoplay={{ delay: 2500 }}
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {state?.isLoading ? (
                  <div className="spinner-container">
                    <ClipLoader color="#000" size={50} />
                  </div>
                ) : (
                  categoryProducts.map((ele) => {

                    // PRODUCT STATUS
                    const isDisabled =
                      ele?.productStatus === "disable";

                    const isPending =
                      ele?.productStatus === "pending";

                    // CART CHECK
                    const isInCart =
                      cartProductIds.includes(ele?._id);

                    return (
                      <SwiperSlide key={ele?._id}>

                        <NavLink
                          to={
                            isDisabled || isPending
                              ? "#"
                              : `/singleProductLibrary/${ele?._id}`
                          }

                          className={
                            isDisabled
                              ? "product-card disabled-product"
                              : isPending
                              ? "product-card pending-product"
                              : isInCart
                              ? "product-card cart-added-product"
                              : "product-card"
                          }

                          onClick={(e) => {
                            if (isDisabled || isPending) {
                              e.preventDefault();
                            }
                          }}
                        >

                          {/* DISABLED BADGE */}
                          {isDisabled && (
                            <div className="disabled-badge">
                              Currently Unavailable
                            </div>
                          )}

                          {/* PENDING BADGE */}
                          {isPending && (
                            <div className="pending-badge">
                              Coming Soon
                            </div>
                          )}

                          {/* ADDED BADGE */}
                          {isInCart && (
                            <div className="cart-added-badge">
                              Added To Cart
                            </div>
                          )}

                          {/* PRODUCT IMAGE */}
                          <div className="product-image-container">

                            <img
                              src={`http://localhost:3011/upload_Image_Products_&_Category/${ele?.productThumb}`}
                              alt={ele?.productName}
                              className="product-image"
                            />

                          </div>

                          {/* PRODUCT INFO */}
                          <div className="product-info">

                            <h4>{ele?.productName}</h4>

                            <p className="product-category">
                              {ele?.productCategory?.categoryName}
                            </p>

                            <div className="price-box">

                              <span className="sale-price">
                                ₹ {ele?.productSalePrice}
                              </span>

                              <span className="org-price">
                                ₹ {ele?.productOrgPrice}
                              </span>

                            </div>

                            <button
                              disabled={
                                isDisabled ||
                                isPending ||
                                isInCart
                              }
                              className={
                                isDisabled
                                  ? "view-btn disabled-btn"
                                  : isPending
                                  ? "view-btn pending-btn"
                                  : isInCart
                                  ? "view-btn added-cart-btn"
                                  : "view-btn"
                              }
                            >
                              {isDisabled
                                ? "Unavailable"
                                : isPending
                                ? "Coming Soon"
                                : isInCart
                                ? "Added To Cart"
                                : "View Product"}
                            </button>

                          </div>

                        </NavLink>

                      </SwiperSlide>
                    );
                  })
                )}
              </Swiper>

            </div>
          );
        })}

      </div>

      <FooterLibrary/>
      
    </>
  );
};