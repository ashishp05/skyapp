"use client";

import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import logo from "../../../public/logo.png";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

function Navigation() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      collapseOnSelect
      expand="lg"
      bg="white"
      variant="light"
      className="shadow-sm fixed-top py-2 px-3"
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image src={logo} alt="nav-logo" width={130} height={65} />
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" className="mt-3 mt-lg-0">
          {/* Center Links */}
          <Nav className="mx-auto gap-4 fs-6 fw-semibold text-uppercase">
            <Link
              href="/"
              className={`${styles.navlink}`}
              onClick={() => setExpanded(false)}
            >
              Home
            </Link>
            <Link
              href="/product"
              className={`${styles.navlink}`}
              onClick={() => setExpanded(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`${styles.navlink}`}
              onClick={() => setExpanded(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`${styles.navlink}`}
              onClick={() => setExpanded(false)}
            >
              Contact
            </Link>
          </Nav>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Cart Icon */}
            <Link href="/cart" 
              className={`${styles.navlink} position-relative  fs-5`} >
              <FaCartShopping />
              {/* Badge (example if needed later) */}
              {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span> */}
            </Link>

            {/* Search Bar */}
            <Form 
              className="d-flex align-items-center gap-2"
              style={{ maxWidth: "260px", width: "100%" }}
            >
              <Form.Control
                type="search"
                placeholder="Search items..."
                aria-label="Search"
                className="rounded-pill px-3"
              />
              <Button
                variant="primary"
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "42px", height: "38px" }}
              >
                <FaSearch size={16} />
              </Button>
            </Form>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
