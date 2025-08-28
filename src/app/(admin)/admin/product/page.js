"use client";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from 'axios'
import Image from "next/image";
import ProductList from "@/components/Admin/ProductList";
import ProductFilter from "@/components/Admin/ProductFilter/ProductFilter";

const ProductListPage = () => {
  const filters = ["All", "Laptop", "Desktop", "Computer", "Tablets", "Apple", "Accessories"];
  const [activeFilter, setActiveFilter] = useState("All");
 const [products , setProducts] = useState([])
  // Filtering Logic
  async function fetchProducts(){
    const response = await axios.get("/api/product" , {
        params : {

        }
    })
    console.log(response.data)
    setProducts(response.data.records)
  }
  useEffect(()=>{
     fetchProducts()
  }, [activeFilter])
  const filteredProducts =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.tag === activeFilter);

  return (
    <> 
      {/* Products Section */}
      <ProductList />
    </>
  );
};

export default ProductListPage;
