import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CreateUser } from "./Library_Frontetnd_MERN/Users/CreateUser";
import { LoginUser } from "./Library_Frontetnd_MERN/Users/LoginUser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userTokenCheckPostMethod } from "./ReduxStore/LibrarySlice";
import { HomePgeLibrary } from "./Library_Frontetnd_MERN/Hom_Page/HomePgeLibrary";
import { ContactFormLibrary } from "./Library_Frontetnd_MERN/Users/ContactFormLibrary";
import { AdminUserCategory } from "./Library_Frontetnd_MERN/Admin_Users/AdminUserCategory";
import { UserForgetPassword } from "./Library_Frontetnd_MERN/Users/UserForgetPassword";
import { UserResetPassLink } from "./Library_Frontetnd_MERN/Users/UserResetPassLink";
import { AdminUserAddProducts } from "./Library_Frontetnd_MERN/Admin_Users/AdminUserAddProducts";
import { toast } from 'react-toastify';
import { SingleLibraryProduct } from "./Library_Frontetnd_MERN/Hom_Page/Single_Product/SingleLibraryProduct";
import { CartPage } from "./Library_Frontetnd_MERN/Users/CartPage";

import { PaymentSuccess } from "./Library_Frontetnd_MERN/Users/PaymentSuccess";
import { OrderPage } from "./Library_Frontetnd_MERN/Users/OrderPage";
import { OrderHistory } from "./Library_Frontetnd_MERN/Users/OrderHistory";
import { AboutLibrary } from "./Library_Frontetnd_MERN/Hom_Page/About_Component/AboutLibrary";
import { NotFound } from "./Library_Frontetnd_MERN/404NotFoundPage/NotFound";


function App() {

  const dispatch = useDispatch()
  const navigate  = useNavigate()

  const userToken = localStorage.getItem('userTOKEN')
  // console.log(userToken);



  useEffect(() => {
    // console.log("call app.js before token");
    if (!userToken) return; // if no token, skip and next stop the code
    // console.log("call app.js after token");

    const checkToken = async () => {
      // console.log("call app.js function token");
      try {
        const res = await dispatch(userTokenCheckPostMethod( userToken ));
        // console.log("Token Check Response:", res);
  
        if (res?.payload?.data?.msg === "rejectionUSER_Token") {
          // console.log("rejection of local storage");
          localStorage.removeItem("userID");
          localStorage.removeItem("userEMAIL");
          localStorage.removeItem("userNAME");
          localStorage.removeItem("userTOKEN");
          localStorage.removeItem("userADMIN");
          navigate("/createUser");
         toast.error('Session Is expired , (Please Log In Again)')
        }
      } catch (err) {
        console.error("Token check error:", err);
      }
    };
  
    // 🔸 Run first check immediately
    checkToken();
  
    // 🔸 Then check every 30 seconds (or 1 minute)
    const intervalId = setInterval(checkToken, 10000); // 60000 = 1 minute
  
    // 🔸 Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [userToken, dispatch, navigate]);

  



  return (
    <>
      <Routes>
        {/* <Route path='/' element={<HomePage/>}/> */}
        {/* <Route path="/" element={<Home2 />} />
        <Route path="/singleProduct/:id" element={<Singleproduct />} />
        <Route path="/createproduct" element={<Createproduct />} /> */}

        {/* Library  */}
        <Route path="/" element={<HomePgeLibrary />} />
        <Route path="/aboutLibrary" element={<AboutLibrary />} />
        <Route path="/singleProductLibrary/:id" element={<SingleLibraryProduct />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/loginUser" element={<LoginUser />} />
        <Route path="/forgotPasswordUser" element={<UserForgetPassword/>} />
        <Route path="/userpassreset/:rtoken" element={<UserResetPassLink />} />
        <Route path="/contactFormLibrary" element={<ContactFormLibrary />} />
        <Route path="/adminUsercateGory" element={<AdminUserCategory />} />
        <Route path="/adminUserAddProducts" element={<AdminUserAddProducts />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />}/>
        <Route path="/order" element={<OrderPage />}/>
        <Route path="/orderHistory" element={<OrderHistory />} />
         {/* 404 PAGE (IMPORTANT) */}
         <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
