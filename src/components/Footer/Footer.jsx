import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          {/* Brand / Logo */}
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h4 className="fw-bold">MyWebsite</h4>
            <p className="small mb-0">© {new Date().getFullYear()} All Rights Reserved</p>
          </Col>

          {/* Navigation Links */}
          <Col md={4} className="text-center mb-3 mb-md-0">
            <ul className="list-unstyled d-flex justify-content-center gap-3 mb-0">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><a href="/products" className="text-light text-decoration-none">Products</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Social Icons */}
          <Col md={4} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-light"><FaFacebook size={20} /></a>
              <a href="#" className="text-light"><FaTwitter size={20} /></a>
              <a href="#" className="text-light"><FaInstagram size={20} /></a>
              <a href="#" className="text-light"><FaLinkedin size={20} /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
