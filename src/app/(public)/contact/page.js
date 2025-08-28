"use client";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const ContactPage = () => {
  return (
    <section className="py-5 bg-light w-100">
      <Container>
        {/* Hero Section */}
        <Row className="align-items-center g-5 d-flex justify-content-center">
          {/* Left Column - Form */}
          <Col md={6}>
            <h2 className="fw-bold mb-4 text-primary">Get in Touch</h2>
            <p className="text-muted mb-4">
              Have questions, feedback, or need support? Fill out the form below
              and we’ll get back to you as soon as possible.
            </p>

            <Card className="shadow-sm border-0 p-4 rounded-4">
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="fw-semibold">Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label className="fw-semibold">Phone</Form.Label>
                  <Form.Control type="text" placeholder="Enter your phone number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="city">
                  <Form.Label className="fw-semibold">City</Form.Label>
                  <Form.Control type="text" placeholder="Enter your city" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="message">
                  <Form.Label className="fw-semibold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Write your message"
                  />
                </Form.Group>

                <Button variant="primary" className="w-100 fw-semibold" disabled>
                  Submit (Static)
                </Button>
              </Form>
            </Card>
          </Col>

          {/* Right Column - Info Cards */}
          <Col md={6}>
            <Row className="g-4 w-100 mt-5 d-flex  justify-content-center align-items-center">
              <Col md={12}>
                <Card className="contact-card shadow-sm border-0 rounded-4 h-100 p-4">
                  <Card.Body className="d-flex align-items-start gap-3">
                    <div className="icon-circle bg-primary text-white">
                      <FaMapMarkerAlt size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold text-primary">Address</h5>
                      <p className="mb-0 text-muted">
                        Skytech Store, Main Market Road,  
                        Surat, Gujarat, India - 395001
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={12}>
                <Card className="contact-card shadow-sm border-0 rounded-4 h-100 p-4">
                  <Card.Body className="d-flex align-items-start gap-3">
                    <div className="icon-circle bg-success text-white">
                      <FaPhoneAlt size={22} />
                    </div>
                    <div>
                      <h5 className="fw-bold text-success">Contact</h5>
                      <p className="mb-1 text-muted">+91 98765 43210</p>
                      <p className="mb-0 text-muted">
                        <FaEnvelope className="me-2" /> support@skytech.com
                      </p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={12}>
                <Card className="contact-card shadow-sm border-0 rounded-4 h-100 p-4">
                  <Card.Body className="d-flex align-items-start gap-3">
                    <div className="icon-circle bg-warning text-dark">
                      <FaClock size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold text-warning">Working Hours</h5>
                      <p className="mb-1 text-muted">Mon - Sat: 10:00 AM - 8:00 PM</p>
                      <p className="mb-0 text-muted">Sunday: Closed</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Google Map */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.236027694779!2d72.83106161534456!3d21.170240985921704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f1cbe3b76e5%3A0xdda9142f2c8c2d2!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1692890087625!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Extra Styles */}
      <style jsx>{`
        .contact-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        .icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
};

export default ContactPage;
