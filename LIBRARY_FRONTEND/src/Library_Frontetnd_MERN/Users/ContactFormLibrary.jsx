import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./ContactFormLib.css"; // css Files
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { UserContactPost } from "../../ReduxStore/LibrarySlice";
import { useNavigate } from "react-router-dom";
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";

export const ContactFormLibrary = () => {
  const state = useSelector((state) => state);
  //   const userDatasCollection = state?.react_NODE?.userDataApp2;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contactForm, setContactForm] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [userDatas, setUserDatas] = useState(true);
  const userName = localStorage.getItem("userNAME");
  const userEmaiil = localStorage.getItem("userEMAIL");
  const userToken = localStorage.getItem("userTOKEN");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userDatas && userName && userEmaiil) {
      setContactForm({
        username: userName,
        email: userEmaiil,
        message: "",
      });
      setUserDatas(false);
    }

    // simulate loading (or wait for real data)
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second loader
  }, [userDatas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!contactForm.username || !contactForm.email || !contactForm.message) {
      toast.error("All fields are required!");
      return;
    }
    // console.log(contactForm);

    dispatch(UserContactPost({ contactForm, userToken })).then((res) => {
      console.log(res);
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Message sent successfully!");
        setContactForm({
          username: "",
          email: "",
          message: "",
        });
        navigate("/");
      } else {
        toast.error(
          res?.payload?.response?.data?.message ||
            res.payload?.response?.data?.msg
        );
      }
    });
  };

  useEffect(() => {
    if (!userToken) {
      toast.error("Please Loin/SignUP");
      navigate("/loginUser");
    }
  }, [userToken, navigate]);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <NavbarLibrary />

          <div className="contact-wrapper">
            <div className="contact-card">
              <h2>📚 Contact To E-Books Library</h2>

              <input
                type="text"
                name="username"
                value={contactForm.username}
                onChange={handleInputChange}
              />

              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
              />

              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
              />

              <button onClick={handleSubmit}>Send Message</button>
            </div>
          </div>
        </>
      )}
      <FooterLibrary />
    </>
  );
};
