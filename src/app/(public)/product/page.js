'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
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
               <Row className="justify-content-center mb-3 d-none d-md-flex">
        {filters.map((filter, index) => (
          <Col xs="auto" key={index}>
            <Button
              variant={
                activeFilter === filter.toLowerCase()
                  ? "primary"
                  : "outline-primary"
              }
              onClick={() => setActiveFilter(filter.toLowerCase())}
              className="px-4 py-2 fw-semibold rounded-pill shadow-sm m-2"
            >
              {filter}
            </Button>
          </Col>
        ))}
      </Row>

      {/* Dropdown on small screens */}
      <Row className="justify-content-center mb-3 d-flex d-md-none">
        <Col xs={10} sm={6}>
          <Dropdown
            onSelect={(val) => setActiveFilter(val)}
            className="w-100"
          >
            <Dropdown.Toggle variant="outline-primary" className="w-100">
              {filters.find(
                (f) => f.toLowerCase() === activeFilter
              ) || "Select Filter"}
            </Dropdown.Toggle>

            <Dropdown.Menu className="w-100">
              <Dropdown.Item >Select Filter</Dropdown.Item>
              {filters.map((filter, idx) => (
                <Dropdown.Item key={idx} eventKey={filter.toLowerCase()}>
                  {filter}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
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
