import React from 'react'
import "./FooterLibrary.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import './FooterLibrary.css'

export const FooterLibrary = () => {
  return (
    <>

<footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-section">
          <h2 className="footer-logo">📘 E-Books</h2>
          <p>
            Read & Buy your favorite books online anytime, anywhere.
            Discover science, comedy, horror, mystery and more.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/aboutLibrary">About</a></li>
            <li><a href="/cartPage">Cart</a></li>
            <li><a href="/orderHistory">Orders</a></li>
            <li><a href="/contactFormLibrary">Contact</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: ebooks@gmail.com</p>
          <p>Ahmedabad, Gujarat</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} E-Books | All Rights Reserved
      </div>
    </footer>

    </>
  )
}
