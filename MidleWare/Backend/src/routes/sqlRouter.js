import express from 'express';
import sqlController from '../controllers/sqlController.js';

const router = express.Router();

router.get('/personal_sql', sqlController.getPersonalData);
router.post('/personal_sql', sqlController.addPersonalData); // Thêm route POST để thêm dữ liệu cá nhân mới
router.put('/personal_sql', sqlController.updatePersonalData); // Thêm route PUT để cập nhật dữ liệu cá nhân
router.delete('/personal_sql', sqlController.deletePersonalData); // Thêm route DELETE để xóa dữ liệu cá nhân
router.get('/personal_sql/:id', sqlController.getPersonalDataById); // Thêm route GET để lấy dữ liệu cá nhân theo ID

export default router;
