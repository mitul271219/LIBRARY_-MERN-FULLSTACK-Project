import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./ContactFormLib.css"; // css Files
import { NavbarLibrary } from "../Navbar_Library/NavbarLibrary";
import { UserContactPost } from "../../ReduxStore/LibrarySlice";
import { useNavigate } from "react-router-dom";
import { FooterLibrary } from "../Hom_Page/Footer_Component/FooterLibrary";

export const ContactFormLibrary = () => {
  // const state = useSelector((state) => state);
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
  }, [userDatas, userName, userEmaiil]);

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
        <NavbarLibrary/>
        <section className="contact-section">
  <div className="contact-container">

    {/* Left Side */}
    <div className="contact-info">
      <div className="contact-content">
        <h1>📚 Get In Touch</h1>
        <p>
          Have questions about books, orders, memberships, or our services?
          Send us a message and we'll get back to you as soon as possible.
        </p>

        <div className="info-box">
          <span>📍</span>
          <div>
            <h4>Location</h4>
            <p>Ahmedabad, Gujarat, India</p>
          </div>
        </div>

        <div className="info-box">
          <span>📧</span>
          <div>
            <h4>Email</h4>
            <p>support@library.com</p>
          </div>
        </div>

        <div className="info-box">
          <span>📞</span>
          <div>
            <h4>Phone</h4>
            <p>+91 9876543210</p>
          </div>
        </div>
      </div>
    </div>

    {/* Right Side Form */}
    <div className="contact-card">

      <div className="contact-header">
        <h2>Send Message</h2>
        <p>We'd love to hear from you</p>
      </div>

      <div className="input-group">
        <label>Full Name</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your name"
          value={contactForm.username}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={contactForm.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <label>Your Message</label>
        <textarea
          rows="5"
          name="message"
          placeholder="Write your message..."
          value={contactForm.message}
          onChange={handleInputChange}
        />
      </div>

      <button
        className="send-btn"
        onClick={handleSubmit}
      >
        Send Message 🚀
      </button>

    </div>

  </div>
</section>

        </>
      )}
      <FooterLibrary />
    </>
  );
};
