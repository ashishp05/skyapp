'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "@/components/Product/ProductCard"; // adjust import
import CTAButton from "../Common/CTAButton";

const BestLaptops = () => {
  const [products, setProducts] = useState([]);

  // Fetch products based on filter
  async function fetchProducts() {
    try {
      let url = "/api/product?tag=laptop";
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
      <section className=" text-dark text-center">
        <Container>
          <h1 className="fw-bold display-5">Our Products : Laptop</h1>
          <p className="lead">
            Browse through our latest collection of laptops.
          </p>
        </Container>
      </section>

      {/* Products Section */}
      <section className=" w-100 mx-auto mb-5">
        <Container>
          {products.length > 0 ? (
            <Row className="g-4 w-100 mx-auto ">
              {products.map((product, idx) => (
                <Col xs={12} sm={4} lg={3} key={idx}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Row className="g-4 w-100 mx-auto text-center">
              <h5>No Data Found</h5>
            </Row>
          )}
        </Container>
      </section>
      <CTAButton text={"More Products"}></CTAButton>
    </>
  );
};

export default BestLaptops;
