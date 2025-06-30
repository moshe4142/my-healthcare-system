// pages/api/products/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/lib/db"; // ודא שזו ההגדרה הנכונה שלך לחיבור ל-PostgreSQL

type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | { message: string }>
) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, description, imageurl AS "imageUrl", price FROM products WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product: Product = result.rows[0];
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
