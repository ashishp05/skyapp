// app/components/AboutSection.js
"use client";

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import laptop from "../../../public/logo.png"
import Image from "next/image";
import CTAButton from "../Common/CTAButton";
const AboutSection = () => {
  return (
    <section className="py-5 bg-light w-100" id="about">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Image */}
          <Col md={6} className="mb-4 mb-md-0">
            <Image
              src={laptop} // <-- replace with your image in public folder
              alt="About Us"
              className="img-fluid rounded shadow"
              height={700}
              width={650}
            />
          </Col>

          {/* Right Side - Content */}
          <Col md={6}>
            <h2 className="fw-bold g-2">About Us</h2>
            <h5 className="text-primary mb-3">Powering Your Digital Journey for Over 10 Years</h5>
            <p>
              We are a trusted name in the computer industry with <strong>10+ years of
              experience</strong> delivering high-quality laptops, desktops, and PC
              accessories.
            </p>
            <p>
              Our specialty lies in offering <strong>imported second-hand laptops
              from Dubai and the US</strong>, carefully tested and refurbished to
              ensure top-notch performance at unbeatable prices.
            </p>
            <ul>
              <li> Quality Products – tested & reliable</li>
              <li> Affordable Pricing – best value for money</li>
              <li> Expert Support – guiding you to the right choice</li>
              <li> Global Imports – access to the best from Dubai & US</li>
            </ul>
          
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
