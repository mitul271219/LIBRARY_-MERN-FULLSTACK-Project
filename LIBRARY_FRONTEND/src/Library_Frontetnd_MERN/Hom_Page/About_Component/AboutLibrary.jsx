import React from "react";
import "./AboutLibrary.css";
import { useSelector } from "react-redux";
import { NavbarLibrary } from "../../Navbar_Library/NavbarLibrary";
import { FooterLibrary } from "../Footer_Component/FooterLibrary";
import { useLocation } from "react-router-dom";


export const AboutLibrary = () => {
  const state = useSelector((state) => state?.LibraryProject);
  console.log(state);

  const location = useLocation();

  const hideLayout = location.pathname === "/";

  return (
    <>
      {!hideLayout && <NavbarLibrary />}

      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-overlay">
            <h1>About E-Books</h1>
            <p>
              Discover, Read, and Buy your favorite books from anywhere in the
              world.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="about-content">
          <div className="about-left">
            <h2>Who We Are</h2>
            <p>
              E-Books is a modern online library platform designed for book
              lovers. Our goal is to provide an easy and enjoyable reading
              experience while allowing users to browse, purchase, and manage
              their favorite books.
            </p>

            <p>
              Whether you're interested in Science, Horror, Comedy, Physics,
              Mystery & Thriller, or many other genres, we have something for
              everyone.
            </p>
          </div>

          <div className="about-right">
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da"
              alt="Library"
            />
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <h2>Why Choose Us?</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>📚 Huge Collection</h3>
              <p>Explore books from multiple categories and genres.</p>
            </div>

            <div className="feature-card">
              <h3>⚡ Fast Access</h3>
              <p>Read or purchase books instantly with a smooth experience.</p>
            </div>

            <div className="feature-card">
              <h3>🛒 Easy Shopping</h3>
              <p>Add books to cart and place orders effortlessly.</p>
            </div>

            <div className="feature-card">
              <h3>🔒 Secure Platform</h3>
              <p>User-friendly and secure authentication system.</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="stat-box">
            <h2>{state?.libraryBooks?.productGet?.length}+</h2>
            <p>Books Available</p>
          </div>

          <div className="stat-box">
            <h2>500+</h2>
            <p>Happy Readers</p>
          </div>

          <div className="stat-box">
            <h2>{state?.libraryCategory?.adminGetCategory?.length}+</h2>
            <p>Categories</p>
          </div>

          <div className="stat-box">
            <h2>24/7</h2>
            <p>Support</p>
          </div>
        </section>
      </div>
      {!hideLayout && <FooterLibrary />}
    </>
  );
};
