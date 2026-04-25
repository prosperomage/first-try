// src/controllers/internship.controller.ts
// src/controllers/internship.controller.ts
import type { Request, Response } from "express";
import { asc, count, eq, gt } from "drizzle-orm";
import { db } from "../config/db.js";
import { users } from "../config/schema.js";
import { internships } from "../models/internships.models.ts";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { off } from "node:cluster";

// Automatically create types based on your Drizzle schema
type Internship = InferSelectModel<typeof internships>;
type NewInternship = InferInsertModel<typeof internships>;

//CRUD OPERATINS WITH DRIZZLE  (FOR COMPANIES TO CREATE INTERNSHIPS)

// Create an internship
const create = async (req: Request, res: Response) => {
  try {
    // We cast req.body to NewInternship to get autocompletion
    const data: NewInternship = req.body;

    if (!data.title || !data.companyName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const [created] = await db.insert(internships).values(data).$returningId();

    res
      .status(201)
      .json({ message: "Internship created!, now we wait", data: created });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get All
const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get page number from query params
    // Example: /internships?page=2
    const page = Number(req.query.page) || 1;

     // Get limit (how many records per page)
    // Example: /internships?limit=10
    const limit = Number(req.query.limit) || 10;


     // Calculate offset
    // page 1 = (1 - 1) * 10 = 0
    // page 2 = (2 - 1) * 10 = 10
    const offset = (page - 1) * limit;
    const data = await db
      .select()
      .from(internships)
      .limit(limit)
      .offset(offset);

    const total = await db.select({ count: count() }).from(internships);
    res.json({
      page,
      limit,
      total: total[0].count,
      totalPages: Math.ceil(total[0].count / limit),
      data,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching internships", error });
  }
};

// Get One by ID
const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const [internship] = await db
      .select()
      .from(internships)
      .where(eq(internships.id, id))
      .limit(1);

    if (!internship) {
      res.status(404).json({ message: "Not found" });
    }

    res.json(internship);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching internship", error: error.message });
  }
};

// Update
const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const updateData: Partial<NewInternship> = req.body;

    await db.update(internships).set(updateData).where(eq(internships.id, id));

    res.json({ message: "Updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
const deleteInternship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    await db.delete(internships).where(eq(internships.id, id));

    res.json({ message: "Deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "cant delete message" });
  }
};

export { create, getAll, getOne, update, deleteInternship };
