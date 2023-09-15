// pages/api/getUser.js

import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    const user = await db.collection("usertable").findOne({});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
