"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./ProductList.module.css"; 
import { Button, Card, Col, Row, Table, Form } from "react-bootstrap";
import Spinner from "../Common/Spinner";
import ProductFilter from "./ProductFilter/ProductFilter";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading , setLoading] = useState(false);
  const [total , setTotal] = useState(0);
  const [filter , setFilters] = useState({
    search: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    tag: "",
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // default 5 items per page

  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try { 
        setLoading(true);
        const res = await axios.get("/api/product", {
          params: { ...filter, needCount: true, page, limit },
        });
        setProducts(res.data.records);
        setTotal(res.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [page, limit]); // ✅ re-fetch on filter/page/limit change


  // Total pages calculation
  const totalPages = Math.ceil(total / limit);

  if(loading) {
    return <Spinner/>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📦 All Products : {total || products.length} </h2>
      <br/>

      {/* Filter component */}
      <ProductFilter onFilterChange={(newFilters) => setFilters(newFilters)} tags={["All", "Laptop", "Desktop", "Computer", "Tablets", "Apple", "Accessories"]}/>

      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Table hover responsive className="align-middle">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.tag}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price ? product.price : 1000}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => router.push(`/admin/product/view/${product._id}`)}
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
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pagination + Items per page */}
      <Row className="mt-3">
        <Col className="d-flex justify-content-between align-items-center">
          {/* Items per page dropdown */}
          <Form.Select
            value={limit}
            onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
            style={{ width: "150px" }}
          >
            <option value={7}> 7/ page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={30}>30 / page</option>
            <option value={40}>40 / page</option>
            <option value={50}>50 / page</option>
          </Form.Select>

          {/* Pagination */}
          <nav aria-label="Page navigation example">
            <ul className="pagination mb-0">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
              </li>
              {[...Array(totalPages)].map((_, idx) => (
                <li key={idx} className={`page-item ${page === idx + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </Col>
      </Row>
    </div>
  );
}
