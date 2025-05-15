import type { NextApiRequest, NextApiResponse } from "next";
import { sendResetEmail } from "../../lib/sendEmail"; // עדכן את הנתיב לפי הצורך
import { v4 as uuidv4 } from "uuid";
// import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // const user = await prisma.user.findUnique({ where: { email } });
    const user = { id: "1", email }; // לדוגמה בלבד אם אין DB עדיין

    if (!user) {
      return res.status(200).json({ message: "If the email exists, a reset link has been sent." }); // ❗️אבטחה
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // שעה מהיום

    // await prisma.passwordResetToken.create({
    //   data: { token, userId: user.id, expiresAt },
    // });

    const resetLink = `${req.headers.origin}/reset-password/${token}`;

    const sent = await sendResetEmail(email, resetLink);

    if (!sent) {
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ message: "If the email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Error sending reset email:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
