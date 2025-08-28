'use client'
import ProductInfo from '@/components/Product/ProductInfo'
import { useParams } from 'next/navigation'
import React from 'react'
const ProductInfoPage = () => {
    const searchParams = useParams()
    const productId  = searchParams.productId


  return (
    <>
        <ProductInfo productId={productId}/>
    </>
  )
}

export default ProductInfoPage