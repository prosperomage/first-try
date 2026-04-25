// src/config/db.js
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import 'dotenv/config';

// Create the connection pool (better for performance than a single connection)
// const pool = mysql.createPool(process.env.DATABASE_URL);
const pool = mysql.createPool(process.env.DATABASE_URL!);

export const db = drizzle(pool);

// Helper to verify connection
export const checkDbConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(" Database Connected (via Pool)");
    connection.release();
  } catch (error) {
    console.error(" Database connection failed:", error);
    throw error;
  }
};