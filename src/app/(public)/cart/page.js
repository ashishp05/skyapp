"use client"
import { useCart } from "@/context/CartContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Trash } from "lucide-react";
import CTAButton from "@/components/Common/CTAButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Calculate totals safely
  const totalItems = cart?.reduce((acc, item) => acc + (item.qty || 0), 0) || 0;
  const totalPrice =
    cart?.reduce((acc, item) => acc + (item.qty || 0) * (item.price || 0), 0) ||
    0;

  async function handleCheckout() {
    try {
      // ✅ Validation
      if (!cart || cart.length === 0) {
        toast.error("Your cart is empty.");
        return;
      }
      if (totalItems <= 0 || totalPrice <= 0) {
        toast.error("Invalid cart details. Please check your items.");
        return;
      }

      setLoading(true);

      const payload = {
        userRef: "001", // TODO: Replace with actual logged-in user ID
        items: cart.map((item) => ({
          productId: item?._id,
          qty: item?.qty || 1,
        })),
        totalPrice,
        totalQty: totalItems,
      };

      const res = await axios.post("/api/checkout", payload);

      if (res.status === 200) {
        toast.success(res.data?.message || "Order placed successfully!");
        clearCart();
        router.push("/");
      } else {
        toast.error(res.data?.message || "Something went wrong during checkout.");
      }
    } catch (error) {
      // ✅ Better error handling
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Unexpected error occurred. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mt-4 h-100">
      <h2 className="mb-4 text-center">🛒 My Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center gap-5">
          <p className="text-center mt-2">Your cart is empty.</p>
          <CTAButton text={"Home"} link="/" />
        </div>
      ) : (
        <Row className="g-4">
          {/* LEFT SIDE - Product List */}
          <Col md={8}>
            {cart.map((item) => (
              <Card
                key={item._id}
                className="shadow-sm border-0 rounded-3 mb-4 d-flex flex-row"
              >
                {/* Product Image */}
                {item.images?.[0] && (
                  <Card.Img
                    src={item.images[0]}
                    alt={item.name}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      borderTopLeftRadius: "0.5rem",
                      borderBottomLeftRadius: "0.5rem",
                    }}
                  />
                )}

                {/* Product Details */}
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="text-muted">
                      Price: ₹{item.price}
                    </Card.Text>
                    <Card.Text>
                      <strong>Total: ₹{(item.qty || 0) * (item.price || 0)}</strong>
                    </Card.Text>
                  </div>

                  {/* Quantity controls */}
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, (item.qty || 1) - 1))
                      }
                    >
                      -
                    </Button>
                    <span>{item.qty}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item._id, (item.qty || 0) + 1)}
                    >
                      +
                    </Button>
                  </div>

                  {/* Remove button */}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mt-3 align-self-start"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Trash size={16} /> Remove
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Col>

          {/* RIGHT SIDE - Cart Summary */}
          <Col md={4}>
            <Card className="shadow-sm border-0 rounded-3 p-4 sticky-top">
              <h4>Cart Summary</h4>
              <p>Total Items: {totalItems}</p>
              <h5>Total Price: ₹{totalPrice}</h5>
              <div className="d-grid gap-2 mt-4">
                <Button
                  variant="warning"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Proceed to Checkout"}
                </Button>
                <Button variant="outline-dark" size="lg" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
