import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateUser.css";
import { NavLink, useNavigate } from "react-router-dom";
import { createUsersApiPostMethod } from "../../ReduxStore/LibrarySlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";

export const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUP, setSignUP] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleSignUP = (e) => {
    const Name = e.target.name;
    const Val = e.target.value;
    setSignUP({ ...signUP, [Name]: Val });
  };

  const HandleClick = () => {
    // Validation Start
    if (signUP.name === "" && signUP.email === "" && signUP.password === "") {
      toast.error("Please fill all three fields");
      return;
    }

    if (signUP.name === "") {
      toast.error("Please fill Name field");
      return;
    }

    if (signUP.email === "") {
      toast.error("Please fill Email field");
      return;
    }

    if (signUP.password === "") {
      toast.error("Please fill Password field");
      return;
    }

    // ✅ Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(signUP.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // If all fields are filled
    dispatch(createUsersApiPostMethod(signUP)).then((res) => {
      console.log(res);
      if (res?.meta?.requestStatus === "fulfilled") {
        setSignUP({
          name: "",
          email: "",
          password: "",
        });
        toast.success(res?.payload?.statusMsg);
        localStorage.setItem("userID", res?.payload?.userID);
        localStorage.setItem("userEMAIL", res?.payload?.usermail);
        localStorage.setItem("userNAME", res?.payload?.userName);
        localStorage.setItem("userTOKEN", res?.payload?.usersTokens);
        localStorage.setItem("userADMIN", res?.payload?.SingUpAllData?.isAdmin);
        // storeAdminToken( res?.payload?.data?.adminTokens)
        navigate("/");
      } else {
        toast.error(res?.payload?.response?.data?.msg);
      }
    });
  };

  return (
    <>
      <NavbarLibrary />

      <div className="loginContainer">
        <div className="loginCard">
          <h2>___SignUP___</h2>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={signUP.name}
            onChange={HandleSignUP}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={signUP.email}
            onChange={HandleSignUP}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={signUP.password}
            onChange={HandleSignUP}
          />

          <button onClick={HandleClick}>Sign Up</button>

          <p>
            Already have an account?
            <NavLink to="/loginUser"> LogIn</NavLink>
          </p>
        </div>
      </div>
      <FooterLibrary />
    </>
  );
};
