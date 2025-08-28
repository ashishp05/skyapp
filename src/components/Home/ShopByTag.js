"use client";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaLaptop, FaDesktop, FaTabletAlt, FaApple, FaKeyboard } from "react-icons/fa";
import { MdComputer } from "react-icons/md";

const ShopByTag = () => {
  const cards = [
    { label: "Laptop", icon: <FaLaptop size={40} /> },
    { label: "Desktop", icon: <FaDesktop size={40} /> },
    { label: "Computer", icon: <MdComputer size={40} /> },
    { label: "Tablets", icon: <FaTabletAlt size={40} /> },
    { label: "Apple", icon: <FaApple size={40} /> },
    { label: "Accessories", icon: <FaKeyboard size={40} /> },
  ];

  return (
    <section className="py-5 bg-light w-100">
      <Container>
        <h2 className="text-center mb-5 fw-bold pb-3 border-bottom border-primary">
          Shop By Category
        </h2>
        <Row className="justify-content-center g-4">
          {cards.map((card, index) => (
            <Col xs={6} md={4} lg={2} key={index} className="d-flex justify-content-center">
              <Link
                href={`/product`}
                className="text-decoration-none text-dark"
              >
                <Card
                  className="d-flex flex-column align-items-center justify-content-center rounded-circle shadow-sm border"
                  style={{
                    width: "150px",
                    height: "150px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div className="mb-2 text-primary">{card.icon}</div>
                  <Card.Text className="fw-semibold">{card.label}</Card.Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ShopByTag;
