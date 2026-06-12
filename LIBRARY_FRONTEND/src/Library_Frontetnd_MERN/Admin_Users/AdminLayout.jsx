// import React, { useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import "./admin.css";
// import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
// import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";
// import { toast } from "react-toastify";

// export const AdminLayout = () => {

//     const navigate = useNavigate();

//     const userAdmin = localStorage.getItem("userADMIN");

//          useEffect(() => {
//             if (userAdmin === null) {
//               toast.error("Please Loin/SignUP");
//               navigate("/loginUser");
//             } else if (userAdmin === "false") {
//               toast.error("Only Access Admin User");
//               navigate("/");
//             }
//           }, [ navigate, userAdmin]);



//   return (
//    <>

// <NavbarLibrary />
//     <div className="admin-container">
      
//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <h2>📚 Admin Panel</h2>

//         <Link to="/admin">Dashboard</Link>
//         <Link to="/admin/users">Users</Link>
//         <Link to="/admin/orders">Orders</Link>
//         <Link to="/admin/contacts">Contacts</Link>
//         <Link to="/admin/categories">Categories</Link>
//         <Link to="/admin/products">Products</Link>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main-content">
//         <Outlet />
//       </div>

//     </div>

//     <FooterLibrary/>

//    </>
//   );
// };




import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./admin.css";
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";
import { toast } from "react-toastify";

export const AdminLayout = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userAdmin = localStorage.getItem("userADMIN");

    if (userAdmin === null) {
      toast.error("Please Login/Sign Up");
      navigate("/loginUser");
    } else if (userAdmin === "false") {
      toast.error("Only Admin Can Access");
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <h3>Loading Admin Panel...</h3>
      </div>
    );
  }

  return (
    <>
      <NavbarLibrary />

      <div className="admin-container">
        <div className="sidebar">
          <h2>📚 Admin Panel</h2>

          {/* <Link to="/admin">Dashboard</Link> */}
          <Link to="/admin">Users</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/contacts">Contacts</Link>
          <Link to="/admin/categories">Categories</Link>
          <Link to="/admin/products">Products</Link>
        </div>

        <div className="main-content">
          <Outlet />
        </div>
      </div>

      <FooterLibrary />
    </>
  );
};