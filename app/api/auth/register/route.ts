import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, password, password_confirmation } = req.body;

    try {
      // Call external API to register the user
      const response = await axios.post("http://206.1.60.20/api/auth/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      return res.status(200).json(response.data);
    } catch (error: any) {

      return res.status(400).json({
        message: error.response?.data?.message || "Registration failed",
      });
    }
  } else {
    // Return 405 if the method is not POST
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
