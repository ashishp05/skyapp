"use client";
import { useCart } from "@/context/CartContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Trash } from "lucide-react";
import CTAButton from "@/components/Common/CTAButton";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate totals
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🛒 My Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
        <p className="text-center">Your cart is empty.</p>
        <CTAButton text={"Home"} link="/"/>
        </div>
      ) : (
        <Row className="g-4">
          {/* LEFT SIDE - 70% */}
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
                      <strong>Total: ₹{item.qty * item.price}</strong>
                    </Card.Text>
                  </div>

                  {/* Quantity controls */}
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.qty - 1))
                      }
                    >
                      -
                    </Button>
                    <span>{item.qty}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => updateQuantity(item._id, item.qty + 1)}
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

          {/* RIGHT SIDE - 30% */}
          <Col md={4}>
            <Card className="shadow-sm border-0 rounded-3 p-4 sticky-top">
              <h4>Cart Summary</h4>
              <p>Total Items: {totalItems}</p>
              <h5>Total Price: ₹{totalPrice}</h5>
              <div className="d-grid gap-2 mt-4">
                <Button variant="warning" size="lg">
                  Proceed to Checkout
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
