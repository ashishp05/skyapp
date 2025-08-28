"use client";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./ProductForm.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProductForm({ initialData, onSubmit }) {
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Prevent multiple submits
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tag: "",
    price : "",
    images: [],
    productDetails: {
      brand: "",
      processor: "",
      RAM: "",
      storage: "",
      display: "",
      graphics: "",
      os: "",
      connectionTypes: "",
      weight: "",
    },
  });

  const handleChange = (e, type) => {
    if (type === "nested") {
      setFormData({
        ...formData,
        productDetails: {
          ...formData.productDetails,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e) => {
    setFiles(e.target.files);
  };

  // If edit mode → prefill values
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // ✅ Already submitting → ignore click
    setIsSubmitting(true);

    try {
      toast.loading("Uploading...");

      // 1️⃣ Upload Images
      const data = new FormData();
      for (const file of files) {
        data.append("files", file);
      }

      const urlsData = await fetch("/api/upload", { method: "POST", body: data });
      const { urls } = await urlsData.json();

      // 2️⃣ Add Product
      const response = await axios.post("/api/product/add", {
        ...formData,
        images: urls,
      });

      toast.dismiss();
      if (response.status === 200 || response.statusText === "OK") {
        toast.success("Item Added Successfully ✅");
        router.push("/admin/product")
        // ✅ Reset Form
        setFormData({
          name: "",
          description: "",
          price : "",
          tag: "",
          images: [],
          productDetails: {
            brand: "",
            processor: "",
            RAM: "",
            storage: "",
            display: "",
            graphics: "",
            os: "",
            connectionTypes: "",
            weight: "",
          },
        });
        setFiles([]);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong ❌");
      console.error(error);
    } finally {
      setIsSubmitting(false); // ✅ Enable button again
    }
  };

  return (
    <div className={`p-4 ${styles.container}`}>
      <h3 className="mb-4 text-primary">
        {initialData ? "Edit Product" : "Add New Product"}
      </h3>
      <Form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name<sup  style={{"color" : "red"}}>*</sup></Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Product Price<sup  style={{"color" : "red"}}>*</sup></Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product Price"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <div className={styles.formGroup}>
              <label>Tag<sup  style={{"color" : "red"}}>*</sup></label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                required
              >
                <option value="">Select Tag</option>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="computer">Computer</option>
                <option value="tablets">Tablets</option>
                <option value="apple">Apple</option>
                <option value="computer">Accessory</option>
              </select>
            </div>
          </Col>
        </Row>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description<sup  style={{"color" : "red"}}>*</sup></Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description"
            rows={3}
          />
        </Form.Group>

        {/* Images */}
        <Form.Group className="mb-3">
          <Form.Label>Upload Images<sup  style={{"color" : "red"}}>*</sup></Form.Label>
          <Form.Control type="file" multiple onChange={handleImageChange} />
          {files.length > 0 && (
            <div className={styles.previewContainer}>
              {[...files].map((img, i) => (
                <span key={i} className={styles.previewItem}>
                  {img.name}
                </span>
              ))}
            </div>
          )}
        </Form.Group>

        {/* Product Details (Optional) */}
        <h5 className="mt-4 text-secondary">Product Details (Optional)</h5>
        <Row>
          {Object.keys(formData.productDetails).map((field) => (
            <Col md={4} key={field}>
              <Form.Group className="mb-3">
                <Form.Label className="text-capitalize">{field}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={formData.productDetails[field]}
                  onChange={(e) => handleChange(e, "nested")}
                  placeholder={`Enter ${field}`}
                />
              </Form.Group>
            </Col>
          ))}
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            type="reset"
            disabled={isSubmitting} // ✅ disable while submitting
          >
            Reset
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting} // ✅ disable while submitting
          >
            {isSubmitting
              ? "Saving..."
              : initialData
              ? "Update Product"
              : "Add Product"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
