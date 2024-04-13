import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const mysqlConfig = {
  host: 'localhost',  // Hostname của MySQL
  user: 'root',
  port: '3306',    
  password: 'ngocdat02052003',  // Mật khẩu MySQL
  database: 'payroll'  // Tên cơ sở dữ liệu MySQL
};

const pool = mysql.createPool(mysqlConfig);

const getEmployeeData = async (req, res) => {
  try {
    const result = await pool.promise().query('SELECT * FROM Employee');
    res.send(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};

const addEmployeeData = async (req, res) => {
  try {
    const {
      Employee_Number,
      idEmployee,
      Last_Name,
      First_Name,
      SSN,
      Pay_Rate,
      PayRates_id,
      Vacation_Days,
      Paid_To_Date,
      Paid_Last_Year,
    } = req.body;

    const result = await pool.promise().query(`
      INSERT INTO Employee (Employee_Number, idEmployee, Last_Name, First_Name, SSN, Pay_Rate, PayRates_id, Vacation_Days, Paid_To_Date, Paid_Last_Year)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      Employee_Number,
      idEmployee,
      Last_Name,
      First_Name,
      SSN,
      Pay_Rate,
      PayRates_id,
      Vacation_Days,
      Paid_To_Date,
      Paid_Last_Year,
    ]);
    
    res.send(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};

const deleteEmployeeData = async (req, res) => {
  try {
    const { Employee_Number } = req.body;

    const result = await pool.promise().query(`
      DELETE FROM Employee 
      WHERE Employee_Number = ?
    `, [Employee_Number]);
    
    res.send(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};

const updateEmployeeData = async (req, res) => {
  try {
    const {
      idEmployee,
      Last_Name,
      First_Name,
      SSN,
      Pay_Rate,
      PayRates_id,
      Vacation_Days,
      Paid_To_Date,
      Paid_Last_Year,
    } = req.body;

    const result = await pool.promise().query(`
      UPDATE Employee 
      SET 
        idEmployee = ?,
        Last_Name = ?,
        First_Name = ?,
        SSN = ?,
        Pay_Rate = ?,
        PayRates_id = ?,
        Vacation_Days = ?,
        Paid_To_Date = ?,
        Paid_Last_Year = ?
      WHERE Employee_Number = ?
    `, [
      idEmployee,
      Last_Name,
      First_Name,
      SSN,
      Pay_Rate,
      PayRates_id,
      Vacation_Days,
      Paid_To_Date,
      Paid_Last_Year,
      Employee_Number,
    ]);
    
    res.send(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};

const getEmployeeDataById = async (req, res) => {
  try {
    const { Employee_Number } = req.params;

    const result = await pool.promise().query(`
      SELECT * FROM Employee 
      WHERE Employee_Number = ?
    `, [Employee_Number]);
    
    res.send(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  }
};

export default {
  getEmployeeData,
  addEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
  getEmployeeDataById,
};
