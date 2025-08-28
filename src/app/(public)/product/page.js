'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductCard from "@/components/Product/ProductCard"; // adjust import

const ProductListPage = () => {
  const filters = ["All", "Laptop", "Desktop", "Computer", "Tablets", "Apple", "Accessories"];
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState([]);

  // Fetch products based on filter
  async function fetchProducts(filter) {
    try {
      let url = "/api/product";

      if (filter && filter !== "all") {
        url += `?tag=${filter.toLowerCase()}`;
      }

      const response = await axios.get(url);
      setProducts(response.data.records || []);
    } catch (error) {
      console.error("Error fetching products", error);
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProducts(activeFilter);
  }, [activeFilter]);

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-dark text-white text-center">
        <Container>
          <h1 className="fw-bold display-5">Our Products</h1>
          <p className="lead">
            Browse through our latest collection of laptops, desktops, tablets,
            and accessories.
          </p>
        </Container>
      </section>

      {/* Filter Section */}
      <section className="py-4 bg-light">
        <Container>
          <Row className="justify-content-center mb-3">
            {filters.map((filter, index) => (
              <Col xs="auto" sm={12} md={4} lg="auto" key={index}>
                <Button
                  variant={
                    activeFilter === filter.toLowerCase()
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => setActiveFilter(filter.toLowerCase())}
                  className="px-4 py-2 fw-semibold rounded-pill shadow-sm m-2 d-flex align-items-start "
                >
                  {filter}
                </Button>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <section className="py-5">
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
    </>
  );
};

export default ProductListPage;
