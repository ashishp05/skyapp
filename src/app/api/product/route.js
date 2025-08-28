import { connectDB } from "@/db/mongoose";
import Product from "@/models/product";
import Util from "@/utils/util";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {  
  try { 
    await connectDB()
    const { searchParams } = new URL(req.url);
    let limit = parseInt(searchParams.get("limit")) || 0;
    let skip = parseInt(searchParams.get("skip")) || 0;
    let sortKey = searchParams.get("sortKey") || null;
    let sortOrder = parseInt(searchParams.get("sortOrder")) || -1;
    let tag = searchParams.get("tag") || 'all';
    let needCount =
      (searchParams.get("needCount") + "").toLowerCase() === "true";

    let startDate = searchParams.get("startDate") || null;
    let endDate = searchParams.get("endDate") || null;

    let searchTerm = searchParams.get("searchTerm") || "";
    let searchQuery = {};

    if (searchTerm) {
      searchQuery["$or"] = [
        {
          name: {
            $regex: Util.wrapWithRegexQry(searchTerm),
            $options: "i",
          },
        }
      ];
    }

    if (startDate && endDate) {
      startDate = new Date(startDate);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(endDate);
      endDate.setHours(23, 59, 59, 999);
      searchQuery[createdAt] = { $gte: startDate, $lte: endDate };
    } 
    if(tag && (tag != 'all'))
    {
      searchQuery["tag"] = tag 
    } 


    const { total, records } = await Promise.all([
      needCount ? Product.countDocuments(searchQuery) : undefined,
      Product.find(searchQuery)
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .sort({ [sortKey]: parseInt(sortOrder) }),
    ]).then(([total, records]) => ({ total, records }));

    return NextResponse.json({ total, records });
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
