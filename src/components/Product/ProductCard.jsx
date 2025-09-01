"use client";
import React from "react";
import styles from "./ProductCard.module.css";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart, removeFromCart, cart } = useCart();

  // check if this product is in cart
  const isInCart = cart.some((item) => item._id === product._id);

  return (
    <div className={`${styles.card} shadow-sm  `}>
      {/* Tag */}
      {product.tag && (
        <div className={styles.tag}>{product.tag?.toUpperCase()}</div>
      )}

      {/* Image */}
      <div className={styles.imageWrapper}>
        <img
          src={product.images[0]}
          alt={product.name}
          className={styles.image}
        />
      </div>

      {/* Name */}
      <h5 className={styles.name}>
        {product.name.length > 45
          ? product.name.slice(0, 35) + "..."
          : product.name}
      </h5>

      {/* Description */}
      <p className={styles.desc}>
        {product.description.length > 90
          ? product.description.slice(0, 90) + "..."
          : product.description}
      </p>

      {/* Price & Actions */}
      <div className={styles.footer}>
        <div>
          <span className={styles.priceLabel}>Price</span>
          <p className={styles.price}>₹{product.price?.toLocaleString()}</p>
        </div>
        <div className="d-flex gap-2 mt-2">
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => router.push(`/product/${product._id}`)}
          >
            View More
          </Button>

          {/* Toggle Add/Remove */}
          {isInCart ? (
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeFromCart(product._id)}
            >
              Remove Item
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
