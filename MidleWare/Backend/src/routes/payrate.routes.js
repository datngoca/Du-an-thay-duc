import { Router } from "express";
import { createPayrate, deletePayrate, getPaginationPayrate, getPayrate, getPayrates, updatePayrate } from "../controllers/payrate.controller.js";


const router = Router();
router.get("/", getPaginationPayrate);

router.get("/", getPayrates);

router.get("/:payrateId", getPayrate);

router.post("/", createPayrate);
router.put("/:payrateId", updatePayrate);

router.delete("/:payrateId", deletePayrate);

export default router;
