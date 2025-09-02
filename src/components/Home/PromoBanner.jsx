"use client";
import { Carousel, Button, Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { motion } from "framer-motion";

// Replace with your images
import laptopImg from "../../../public/laptop.png";
import gamingImg from "../../../public/desktop.png";
import appleImg from "../../../public/logo.png";
import accessoryImg from "../../../public/image.png";

const PromoCarousel = () => {
  const slides = [
    {
      title: "Upgrade Your Laptop Experience",
      desc: "From ultra-fast performance to sleek designs — discover laptops that fit your style and power needs.",
      imgLeft: appleImg,
      imgRight: accessoryImg,
      btnText: "Shop Laptops",
      link: "/products?tag=laptop",
    },
    {
      title: "Gaming Laptops Built for Winners",
      desc: "Immersive graphics and top-tier speed to level up your gaming journey.",
      imgLeft: gamingImg,
      imgRight: appleImg,
      btnText: "Shop Gaming",
      link: "/products?tag=gaming",
    },
    {
      title: "Apple Collection",
      desc: "Experience premium Apple laptops and accessories that redefine style and power.",
      imgLeft: appleImg,
      imgRight: gamingImg,
      btnText: "Shop Apple",
      link: "/products?tag=apple",
    },
    {
      title: "All Tech Collection",
      desc: "Experience premium Apple laptops and accessories that redefine style and power.",
      imgLeft: gamingImg,
      imgRight: appleImg,
      btnText: "Shop Apple",
      link: "/products?tag=apple",
    },
  ];

  return (
    <Carousel fade interval={5000} className="rounded-4 overflow-hidden shadow-lg">
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <section className="py-5 bg-light">
            <Container>
              <Row className="align-items-center text-center text-md-start">
                {/* Left Image */}
                <Col md={4} className="mb-4 mb-md-0 text-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image src={slide.imgLeft} alt="Product" width={300} height={220} />
                  </motion.div>
                </Col>

                {/* Center Text */}
                <Col md={4} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="fw-bold mb-3">{slide.title}</h2>
                    <p className="text-muted">{slide.desc}</p>
                    <Button
                      variant="danger"
                      size="lg"
                      href={slide.link}
                      className="mt-3"
                    >
                      {slide.btnText} →
                    </Button>
                  </motion.div>
                </Col>

                {/* Right Image */}
                <Col md={4} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image src={slide.imgRight} alt="Product" width={300} height={220} />
                  </motion.div>
                </Col>
              </Row>
            </Container>
          </section>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PromoCarousel;
