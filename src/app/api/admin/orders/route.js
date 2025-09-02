import { NextResponse } from "next/server";

import Order from "@/models/order"; // your Mongoose Order model
// assuming same Util with wrapWithRegexQry()
import { connectDB } from "@/db/mongoose";
import Util from "@/utils/util";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // Pagination & sorting
    let limit = parseInt(searchParams.get("limit")) || 0;
    let skip = parseInt(searchParams.get("skip")) || 0;
    let sortKey = searchParams.get("sortKey") || "createdAt";
    let sortOrder = parseInt(searchParams.get("sortOrder")) || -1;

    // Filtering
    let needCount =
      (searchParams.get("needCount") + "").toLowerCase() === "true";

    let startDate = searchParams.get("startDate") || null;
    let endDate = searchParams.get("endDate") || null;

    // Search
    let searchTerm = searchParams.get("searchTerm") || "";
    let searchQuery = {};

    if (searchTerm) {
      searchQuery["$or"] = [
        {
          userRef: {
            $regex: Util.wrapWithRegexQry(searchTerm),
            $options: "i",
          },
        },
        {
          "items.name": {
            $regex: Util.wrapWithRegexQry(searchTerm),
            $options: "i",
          },
        },
      ];
    }

    // Date range filter
    if (startDate && endDate) {
      startDate = new Date(startDate);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(endDate);
      endDate.setHours(23, 59, 59, 999);

      searchQuery["createdAt"] = { $gte: startDate, $lte: endDate };
    }

    // Fetch data
    const { total, records } = await Promise.all([
      needCount ? Order.countDocuments(searchQuery) : undefined,
      Order.find(searchQuery)
        .limit(limit)
        .skip(skip)
        .sort({ [sortKey]: sortOrder }),
    ]).then(([total, records]) => ({ total, records }));

    return NextResponse.json({ total, records });
  } catch (error) {
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
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
