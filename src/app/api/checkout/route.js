import { connectDB } from "@/db/mongoose";
import Order from "@/models/order";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { userRef, items, totalPrice, totalQty } = body;

    if (!items || items.length == 0) {
      return NextResponse.json({
        message: "Cart is Empty.",
      });
    }
    if (!totalPrice || !totalQty) {
      return NextResponse.json({
        message: "Invalid Credentials",
      });
    }

    // 1. Enrich items with product details
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId).select(
          "name price"
        );
      
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        return {
          productId: item.productId,
          qty: item.qty,
          name: product.name,
          price: product.price,
        };
      })
    );

    // 2. Now use enrichedItems to create the order
    const order = new Order({
      userRef: userRef || "001",
      items: enrichedItems,
      totalPrice,
      totalQty,
    });

    await order.save();


    return NextResponse.json({ message: "order placed Successfully." });
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
