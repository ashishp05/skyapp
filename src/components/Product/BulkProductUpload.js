'use client'
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import styles from "./BulkProductUpload.module.css";

const BulkProductUpload = () => {
  const [products, setProducts] = useState([
    {
      name: "",
      description: "",
      tag: "",
      price: "",
      images: [],
      projectDetail: { brand: "", storage: "", ram: "", screen: "" },
    },
  ]);

  // Convert uploaded images to Base64
  const handleImageUpload = (e, index) => {
    const files = Array.from(e.target.files);
    const updatedProducts = [...products];

    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    ).then((base64Images) => {
      updatedProducts[index].images = base64Images;
      setProducts(updatedProducts);
    });
  };

  const handleChange = (index, field, value, isDetail = false) => {
    const updatedProducts = [...products];
    if (isDetail) {
      updatedProducts[index].projectDetail[field] = value;
    } else {
      updatedProducts[index][field] = value;
    }
    setProducts(updatedProducts);
  };

  const addProductRow = () => {
    setProducts([
      ...products,
      {
        name: "",
        description: "",
        tag: "",
        price: "",
        images: [],
        projectDetail: { brand: "", storage: "", ram: "", screen: "" },
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/products/bulk", { products });
      alert(`✅ ${res.data.count} products added!`);
    } catch (err) {
      alert("❌ Error uploading products");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bulk Product Upload</h2>

      {products.map((product, index) => (
        <Card key={index} className={`${styles.card} mb-4`}>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={product.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={product.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.tag}
                      onChange={(e) =>
                        handleChange(index, "tag", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        handleChange(index, "price", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Project Details */}
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.projectDetail.brand}
                      onChange={(e) =>
                        handleChange(index, "brand", e.target.value, true)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Storage</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.projectDetail.storage}
                      onChange={(e) =>
                        handleChange(index, "storage", e.target.value, true)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>RAM</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.projectDetail.ram}
                      onChange={(e) =>
                        handleChange(index, "ram", e.target.value, true)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Screen</Form.Label>
                    <Form.Control
                      type="text"
                      value={product.projectDetail.screen}
                      onChange={(e) =>
                        handleChange(index, "screen", e.target.value, true)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Image Upload */}
              <Form.Group className="mb-3">
                <Form.Label>Upload Images</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, index)}
                />
                <div className={styles.previewContainer}>
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="preview"
                      className={styles.previewImg}
                    />
                  ))}
                </div>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      ))}

      <div className={styles.actions}>
        <Button variant="primary" onClick={addProductRow} className="me-2">
          ➕ Add Another Product
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          🚀 Submit All Products
        </Button>
      </div>
    </div>
  );
};

export default BulkProductUpload;
