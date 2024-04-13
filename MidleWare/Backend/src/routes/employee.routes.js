import { Router } from "express";
import {deleteCombinedData,updateCombinedData,getDataByEmployeeID,createEmployeeData,getCombinedData} from "../controllers/employee.controller.js";

import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();


router.post("/", createEmployeeData);
router.get("/combionedData", getCombinedData);

router.delete("/:Employee_ID", deleteCombinedData); // Thêm router xoá nhân viên
router.put("/:Employee_ID", updateCombinedData); // Thêm router chỉnh sửa nhân viên


// router.post("/", [verifyToken, isAdmin, checkExistingUser], createEmployee);
// router.get("/", [verifyToken, isAdmin, checkExistingUser], getEmployees);
//router.get("/:employeeId", [verifyToken, isAdmin, checkExistingUser], getEmployee);
router.get("/:Employee_ID",  getDataByEmployeeID);
//router.get("/checkEmployeeId/:Employee_ID", getEmployeeByEmployeeID);
export default router;
