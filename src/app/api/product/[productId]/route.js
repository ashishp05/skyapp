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
      console.log(body)
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
            brand : body.brand,
            processor : body.processor,
            RAM : body.RAM,
            weight : body.weight,
            storage :body.storage,
            display : body.display,
            graphics : body.graphics,
            os : body.os,
            connectionTypes : body.connectionTypes,
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

