"use client";

import Image from "next/image";
import { useState } from "react";
import { Collapse, Nav } from "react-bootstrap";
import {
  FaHome,
  FaBox,
  FaCog,
  FaUsers,
  FaShoppingCart,
  FaChevronDown,
} from "react-icons/fa";
import img from "../../../public/logo.png";
import styles from "./Sidebar.module.css";
import Link from "next/link";
export default function Sidebar() {
  const [openProduct, setOpenProduct] = useState(false);

  return (
    <div className={`${styles.sidebar} d-flex flex-column vh-100 shadow`}>
      {/* Logo Section (15% height for your logo) */}
      <div className={styles.logoContainer}>
        <Image src={img} alt="logo" height={200} width={250} />
      </div>

      {/* Links Section */}
      <div className="flex-grow-1 d-flex flex-column mt-3">
        <Nav className="flex-column p-2 gap-2">
          {/* Dashboard */}
          <Link href="/admin" className={styles.navLink}>
            <FaHome /> <span>Dashboard</span>
          </Link>

          {/* Products Dropdown */}
          <div>
            <div
              onClick={() => setOpenProduct(!openProduct)}
              aria-controls="product-collapse"
              aria-expanded={openProduct}
              className={`${styles.navLink} d-flex justify-content-between`}
            >
              <span>
                <FaBox /> Products
              </span>
              <FaChevronDown
                className={`${styles.chevron} ${
                  openProduct ? styles.rotate : ""
                }`}
              />
            </div>

            <Collapse in={openProduct}>
              <div id="product-collapse" className={`${styles.subLinks}`}>
                <Link href="/admin/product" className={styles.subLink}>
                  Product List
                </Link>
                <Link href="/admin/product/add" className={styles.subLink}>
                  Add Product
                </Link>
              </div>
            </Collapse>
          </div>

          {/* Settings */}
          <Link href="/admin/settings" className={styles.navLink}>
            <FaCog /> <span>Settings</span>
          </Link>

          {/* Users */}
          <Link href="/admin/users" className={styles.navLink}>
            <FaUsers /> <span>Users</span>
          </Link>

          {/* Orders */}
          <Link href="/admin/orders" className={styles.navLink}>
            <FaShoppingCart /> <span>Orders</span>
          </Link>
        </Nav>
      </div>
    </div>
  );
}
