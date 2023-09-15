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
        const { email, password } = await req.body;
        const user = await User.findOne({ email });

        if (!user) {
          const error = new Error("Email does not Exist");
          error.code = 403;
          throw error;
        }
        const hashedPassword = bcrypt.compare(user.password, password);
        console.log(hashedPassword);
        if (hashedPassword == false) {
          const error = new Error(`Wrong password ${hashedPassword}`);
          error.code = 403;
          throw error;
        }

        return res.json({
          message: "Login Successful",
          status: 200,
          data: user,
        });
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
