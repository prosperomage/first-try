

//setup with drizzle and mySQL 
import dotenv from "dotenv";
import  app from "./src/app.ts";


dotenv.config();



// import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import 'dotenv/config';

const connection = await mysql.createConnection(process.env.DATABASE_URL!);
export const db = drizzle(connection);


const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    // Test DB connection
    const db = drizzle(process.env.DATABASE_URL!);
    console.log("Database Connected ");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}, we active!!! `);
    });

  } catch (error) {
    console.error("Server failed to start ", error);
    process.exit(1);
  }
}

startServer();



