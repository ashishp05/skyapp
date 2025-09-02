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
import { useCart } from "@/context/CartContext";
import { GrSkype } from "react-icons/gr";
function Navigation() {
  const [expanded, setExpanded] = useState(false);

  const { cart  } = useCart();
  const totalItems = cart?.reduce((acc, item) => acc + (item.qty || 0), 0) || 0;


  return (
    <Navbar
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      collapseOnSelect
      expand="md"
      bg="white"
      variant="light"
      className="shadow-sm fixed-top py-1 px-5"
    >
      <Container className="container-lg text-center">
        {/* Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center px-5 py-2 m-2 text-primary">
        <GrSkype/>kyTech
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
              <FaCartShopping />{ cart.length > 0 ? <sup className="bg-danger rounded-circle px-1 m-1 text-light">{totalItems}</sup> : null}
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
