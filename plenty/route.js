import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
        await connectMongoDB();
        await User.create({name,email,password});

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    return NextResponse.json({ message: "User registered", status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user" },
      { status: 500 }
    );
  }
}