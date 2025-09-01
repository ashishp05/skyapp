'use client'
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

import "./Dashboard.module.css"; // Module CSS for styling
import { useRouter } from "next/navigation";
import axios from "axios";

const Dashboard = () => {
  const navigate = useRouter();
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");

  // Example API call
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("/api/admin/dashboard");
        console.log("res" , res.data)
        setCounts(res.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Container fluid className="dashboard-container">
      {/* Header Section */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h3 className="fw-bold">Product Dashboard</h3>
        </Col>
        <Col md="auto">
          <Button variant="primary" onClick={() => navigate.push("/admin/product/add")}>
            + Add Product
          </Button>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Total Products</h6>
              <h4>{counts.totalProducts}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Laptops</h6>
              <h4>{counts.totalLaptops}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Desktops</h6>
              <h4>{counts.totalDesktop}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6>Computors</h6>
              <h4>{counts.other}</h4>
            </Card.Body>
          </Card>
        </Col>
         <Col md={3}>
          <Card className="shadow-sm mt-3">
            <Card.Body>
              <h6>Tablets</h6>
              <h4>{counts.other}</h4>
            </Card.Body>
          </Card>
        </Col>
         <Col md={3}>
          <Card className="shadow-sm mt-3">
            <Card.Body>
              <h6>iphone</h6>
              <h4>{counts.other}</h4>
            </Card.Body>
          </Card>
        </Col>
         <Col md={3}>
          <Card className="shadow-sm mt-3">
            <Card.Body>
              <h6>Accesories</h6>
              <h4>{counts.other}</h4>
            </Card.Body>
          </Card>
        </Col>
         <Col md={3}>
          <Card className="shadow-sm mt-3">
            <Card.Body>
              <h6>Other</h6>
              <h4>{counts.other}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search & Filter */}
      <Row className="mb-3">
        <Col md={4}>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-primary" className="ms-2">
              <FaSearch />
            </Button>
          </Form>
        </Col>
      </Row>

      
    </Container>
  );
};

export default Dashboard;
