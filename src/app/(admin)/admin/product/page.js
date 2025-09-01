"use client";
import { useEffect, useState } from "react";
import axios from 'axios'

import ProductList from "@/components/Admin/ProductList/ProductList";

const ProductListPage = () => {
  return (
    <> 
      {/* Products Section */}
      <ProductList />
    </>
  );
};

export default ProductListPage;
