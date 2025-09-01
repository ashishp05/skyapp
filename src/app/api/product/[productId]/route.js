import { connectDB } from '@/db/mongoose';
import Product from '@/models/product';
import ValidationError from '@/utils/ValidationError';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req , {params}) {
    try {
        await connectDB()

        const {productId} =await params
      
        if(!productId)
        {
            throw new ValidationError("ProductId is not definded.")
        }

        const product = await Product.findById(productId)
         
        if(!product)
        {
            throw new ValidationError("Product not found.")
        }
        
        return NextResponse.json({product})
    } catch (error) {
         if (error.name == "ValidationError" || typeof error == "ValidationError") {
              return NextResponse.json(
                { error: error.message },
                { status: 400 } // Bad Request
              );
            }
        
            return NextResponse.json(
              {
                success: false,
                message: "Internal Server Error",
                error: error.message,
              },
              { status: 500 }
            );
                
          }
    
        }


export async function PATCH(req , {params}) {
    try {
        await connectDB()

        const body = await req.json();

        const {productId} =await params
      
        if(!productId)
        {
            throw new ValidationError("ProductId is not definded.")
        }

        const product = await Product.findById(productId)
         
        if(!product)
        {
            throw new ValidationError("Product not found.")
        }

       const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: {
        name : body.name ,
        description : body.description,
        tag : body.tag ,
        productDetails :{
            brand : body.productDetails.brand,
            processor : body.productDetails.processor,
            RAM : body.productDetails.RAM,
            weight : body.productDetails.weight,
            storage :body.productDetails.storage,
            display : body.productDetails.display,
            graphics : body.productDetails.graphics,
            os : body.productDetails.os,
            connectionTypes : body.productDetails.connectionTypes,
        }
      } },
      { new: true, runValidators: true }
    );
        
        return NextResponse.json({product : updatedProduct})
    } catch (error) {
         if (error.name == "ValidationError" || typeof error == "ValidationError") {
              return NextResponse.json(
                { error: error.message },
                { status: 400 } // Bad Request
              );
            }
        
            return NextResponse.json(
              {
                success: false,
                message: "Internal Server Error",
                error: error.message,
              },
              { status: 500 }
            );
                
          }
    
}


export async function DELETE(req , {params}) {
    try {
        await connectDB()

        const {productId} =await params
      
        if(!productId)
        {
            throw new ValidationError("ProductId is not definded.")
        }

        const product = await Product.findById(productId)
         
        if(!product)
        {
            throw new ValidationError("Product not found.")
        }

       const updatedProduct = await Product.findByIdAndDelete(productId);

        return NextResponse.json({})
    } catch (error) {
         if (error.name == "ValidationError" || typeof error == "ValidationError") {
              return NextResponse.json(
                { error: error.message },
                { status: 400 } // Bad Request
              );
            }
        
            return NextResponse.json(
              {
                success: false,
                message: "Internal Server Error",
                error: error.message,
              },
              { status: 500 }
            );
                
          }
    
}

