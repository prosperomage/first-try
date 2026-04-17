// src/controllers/internship.controller.ts
// src/controllers/internship.controller.ts
import type { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { internships } from "../config/schema.js";

import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

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

   const [created] =  await db.insert(internships).values(data).$returningId();
    
    res.status(201).json({ message: "Internship created!, now we wait",  data: created });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get All
const getAll = async (req:Request, res: Response) => {
  try {
    const allInternships: Internship[] = await db.select().from(internships);
    res.json(allInternships);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching internships", error});
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
    res.status(500).json({ message: "Error fetching internship", error: error.message });
  }
};

// Update
const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const updateData: Partial<NewInternship> = req.body;

    await db
      .update(internships)
      .set(updateData)
      .where(eq(internships.id, id));

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
    res.status(500).json({ error: error.message });
  }
};

export { create, getAll, getOne, update, deleteInternship };
