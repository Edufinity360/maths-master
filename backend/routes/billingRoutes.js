import express from "express";
import {
  createInvoice,
  markPaid,
  getInvoices,
  deleteInvoice
} from "../controllers/billingController.js";

const router = express.Router();

router.post("/invoice", createInvoice);
router.put("/paid/:id", markPaid);
router.get("/", getInvoices);
router.delete("/:id", deleteInvoice);

export default router;