import { Router } from "express";
import {
  create,
  deleteInternship,
  getAll,
  getOne,
  update,
} from "../controllers/internship.controller.ts";

const router = Router();

router.route("/create").post(create);
router.route("/update/:id").patch(update);
router.route("/delete/:id").delete(deleteInternship);
router.route("/read").get(getAll);
router.route("/readOne/:id").get(getOne);

export default router;
