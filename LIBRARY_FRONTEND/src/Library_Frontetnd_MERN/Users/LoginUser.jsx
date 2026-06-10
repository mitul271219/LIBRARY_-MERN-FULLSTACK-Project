import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./LoginUser.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUsersApiPostMethod } from "../../ReduxStore/LibrarySlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";

export const LoginUser = () => {
  const state = useSelector((state) => state?.LibraryProject);
  console.log(state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const HandleLogin = (e) => {
    const Name = e.target.name;
    const Val = e.target.value;

    setLogin({ ...login, [Name]: Val });
  };

  const HandleLoginClick = () => {
    if (login.email === "" && login.password === "") {
      toast.error("Please fill Email and Password fields");
      return;
    }

    if (login.email === "") {
      toast.error("Please fill Email field");
      return;
    }

    if (login.password === "") {
      toast.error("Please fill Password field");
      return;
    }

    // ✅ Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(login.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    //  If validation passed
    console.log("Login Data", login);

    dispatch(loginUsersApiPostMethod(login)).then((res) => {
      console.log(res);
      if (res?.meta?.requestStatus === "fulfilled") {
        setLogin({
          email: "",
          password: "",
        });

        toast.success(res?.payload?.statusMsg);

        localStorage.setItem("userID", res?.payload?.userID);
        localStorage.setItem("userEMAIL", res?.payload?.usermail);
        localStorage.setItem("userNAME", res?.payload?.userName);
        localStorage.setItem("userTOKEN", res?.payload?.usersTokens);
        localStorage.setItem(
          "userADMIN",
          res?.payload?.userLoginAllData?.isAdmin
        );

        navigate("/");
      } else if (res?.meta?.requestStatus === "rejected") {
        // handle all possible error formats safely
        const errorMsg =
          res?.payload?.msg ||
          res?.payload?.response?.data?.msg ||
          `${res?.payload?.message} & Backend Error` ||
          "Something went wrong";

        toast.error(errorMsg);
      }
    });
  };

  return (
    <>
      <NavbarLibrary />
      <div className="login-container">
        <div className="login-card">
          <h2>___Login___</h2>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={login.email}
            onChange={HandleLogin}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={login.password}
            onChange={HandleLogin}
          />

          <button
            onClick={HandleLoginClick}
            disabled={state?.isLibraryLoading}
            className="login-btn"
          >
            {state?.isLibraryLoading ? (
              <>
                <span className="spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p>
            <NavLink to="/forgotPasswordUser">Forgot Password ?</NavLink>
          </p>
          <p>
            Don't have an account ?<NavLink to="/createUser"> Signup</NavLink>
          </p>
        </div>
      </div>
      <FooterLibrary />
    </>
  );
};
