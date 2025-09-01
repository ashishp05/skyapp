'use client'
import ProductInfo from '@/components/Product/ProductInfo'
import { useParams } from 'next/navigation'
import React from 'react'

const ProductInfoAdmin = () => {
   const searchParams = useParams()
      const productId  = searchParams.productId
  return (
    <div>
       <ProductInfo  productId={productId}/>
    </div>
  )
}

export default ProductInfoAdmin