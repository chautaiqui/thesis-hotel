import React from "react";

import "./styles.css";

const Footer = () => (
  <footer>
    <div className="sm-handle">
      <a href="#" className="sm-button">
        <i className="fab fa-instagram"> </i>
      </a>

      <a
        href="#"
        className="sm-button"
      >
        <i className="fab fa-linkedin"> </i>
      </a>

      <a href="#" className="sm-button">
        <i className="fab fa-facebook-f"> </i>
      </a>

      <a href="#" className="sm-button">
        <i className="fab fa-twitter"> </i>
      </a>

    </div>

    <div className="footer-links">
      <div className="menu">
        <h4 className="menu-title">Menu</h4>

        <a href="/" className="menu-links">
          Join Me
        </a>

        <a
          href="http://localhost:3000/blog?id=609e504d76351d00152060da"
          className="menu-links"
        >
          My Blogs
        </a>

        <a href="/" className="menu-links">
          My Journey
        </a>

        <a href="/" className="menu-links">
          About
        </a>
      </div>

      <div className="menu">
        <h4 className="menu-title">Other Pages</h4>

        <a href="/privacy" className="other-links">
          Privacy Policy
        </a>

        <a href="/terms" className="other-links">
          Terms of use
        </a>
      </div>
    </div>

    <p className="copyright">
      &copy Copyright 2021 |{" "}
      <a href="https://instagram.com/ronakgiriraj"> Hotel Booking</a>
    </p>
  </footer>
);

export default Footer;
