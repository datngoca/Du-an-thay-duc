import { Router } from "express";
import { getAllJobHistories, getPaginationJobHistory, getJobHistoryById,createJobHistory, deleteJobHistory, updateJobHistoryById } from "../controllers/jobHistory2.controller.js";


const router = Router();
router.get("/", getAllJobHistories);
router.get("/pagination", getPaginationJobHistory);



router.get("/:jobHistoryId", getJobHistoryById);

router.post("/", createJobHistory);
router.put("/:jobHistoryId", updateJobHistoryById);

router.delete("/:jobHistoryId", deleteJobHistory);


export default router;
