"use client";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaLaptop, FaDesktop, FaTabletAlt, FaApple, FaKeyboard } from "react-icons/fa";
import { MdComputer } from "react-icons/md";
import { motion } from "framer-motion";

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
    <section className=" w-100">
      <Container>
        <motion.h2
          className="text-center  mb-5 fw-bold display-5 pb-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Shop By Category
        </motion.h2>
        <Row className="justify-content-center g-2">
          {cards.map((card, index) => (
            <Col xs={6} sm={6} md={4} lg={2} key={index} className="d-flex justify-content-around">
              <Link href={`/product`} className="text-decoration-none text-dark">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Card
                    className="d-flex flex-column align-items-center justify-content-center rounded-circle shadow-sm "
                    style={{
                      width: "125px",
                      height: "125px",
                      cursor: "pointer",
                      background: "white",
                    }}
                  >
                    <motion.div
                      className="mb-2 text-primary"
                      whileHover={{ rotate: 40 }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.icon}
                    </motion.div>
                    <Card.Text className="fw-bold text-center">{card.label}</Card.Text>
                  </Card>
                </motion.div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ShopByTag;
