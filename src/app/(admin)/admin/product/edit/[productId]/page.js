'use client'
import ProductForm from '@/components/Admin/ProductForm/ProductForm'
import axios from 'axios'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProductInfoAdmin = () => {
   const searchParams = useParams()
   const [product , setProduct] = useState({})
      const productId  = searchParams.productId
      const getProductData = async (   ) =>{
            const res = await axios.get("/api/product/"+productId)
            setProduct(res.data.product)
      }
        useEffect(()=>{
        getProductData()
        },[])
      return (
    <div>
       <ProductForm  initialData={product} />
    </div>
  )
}

export default ProductInfoAdmin