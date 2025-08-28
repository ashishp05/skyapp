import { connectDB } from "@/db/mongoose";
import Admin from "@/models/admin";
import ValidationError from "@/utils/ValidationError";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    let dbUser = req.headers.get("dbuser");

    if (!((dbUser + "").toLowerCase() == "true")) {
      throw new ValidationError(
        "You have not allow to add another Admin. please contact."
      );
    }

    let email = body.email;
    email = (email + "").trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      throw new ValidationError("Enter Valid Email and Password.");
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) throw new ValidationError("Admin is already present.");

    const admin = new Admin(body);
    admin.userType = 1;

    if (!admin.isValidPassword(body.password))
      throw new ValidationError("Password is not Valid.");

    await admin.save();

    const token = admin.createAuthToken();

    await Admin.updateOne(
      {
        _id: admin._id,
      },
      {
        $push: {
          tokens: { token: token },
        },
      }
    );
    return NextResponse.json({
      user: admin,
      token,
    });
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
