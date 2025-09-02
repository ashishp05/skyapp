'use client'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import img1 from "../../../public/image.png"
import img2 from "../../../public/desktop.png"
import img3 from "../../../public/laptop.png"

function HeroSection() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='w-100 p-0 '>
      <Carousel.Item>
        <ExampleCarouselImage text={img1} />
        <Carousel.Caption>
          <h3>Welcome to SkyTech</h3>
          <p>Your one-stop destination for the latest gadgets and technology.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage text={img3} />
        <Carousel.Caption>
          <h3>Explore Our Laptops</h3>
          <p>High-performance laptops designed for work, gaming, and creativity.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage text={img2} />
        <Carousel.Caption>
          <h3>Discover Our Desktops</h3>
          <p>Powerful desktops built to boost productivity and performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroSection;
