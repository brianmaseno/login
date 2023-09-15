import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import { POST } from "../userExists/route";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        await connectMongoDB();
        console.log(req);
        const { name, email, password } = await req.body;
        const user = await User.findOne({ email }).select("_id");
        if (user) {
          const error = new Error("Email Exists");
          error.code = 403;
          throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({ name, email, password: hashedPassword ,file_url:"nairobi"});

        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Password:", password);

        return res.json({ message: "User registered", status: 200 });
        break;

      case "PATCH":
        try {
          await connectMongoDB();
          console.log(req);
          const { id, file } = await req.body;
          const userinfo = await User.findOne({ _id: id });
          if (!userinfo) {
            const error = new Error("User does not exist");
            error.code = 404;
            throw error;
          }
          userinfo.file_url =file
          await userinfo.save()
          return res.json({ message: "User registered", status: 200 });
        } catch (error) {}

        break;

      default:
        break;
    }
  } catch (error) {
    return res.json({ message: error.message }, { status: error.code });
  }
}

//  import { NextResponse } from "next/server";

//  export async function POST(req){
//     try {
//         const {name,email,passwerd} = await req.json();
//         console.log("Name:",name);
//         console.log("Email:",email);
//         console.log("Password:",password);
//         return NextResponse.json({message:"User registered"},{status:200});
//     } catch (error) {
//         return NextResponse.json(
//             {message:"An error occured while registering the user"},{status:500}
//         );

//     }
//  }
