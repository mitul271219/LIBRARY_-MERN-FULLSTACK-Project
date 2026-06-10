


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { AdminUserCategoryGET, AdminUserCategoryPost, deleteMernAdminCategories } from "../../ReduxStore/LibrarySlice";
import './AdminUsercategory.css';
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";

export const AdminUserCategory = () => {

  const state = useSelector((state) => state?.LibraryProject);
  console.log(state);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = localStorage.getItem('userTOKEN');
  console.log(userToken);
  const userAdmin = localStorage.getItem('userADMIN');
  console.log(userAdmin);
  

  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryImage: null,
  });

  const [loading, setLoading] = useState(true);

  const HandleChange = (e) => {
    const { name, value, files, type } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", categoryData.categoryName);
    formData.append("categoryImage", categoryData.categoryImage);

    dispatch(AdminUserCategoryPost(formData)).then((res) => {
      if (res.payload?.status === 200) {
        dispatch(AdminUserCategoryGET());
        toast.success(res?.payload?.data?.msg);
        setCategoryData({ categoryName: "", categoryImage: null });
      } else {
        toast.error(res?.payload?.response?.data?.msg);
      }
    });
  };

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id) => {
    setDeletingId(id);

    dispatch(deleteMernAdminCategories(id)).then((res) => {
      setDeletingId(null);

      if (res?.meta?.requestStatus === "fulfilled") {
        toast.success(res?.payload?.deletRes?.msg);
        dispatch(AdminUserCategoryGET());
      }
    });
  };


     // ✅ Loading effect (first visit)
         useEffect(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1500); // 1.5 sec loader
        }, []);
    

  useEffect(() => {
       if ( userAdmin === null  ) {
          toast.error("Please Loin/SignUP");
          navigate('/loginUser')
      }else if (userAdmin === "false") {
            toast.error("Only Access Admin User");
          navigate('/')
          // navigate('/homeLibrary')
      }else{
      dispatch(AdminUserCategoryGET(userToken));
        setTimeout(() => {
            setLoading(false);
        }, 1500); // 1.5 sec loader
      }
  }, [dispatch, userToken]);


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
      <NavbarLibrary />

      <div className="admin-category-page">
        <div className="container py-4">

          <div className="row g-4">

            {/* LEFT */}
            <div class="col order-first">
              <div className="form-section">
                <h3>📚 Add New Category</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Category Name</label>
                    <input
                      type="text"
                      name="categoryName"
                      value={categoryData.categoryName}
                      onChange={HandleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Category Image</label>
                    <input
                      type="file"
                      name="categoryImage"
                      onChange={HandleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <button className="btn btn-primary w-100">
                    Add Category
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT */}
            {/* <div className="col-12 col-lg-6"> */}
            <div class="col order-last">
              <div className="table-section">
                <h4>📖 Category List</h4>

                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {state?.libraryCategory?.adminGetCategory?.length > 0 ? (
                        state.libraryCategory.adminGetCategory.map((ele, index) => (
                          <tr key={ele._id}>
                            <td>{index + 1}</td>
                            <td>{ele.categoryName}</td>
                            <td>
                              <img
                                src={`http://localhost:3011/upload_Image_Products_&_Category/${ele.categoryImage}`}
                                className="table-img"
                                alt=""
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(ele._id)}
                                disabled={deletingId === ele._id}
                              >
                                {deletingId === ele._id ? "Deleting..." : "Delete"}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No Categories Found</td>
                        </tr>
                      )}
                    </tbody>

                  </table>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
      <FooterLibrary/>
    </>
  );
};









