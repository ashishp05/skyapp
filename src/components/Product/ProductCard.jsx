"use client";
import React from "react";
import styles from "./ProductCard.module.css";
import { useRouter } from "next/navigation";

export default function ProductCard({ product}) {
    const router = useRouter()
  return (
    <div className={styles.card}>
      {/* Tag */}
      <div className={styles.tag}>{product.tag?.toUpperCase()}</div>

      {/* Image */}
      <div className={styles.imageWrapper}>
        <img src={product.images[0]} alt={product.name} className={styles.image} />
      </div>

      {/* Name */}
      <h5 className={styles.name}>{product.name}</h5>
      <p className={styles.desc}>{product.description}</p>
      {/* Price & Button */}
      <div className={styles.footer}>
        <div>
          <span className={styles.priceLabel}>Price</span>
          <p className={styles.price}>₹{product.price?.toLocaleString()}</p>
        </div>
        <button className={styles.viewBtn} onClick={() => { router.push(`/product/${product._id}`)}}>
          View More
        </button>
      </div>
    </div>
  );
}
