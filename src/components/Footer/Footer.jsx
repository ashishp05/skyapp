"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png"; // Replace with your SkyTech logo
import { GrSkype } from "react-icons/gr";

function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 pb-3 mt-5 ">
      <Container>
        <Row className="gy-4">
          {/* Logo + About */}
          <Col md={4}>
            <div className="d-flex align-items-center mb-3">
              
              <h4 className="ms-2 fw-bold text-primary">  <GrSkype/>kyTech</h4>
            </div>
            <p className="text-secondary" style={{ fontSize: "14px", lineHeight: "1.7", color: "#ccc" }}>
              At <strong>SkyTech</strong>, our vision is to deliver the best{" "}
              <span className="text-primary text-decoration-none">laptops</span>,{" "}
              <span className="text-primary text-decoration-none">desktops</span>, and{" "}
              <span className="text-primary text-decoration-none">tech gadgets</span> at unbeatable
              prices. We bring cutting-edge technology closer to you.
            </p>
          </Col>

          {/* Company Links */}
          <Col md={2}>
            <h6 className="fw-bold mb-3 text-uppercase">Company</h6>
            <ul className="list-unstyled">
              <li>
                <Link href="/" className="footer-link text-decoration-none">Home</Link>
              </li>
              <li>
                <Link href="/about" className="footer-link text-decoration-none">About Us</Link>
              </li>
              <li>
                <Link href="/delivery" className="footer-link text-decoration-none">Delivery</Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-link text-decoration-none">Privacy Policy</Link>
              </li>
            </ul>
          </Col>

          {/* Our Products */}
          <Col md={3}>
            <h6 className="fw-bold mb-3 text-uppercase">Our Products</h6>
            <ul className="list-unstyled">
              <li>
                <Link href="/products/laptops" className="footer-link text-decoration-none">Laptops</Link>
              </li>
              <li>
                <Link href="/products/desktops" className="footer-link text-decoration-none">Desktops</Link>
              </li>
              <li>
                <Link href="/products/gadgets" className="footer-link text-decoration-none">Gadgets</Link>
              </li>
              <li>
                <Link href="/products/accessories" className="footer-link text-decoration-none">Accessories</Link>
              </li>
            </ul>
          </Col>

          {/* Get in Touch */}
          <Col md={3}>
            <h6 className="fw-bold mb-3 text-uppercase">Get in Touch</h6>
            <p className="mb-1">📞 +91 98799 11503</p>
            <p className="mb-1">📞 +91 98799 11505</p>
            <p className="mb-2">✉️ narendrasadariya1011@gmail.com</p>
            <Button variant="primary" size="sm" className="rounded-pill px-3">
              <Link href="/contact" className="text-white text-decoration-none">
                Contact Us
              </Link>
            </Button>
          </Col>
        </Row>

        {/* Divider */}
        <hr className="mt-4 mb-3 border-secondary" />

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <small style={{ color: "#aaa" }}>
              © {2018} SkyTech. All Rights Reserved.
            </small>
          </Col>
        </Row>
      </Container>

      {/* Extra Styling */}
      <style jsx>{`
        .footer-link {
          display: inline-block;
          color: #bbb;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 8px;
          transition: color 0.3s, transform 0.2s;
        }
        .footer-link:hover {
          color: #0d6efd; /* Bootstrap Primary */
          transform: translateX(3px);
        }
      `}</style>
    </footer>
  );
}

export default Footer;
