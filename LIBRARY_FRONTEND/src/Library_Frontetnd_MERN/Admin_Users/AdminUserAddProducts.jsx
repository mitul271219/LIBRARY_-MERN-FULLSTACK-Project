import React, { useEffect, useState } from "react";
import "./AdminUserAddProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AdminUserCategoryGET,
  deleteProductThunk,
  getAddProduct,
  postAddProduct,
  postMutipleImages,
  updateProductStatusThunk,
} from "../../ReduxStore/LibrarySlice";
import { toast } from "react-toastify";

export const AdminUserAddProducts = () => {
  const state = useSelector((state) => state?.LibraryProject);
  console.log(state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userName = localStorage.getItem("userNAME");
  // const userEmaiil = localStorage.getItem("userEMAIL");
  const userToken = localStorage.getItem("userTOKEN");
  const userAdmin = localStorage.getItem("userADMIN");

  const [loading, setLoading] = useState(true);
  const productStatus = (status, id) => {
    // setProductsStatus(status);
    // console.log(status , id);
    dispatch(updateProductStatusThunk({ status, id })).then((res) => {
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        toast.success(res.payload.msg);
        dispatch(getAddProduct());
      } else {
        toast.error("Something else wrong & Server issues");
      }
    });
  };

  const [productData, setProductData] = useState({
    categoryName: "",
    productThumbnail: null,
    productName: "",
    productDescription: "",
    readBookLink: "",
    productPrice: "",
    productSalePrice: "",
    saleStartDate: "",
    saleEndDate: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    dispatch(postAddProduct(formData)).then((res) => {
      if (res.payload?.status === 200) {
        setProductData({
          categoryName: "",
          productThumbnail: null,
          productName: "",
          productDescription: "",
          readBookLink: "",
          productPrice: "",
          productSalePrice: "",
          saleStartDate: "",
          saleEndDate: "",
        });
        dispatch(getAddProduct());
      }
    });
  };

  const deleteProduct = (deleteID) => {
    // console.log(deleteID);
    dispatch(deleteProductThunk(deleteID));
  };

  // open model
  const [uploadLoading, setUploadLoading] = useState(false);
  const [ismodelOpen, setIsmodelOpen] = useState(null);
  const [imageFile, setImageFile] = useState([]);
  const openModel = (id) => {
    setIsmodelOpen(id);
    // setIsmodelOpenID(id)
  };
  const closeModel = () => {
    setIsmodelOpen(null);
    setImageFile([]);
  };

  const handleFileChange = (e) => {
    // console.log(e.target.files);
    // setImageFile(e.target.files[0]);
    setImageFile([...e.target.files]); // new implement for multiple image
  };

  // const handleUploadImage = (e) => {
  //   const formData = new FormData();
  //   formData.append("multiImages", imageFile);
  //   formData.append("proID", ismodelOpen);
  //   // console.log(ismodelOpen ,formData);
  //   dispatch(postMutipleImages({ ismodelOpen, formData }));
  // };

  const handleUploadImage = async () => {
    try {
      if (imageFile.length === 0) {
        toast.error("Please Select Images");

        return;
      }

      setUploadLoading(true);

      const formData = new FormData();

      imageFile.forEach((file) => {
        formData.append("multiImages", file);
      });

      formData.append("proID", ismodelOpen);

      const response = await dispatch(
        postMutipleImages({
          ismodelOpen,
          formData,
        })
      );

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Multiple Images Added Successfully");

        setIsmodelOpen(null);

        setImageFile([]);
      } else {
        toast.error("Something Else Wrong");
      }
    } catch (err) {
      toast.error("Something Else Wrong");
    } finally {
      setUploadLoading(false);
    }
  };

  // search Functionality
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = state?.libraryBooks?.productGet?.filter(
    (product) =>
      product?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.productDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product?.productCategory?.categoryName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product?.productOrgPrice?.toString().includes(searchTerm) ||
      product?.productSalePrice?.toString().includes(searchTerm)
  );

  // ✅ Loading effect (first visit)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 sec loader
  }, []);

  useEffect(() => {
    if (userAdmin === null) {
      toast.error("Please Loin/SignUP");
      navigate("/loginUser");
    } else if (userAdmin === "false") {
      toast.error("Only Access Admin User");
      navigate("/");
      // navigate("/homeLibrary");
    } else {
      dispatch(AdminUserCategoryGET(userToken));
      dispatch(getAddProduct());
      setTimeout(() => {
        setLoading(false);
      }, 1500); // 1.5 sec loader
    }
  }, [dispatch, userToken, navigate, userAdmin]);

  // ✅ Spinner UI
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <>

        <div className="admin-page">
          {/* ================= FORM SECTION ================= */}
          <div className="admin-card">
            <h2 className="page-title">📚 Add New Book</h2>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="input-group">
                <label>Category</label>

                <select
                  name="categoryName"
                  value={productData.categoryName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>

                  {state?.libraryCategory?.adminGetCategory?.map((ele) => (
                    <option key={ele._id} value={ele._id}>
                      {ele.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Thumbnail</label>

                <input
                  type="file"
                  name="productThumbnail"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Book Name</label>

                <input
                  type="text"
                  name="productName"
                  value={productData.productName}
                  onChange={handleChange}
                  placeholder="Enter Book Name"
                  required
                />
              </div>

              <div className="input-group">
                <label>Description</label>

                <textarea
                  name="productDescription"
                  value={productData.productDescription}
                  onChange={handleChange}
                  placeholder="Enter Description"
                />
              </div>

              <div className="input-group">
                <label>Read Book Link</label>

                <input
                  type="text"
                  name="readBookLink"
                  value={productData.readBookLink}
                  onChange={handleChange}
                  placeholder="Paste Book Read URL"
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Price</label>

                  <input
                    type="number"
                    name="productPrice"
                    value={productData.productPrice}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Sale Price</label>

                  <input
                    type="number"
                    name="productSalePrice"
                    value={productData.productSalePrice}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Sale Start</label>

                  <input
                    type="date"
                    name="saleStartDate"
                    value={productData.saleStartDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>Sale End</label>

                  <input
                    type="date"
                    name="saleEndDate"
                    value={productData.saleEndDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Add Book
              </button>
            </form>
          </div>

          {/* ================= PRODUCTS SECTION ================= */}

          <div className="admin-card">
            <h2 className="page-title">📚 Added Books</h2>

            <div className="search-bar-container">
              <input
                type="text"
                style={{ textAlign: "center" }}
                placeholder="Search (books , Price , Category)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="products-grid">
              {filteredProducts?.map((product, index) => (
                <div className="product-card" key={product._id}>
                  <img
                    // For localhost API use 
                    // src={`http://localhost:3011/upload_Image_Products_&_Category/${product?.productThumb}`}
                    src={`https://library-mern-fullstack-project.onrender.com/upload_Image_Products_&_Category/${product?.productThumb}`}
                    alt={product?.productName}
                    className="product-image"
                  />

                  <div className="product-content">
                    <u>
                      <b>{product?.productCategory?.categoryName}</b>
                    </u>

                    <h3>{product?.productName}</h3>

                    <p className="price">
                      ₹ <del>{product?.productOrgPrice}</del>
                    </p>
                    <p className="price">Sale: ₹ {product?.productSalePrice}</p>

                    <select
                      className="status-select"
                      value={product?.productStatus}
                      onChange={(e) =>
                        productStatus(e.target.value, product._id)
                      }
                    >
                      <option value="enable">Enable</option>
                      <option value="pending">Pending</option>
                      <option value="disable">Disable</option>
                    </select>

                    <div className="button-group">
                      <button
                        className="delete-btn"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>

                      <button
                        className="upload-btn"
                        onClick={() => openModel(product._id)}
                      >
                        Upload Image
                      </button>
                    </div>

                    {ismodelOpen === product._id && (
                      <div className="upload-modal">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />

                        <div className="modal-buttons">
                          {/* <button onClick={handleUploadImage}>
                        Upload
                      </button> */}
                          <button
                            onClick={handleUploadImage}
                            disabled={uploadLoading}
                          >
                            {uploadLoading
                              ? "Uploading..."
                              : "Upload Slider Images"}
                          </button>

                          <button onClick={closeModel}>Close</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
     
    </>
  );
};
