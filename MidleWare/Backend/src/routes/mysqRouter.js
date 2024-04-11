import express from 'express';
import sqlController from '../controllers/mysqlController.js';
import mysqlController from '../controllers/mysqlController.js';

const router = express.Router();

router.get('/employee_mysql', mysqlController.getEmployeeData);
router.post('/employee_mysql', mysqlController.addEmployeeData); // Thêm route POST để thêm dữ liệu cá nhân mới
router.put('/employee_mysql', mysqlController.updateEmployeeData); // Thêm route PUT để cập nhật dữ liệu cá nhân
router.delete('/employee_mysql', mysqlController.deleteEmployeeData); // Thêm route DELETE để xóa dữ liệu cá nhân
router.get('/employee_mysql/:id', mysqlController.getEmployeeDataById); // Thêm route GET để lấy dữ liệu cá nhân theo ID

export default router;