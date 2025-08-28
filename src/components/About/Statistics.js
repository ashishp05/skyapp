"use client";
import React from "react";
import { FaUsers, FaAward, FaBuilding } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    { number: "13+", label: "Years Experience", icon: <FaAward size={40} className="text-danger" /> },
    { number: "1,000+", label: "Dealers", icon: <FaUsers size={40} className="text-danger" /> },
    { number: "13+", label: "Brands", icon: <FaBuilding size={40} className="text-danger" /> },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">SkyTech solutions</h2>
          <p className="text-muted fs-5">
            <span className="fw-semibold">A Snapshot of Excellence.</span> Skytech, based in Ahmedabad, has been serving the IT industry for over 13 years with a strong presence across India. With 1200+ corporate and SME clients, 1000+ dealers, and partnerships with leading global brands, we deliver reliable laptops, desktops, and computer accessories. Our focus on quality, trust, and customer satisfaction has made us a preferred choice for businesses and individuals alike.
          </p>
        </div>

        <div className="row justify-content-center">
          {stats.map((stat, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card border-0 shadow-sm h-100 rounded-4 text-center p-4">
                <div className="d-flex justify-content-center mb-3">
                  <div className="bg-light rounded-circle p-3  shadow-sm">
                    {stat.icon}
                  </div>
                </div>
                <h2 className="fw-bold">{stat.number}</h2>
                <p className="mb-0 text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
