"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "@/components/Product/ProductCard"; // adjust import
import CTAButton from "../Common/CTAButton";
import { motion } from "framer-motion";
import Spinner from "../Common/Spinner";

const BestProducts = ({ tag }) => {
  const [products, setProducts] = useState([]);

  // Fetch products based on filter
  async function fetchProducts() {
    try {
      let url = `/api/product?tag=${tag}&limit=8`;
      const response = await axios.get(url);
      setProducts(response.data.records || []);
    } catch (error) {
      console.error("Error fetching products", error);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="text-dark text-center">
        <Container>
          <motion.h1
            className="fw-bold display-5"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Our Products : {tag}
          </motion.h1>
          <motion.p
            className="lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            Browse through our latest collection of {tag}.
          </motion.p>
        </Container>
      </section>

      {/* Products Section */}
      <section className="w-100 mx-auto">
        <Container>
          {products.length > 0 ? (
            <Row className="g-2">
              {products.map((product, idx) => (
                <Col xs={12} sm={6} md={4} lg={3} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="g-4 w-100 mx-auto text-center">
              <motion.h5
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Spinner/>
              </motion.h5>
            </Row>
          )}
        </Container>
      </section>

      {/* CTA Button */}
      <motion.div
        className="text-center my-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CTAButton text={"More Products"} />
      </motion.div>
    </>
  );
};

export default BestProducts;
