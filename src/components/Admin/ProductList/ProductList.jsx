"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Card, Col, Row, Table, Form } from "react-bootstrap";

import Spinner from "../../Common/Spinner";
import styles from "./ProductList.module.css";

// ================================
// Helpers
// ================================
const DEFAULT_FILTER = {
  search: "",
  startDate: "",
  endDate: "",
  tag: "",
};

const TAG_OPTIONS = [
  "all",
  "laptop",
  "desktop",
  "computer",
  "tablets",
  "apple",
  "accessories",
];

// ================================
// Main Component
// ================================
export default function ProductList() {
  const router = useRouter();

  // State
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // ================================
  // Debounce Search
  // ================================
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filter.search);
    }, 500);
    return () => clearTimeout(handler);
  }, [filter.search]);

  // ================================
  // Fetch Products
  // ================================
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const skip = (page - 1) * limit;

      const query = {
        ...(debouncedSearch && { searchTerm: debouncedSearch }),
        ...(filter.startDate && { startDate: filter.startDate }),
        ...(filter.endDate && { endDate: filter.endDate }),
        ...(filter.tag && filter.tag !== "all" && { tag: filter.tag }),
        page,
        limit,
        skip,
        needCount: true,
      };

      const res = await axios.get("/api/product", { params: query });
      setProducts(res.data.records || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filter.startDate, filter.endDate, filter.tag, page, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ================================
  // Delete Product
  // ================================
  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.delete(`/api/product/${id}`);
      if (res.status === 200) {
        toast.success("Product deleted successfully");
        // Optimistic update
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setTotal((prev) => prev - 1);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete product");
    }
  };

  // ================================
  // Pagination
  // ================================
  const totalPages = Math.ceil(total / limit);

  // ================================
  // Render
  // ================================
  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📦 All Products : {total}</h2>
      <br />

      {/* 🔹 Filters */}
      <form className={styles.filterContainer} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search by name or description..."
          value={filter.search}
          onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
          className={styles.searchInput}
        />

        <div className={styles.dateRange}>
          <input
            type="date"
            value={filter.startDate}
            onChange={(e) => setFilter((prev) => ({ ...prev, startDate: e.target.value }))}
            className={styles.dateInput}
          />
          <span className={styles.toText}>to</span>
          <input
            type="date"
            value={filter.endDate}
            onChange={(e) => setFilter((prev) => ({ ...prev, endDate: e.target.value }))}
            className={styles.dateInput}
          />
        </div>

        <select
          value={filter.tag}
          onChange={(e) => setFilter((prev) => ({ ...prev, tag: e.target.value }))}
          className={styles.dropdown}
        >
          {TAG_OPTIONS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </form>

      {/* 🔹 Table */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body className="p-0">
              <div className={styles.tableWrapper}>
                <Table hover responsive="sm" className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Tag</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th className={styles.actionCol}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>{product.tag}</td>
                          <td>{product.name}</td>
                          <td className={styles.desc}>{product.description}</td>
                          <td>{product.price || 1000}</td>
                          <td>
                            <div className={styles.actions}>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => router.push(`/admin/product/${product._id}`)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => router.push(`/admin/product/edit/${product._id}`)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => deleteProduct(product._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className={styles.empty}>
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* 🔹 Pagination */}
      <Row className="mt-3">
        <Col className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <Form.Select
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            style={{ maxWidth: "160px" }}
          >
            {[5, 10, 20, 30, 40, 50].map((val) => (
              <option key={val} value={val}>
                {val} / page
              </option>
            ))}
          </Form.Select>

          <nav aria-label="Page navigation">
            <ul className="pagination mb-0 flex-wrap">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage((p) => p - 1)}>
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, idx) => (
                <li
                  key={idx}
                  className={`page-item ${page === idx + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => setPage(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage((p) => p + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
    </div>
  );
}
