"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Card, Spinner, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import styles from "./order.module.css"; // custom styles

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  

  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/orders");
      if (res.status === 200) {
        setOrders(res.data.records);
        setTotal(res.data.total)
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={`container mt-4 ${styles.adminOrders}`}>
      <h2 className="mb-4 text-center">📦 Admin - All Orders</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <Card className="shadow-sm border-0 rounded-3 p-3 ">
          <div className="d-flex justify-content-end mb-3 ">
            <Button variant="outline-dark" onClick={fetchOrders}>
              Refresh
            </Button>
          </div>
          <Table responsive hover bordered className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Items</th>
                <th>Total Qty</th>
                <th>Total Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userRef}</td>
                  <td>
                    {order.items.map((item, idx) => (
                      <div key={idx} className={styles.itemRow}>
                        {item.name} <span className="text-muted">(x{item.qty})</span> - ₹
                        {item.price * item.qty}
                      </div>
                    ))}
                  </td>
                  <td>{order.totalQty}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        </Card>
      )}
    </div>
  );
}
