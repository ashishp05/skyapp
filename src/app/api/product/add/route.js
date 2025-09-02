import { NextResponse } from "next/server";
import Product from "@/models/product";
import { connectDB } from "@/db/mongoose";
import ValidationError from "@/utils/ValidationError";

export async function POST(req)
{
  try {

    await connectDB()
    const body = await req.json() 
    let name = body.name ;
    name = (name + "").trim()
    let description = body.description;
    description = (description + "").trim()
    let tag = body.tag
    tag = (tag + "").trim().toLowerCase()

    if(!name || !description || !tag)
    {
        throw new ValidationError("Empty data fields")
    } 
    
    let images = body.images || []
 
    const productDetails = {
        brand : body.productDetails.brand ,
        processor : body.productDetails.processor  ,
        RAM : body.productDetails.RAM ,
        storage : body.productDetails.storage,
        display  :body.productDetails.display ,
        graphics : body.productDetails.graphics ,
        os : body.productDetails.os ,
        connectionTypes : body.productDetails.connectionTypes,
        weight :body.productDetails.weight, 
    }
    
    const product = new Product({
      name : name ,
      description : description,
      tag : tag,
      images : images,
      productDetails : productDetails,
      price : body.price || 0
    }) 

    await product.save()
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