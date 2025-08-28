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
import styles from "./Navbar.module.css"; // Import custom CSS
import Link from "next/link";

function Navigation() {
  return (
    <Navbar
      collapseOnSelect
      bg="light"
      variant="light"
      className="shadow-sm fixed-top px-5"
    >
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand href="/">
          <Image src={logo} alt="nav-logo" width={150} height={75} />
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Center Links */}
          <Nav className={`mx-auto gap-4 fs-5 `}>
            <Link href="/" className={styles.navlink}>Home</Link>
            <Link href="/product" className={styles.navlink}>Products</Link>
            <Link href="/about" className={styles.navlink}>About</Link>
            <Link href="/contact" className={styles.navlink}>Contact</Link>
          </Nav>

          {/* Right: Search Bar */}
          <Form className="d-flex align-items-center gap-2" style={{ maxWidth: "280px" }}>
            <Form.Control
              type="search"
              placeholder="Search item"
              aria-label="Search"
              className="flex-grow-1"
            />
            <Button variant="outline-dark">
              <FaSearch />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
