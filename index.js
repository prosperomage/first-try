// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import app from "./app.js";

// dotenv.config({
//   path: "./.env",
// });

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.on("error", (error) => {
//       console.log("error", error);
//       throw error;
//     });
//     app.listen(process.env.PORT);
//   } catch (error) {
//     console.log("mongodb connection failed", error);
//   }
// };

// startServer();

//setup with prisma and mySQL 
import dotenv from "dotenv";
import app from "./src/app.js";
import { prisma } from "./src/lib/prisma.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    // Test DB connection
    await prisma.$connect();
    console.log("Database Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}, we active!!! 🚀`);
    });

  } catch (error) {
    console.error("Server failed to start ❌", error);
    process.exit(1);
  }
}

startServer();



