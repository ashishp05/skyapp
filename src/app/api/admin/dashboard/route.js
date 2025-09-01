import { connectDB } from "@/db/mongoose";
import Product from "@/models/product";
import { NextResponse } from "next/server";


export async function GET(req) {
    
    try {
        
        await connectDB();
        let totalProducts = await Product.countDocuments();
        let totalLaptops = await Product.countDocuments({tag : "laptop"});
        let totalDesktop = await Product.countDocuments({tag : "desktop"});
        let other = await Product.countDocuments({tag : "accesories"});

      return NextResponse.json({
        totalProducts , totalDesktop , totalLaptops , other
      })
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