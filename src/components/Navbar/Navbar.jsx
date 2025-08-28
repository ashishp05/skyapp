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

function Navigation() {
  
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
    expanded={expanded}
     onToggle={() => setExpanded(!expanded)}
      collapseOnSelect
      expand="lg"   // 👈 make it responsive (collapses below "lg" screens)
      bg="light"
      variant="light"
      className="shadow-sm fixed-top px-3"
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
          <Nav className={`mx-auto gap-4 fs-5`}>
            <Link href="/" className={styles.navlink} onClick={() => setExpanded(false)}>Home</Link>
            <Link href="/product" className={styles.navlink} onClick={() => setExpanded(false)}>Products</Link>
            <Link href="/about" className={styles.navlink} onClick={() => setExpanded(false)}>About</Link>
            <Link href="/contact" className={styles.navlink} onClick={() => setExpanded(false)}>Contact</Link>
          </Nav>

          {/* Right: Search Bar */}
          <Form 
            className="d-flex align-items-center gap-2 mt-3 mt-lg-0" 
            style={{ maxWidth: "280px" }}
          >
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
