
import React, { useState, useEffect } from "react";
 // or react-router-dom's useSearchParams if using CRA
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./ProductInfo.module.css";
import axios from "axios";

const ProductInfo =  ({productId}) => {
  // sample API call
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
console.log("product" , product)
  useEffect(() => {
    async function fetchProduct() {
      // Replace this with your backend API call
      const res = await axios.get("/api/product/"+productId)
      setProduct(res.data.product);
      setMainImage(res.data.product.images[0]);
    }
    fetchProduct();
  }, []);

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className={`my-5 ${styles.productInfo}`}>
      <Row className={styles.productInfo}>
        {/* Left side: Images */}
        <Col md={6} className={styles.leftSection}>
          <div className={styles.mainImageWrapper}>
            <img src={mainImage} alt={product.name} className={styles.mainImage} />
          </div>
          <div className={styles.thumbnailRow}>
            {product?.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`preview-${idx}`}
                className={`${styles.thumbnail} ${
                  mainImage === img ? styles.activeThumb : ""
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </Col>

        {/* Right side: Details */}
        <Col md={6} className={styles.rightSection}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>
          <h4 className={styles.price}>₹{product.price}</h4>

          <div className={styles.actions}>
            <Button variant="outline-primary" className={styles.btn}>
              Add to Cart
            </Button>
            <Button variant="danger" className={styles.btn}>
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductInfo;
