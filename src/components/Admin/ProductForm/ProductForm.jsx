"use client";

import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./ProductForm.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProductForm({ initialData, onSubmit }) {
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({}); // ✅ store validation errors
  const router = useRouter();
 
const [formData, setFormData] = useState({
  name: "",
  description: "",
  tag: "",
  price: "",
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

// Sync when initialData changes
useEffect(() => {
  if (initialData) {
    setFormData({
      name: initialData.name || "",
      description: initialData.description || "",
      tag: initialData.tag || "",
      price: initialData.price || "",
      images: initialData.images || [],
      productDetails: {
        brand: initialData.productDetails?.brand || "",
        processor: initialData.productDetails?.processor || "",
        RAM: initialData.productDetails?.RAM || "",
        storage: initialData.productDetails?.storage || "",
        display: initialData.productDetails?.display || "",
        graphics: initialData.productDetails?.graphics || "",
        os: initialData.productDetails?.os || "",
        connectionTypes: initialData.productDetails?.connectionTypes || "",
        weight: initialData.productDetails?.weight || "",
      },
    });
  }
}, [initialData]);

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
    setErrors({ ...errors, [e.target.name]: "" }); // ✅ clear error while typing
  };

  const handleImageChange = (e) => {
    setFiles(e.target.files);
    setErrors({ ...errors, images: "" });
  };

  // Validate required fields
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (!formData.tag.trim()) newErrors.tag = "Tag is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (files.length === 0 && !initialData) newErrors.images = "Please upload at least 1 image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ valid if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop if errors
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      toast.loading("Uploading...");

      const data = new FormData();
        if(files)
        {
           for (const file of files) {
        data.append("files", file);
      }
      const urlsData = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      var { urls } = await urlsData.json();

        }
        let response ;
       if(!initialData)
       {
         response = await axios.post("/api/product/add", {
        ...formData,
        images: urls,
      });
       }else {
        const productId = initialData?._id
          response = await axios.patch("/api/product/"+ productId , {...formData , images : urls || initialData.images})
         
       }

      toast.dismiss();
      if (response.status === 200 || response.statusText === "OK") {
        initialData ?   toast.success("Item Edited Successfully ✅") :  toast.success("Item Added Successfully ✅");
        router.push("/admin/product");
        setFormData({
          name: "",
          description: "",
          price: "",
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`p-4 ${styles.container}`}>
      <h3 className="mb-4 text-primary">
        {initialData ? "Edit Product" : "Add New Product"}
      </h3>
      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                Product Name<sup style={{ color: "red" }}>*</sup>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={errors.name ? styles.errorInput : ""}
              />
              {errors.name && <div className={styles.errorMsg}>{errors.name}</div>}
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                Product Price<sup style={{ color: "red" }}>*</sup>
              </Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className={errors.price ? styles.errorInput : ""}
              />
              {errors.price && (
                <div className={styles.errorMsg}>{errors.price}</div>
              )}
            </Form.Group>
          </Col>

          <Col md={4}>
            <div className={styles.formGroup}>
              <label>
                Tag<sup style={{ color: "red" }}>*</sup>
              </label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className={errors.tag ? styles.errorInput : ""}
              >
                <option value="">Select Tag</option>
                <option value="laptop">Laptop</option>
                <option value="desktop">Desktop</option>
                <option value="computer">Computer</option>
                <option value="tablets">Tablets</option>
                <option value="apple">Apple</option>
                <option value="accessories">Accessories</option>
              </select>
              {errors.tag && <div className={styles.errorMsg}>{errors.tag}</div>}
            </div>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>
            Description<sup style={{ color: "red" }}>*</sup>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description"
            rows={3}
            className={errors.description ? styles.errorInput : ""}
          />
          {errors.description && (
            <div className={styles.errorMsg}>{errors.description}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Upload Images<sup style={{ color: "red" }}>*</sup>
          </Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleImageChange}
            className={errors.images ? styles.errorInput : ""}
          />
          {files.length > 0 && (
            <div className={styles.previewContainer}>
              {[...files].map((img, i) => (
                <span key={i} className={styles.previewItem}>
                  {img.name}
                </span>
              ))}
            </div>
          )}
          {errors.images && <div className={styles.errorMsg}>{errors.images}</div>}
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

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" type="reset" disabled={isSubmitting}>
            Reset
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
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
