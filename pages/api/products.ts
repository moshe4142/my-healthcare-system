// pages/api/products.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";
import pool from '@/lib/db'; 
// Setup PostgreSQL pool connectiona

type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | { message: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const result = await pool.query(
      `SELECT id, name, description, imageurl AS "imageUrl", price FROM products`
    );

    const products: Product[] = result.rows;
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
