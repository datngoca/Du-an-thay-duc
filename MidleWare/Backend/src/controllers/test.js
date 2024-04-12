import Employee from "../models/Employee.js";
import { connectToMySQL } from "../mysqlConfig.js";
import sqlConfig from "../sqlConfig.js";
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Lấy dữ liệu Employee từ MySQL
export const getEmployeeMySQL = async (employeeId) => {
  try {
    await connectToMySQL();
    const [rows] = await pool.promise().query('SELECT * FROM employees WHERE employeeId = ?', [employeeId]);
    return rows[0];
  } catch (error) {
    console.error("Error fetching employee from MySQL:", error.message);
    return null;
  } finally {
    pool.end();
  }
};

// Lấy dữ liệu Employee từ SQL Server
export const getEmployeeSQLServer = async (employeeId) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`SELECT * FROM employees WHERE employeeId = ${employeeId}`;
    return result.recordset[0];
  } catch (error) {
    console.error("Error fetching employee from SQL Server:", error.message);
    return null;
  } finally {
    sql.close();
  }
};

// Lấy dữ liệu Employee từ cả MySQL và SQL Server
export const getCombinedEmployeeData = async (employeeId) => {
    try {
        // Lấy dữ liệu từ MySQL
        const mysqlEmployees = await pool.promise().query('SELECT * FROM Employee');
        const mysqlData = mysqlEmployees[0];

        // Lấy dữ liệu từ SQL Server
        await sql.connect(sqlConfig);
        const result = await sql.query('SELECT * FROM Personal');
        const sqlData = result.recordset;

        const combinedData = {};

        // Duyệt qua từng nhân viên từ MySQL
        for (let mysqlEmployee of mysqlData) {
            // Tìm thông tin cá nhân tương ứng từ SQL Server
            const personal = sqlData.find(personal => personal.Employee_Number === mysqlEmployee.Employee_Number);

            if (personal) {
                combinedData[mysqlEmployee.Employee_Number] = {
                    ...personal,
                    ...mysqlEmployee
                };
            } else {
                combinedData[mysqlEmployee.Employee_Number] = {
                    ...mysqlEmployee,
                    idEmployee: mysqlEmployee.idEmployee,
                    Last_Name: mysqlEmployee.Last_Name,
                    First_Name: mysqlEmployee.First_Name,
                    SSN: null,
                    Pay_Rate: null,
                    PayRates_id: null,
                    Vacation_Days: null,
                    Paid_To_Date: null,
                    Paid_Last_Year: null
                };
            }
        }

        // Kiểm tra và thêm những thông tin cá nhân từ SQL Server mà không có trong MySQL
        for (let personal of sqlData) {
            if (!combinedData[personal.Employee_Number]) {
                combinedData[personal.Employee_Number] = {
                    ...personal,
                    idEmployee: null,
                    Last_Name: null,
                    First_Name: null,
                    SSN: personal.SSN,
                    Pay_Rate: personal.Pay_Rate,
                    PayRates_id: personal.PayRates_id,
                    Vacation_Days: personal.Vacation_Days,
                    Paid_To_Date: personal.Paid_To_Date,
                    Paid_Last_Year: personal.Paid_Last_Year
                };
            }
        }

        // Trả về dữ liệu kết hợp
        res.json({ success: true, data: Object.values(combinedData) });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi máy chủ');
    } finally {
        sql.close(); // Đảm bảo đóng kết nối với SQL Server sau khi sử dụng xong
    }
};

export const createEmployee = async (req, res) => {
  try {
    const { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;

    // Tạo mới Employee
    const newEmployee = new Employee({
      employeeId,
      firstName,
      lastName,
      vacationDays,
      paidToDate,
      paidLastYear,
      payRate,
      payRateId
    });

    // Lưu Employee vào MySQL
    const resultMySQL = await createEmployeeMySQL(newEmployee);

    // Lưu Employee vào SQL Server
    await sql.connect(sqlConfig);
    await sql.query(`INSERT INTO employees (employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId) 
      VALUES (${employeeId}, '${firstName}', '${lastName}', ${vacationDays}, ${paidToDate}, ${paidLastYear}, ${payRate}, ${payRateId})`);

    return res.status(200).json({
      success: true,
      message: "Employee created successfully",
      data: newEmployee
    });
  } catch (error) {
    console.error("Error creating employee:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  } finally {
    sql.close();
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    // Lấy dữ liệu từ cả MySQL và SQL Server
    const result = await getCombinedEmployeeData(employeeId);

    if (result.success) {
      return res.json({ success: true, data: result.data });
    } else {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error getting employee:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getEmployeeByEmployeeID = async (req, res, next) => {
  try {
    const { Employee_ID } = req.params;

    // Lấy dữ liệu từ cả MySQL và SQL Server
    const result = await getCombinedEmployeeData(Employee_ID);

    if (result.success) {
      return res.json({ success: true, data: result.data });
    } else {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error getting employee by Employee_ID:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    // Lấy danh sách Employee từ MySQL
    await connectToMySQL();
    const [rows] = await pool.promise().query('SELECT * FROM employees');
    const employeesMySQL = rows;

    // Lấy danh sách Employee từ SQL Server
    await sql.connect(sqlConfig);
    const result = await sql.query('SELECT * FROM employees');
    const employeesSQLServer = result.recordset;

    // Kết hợp danh sách Employee từ cả MySQL và SQL Server
    const combinedEmployees = [...employeesMySQL, ...employeesSQLServer];

    return res.json({ success: true, data: combinedEmployees });
  } catch (error) {
    console.error("Error getting employees:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    sql.close();
    pool.end();
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    // Xóa Employee từ MySQL
    await connectToMySQL();
    await pool.promise().query('DELETE FROM employees WHERE employeeId = ?', [employeeId]);

    // Xóa Employee từ SQL Server
    await sql.connect(sqlConfig);
    await sql.query(`DELETE FROM employees WHERE employeeId = ${employeeId}`);

    return res.status(200).json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    sql.close();
    pool.end();
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;

    // Cập nhật Employee trong MySQL
    await connectToMySQL();
    await pool.promise().query('UPDATE employees SET firstName = ?, lastName = ?, vacationDays = ?, paidToDate = ?, paidLastYear = ?, payRate = ?, payRateId = ? WHERE employeeId = ?',
      [firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId, employeeId]);

    // Cập nhật Employee trong SQL Server
    await sql.connect(sqlConfig);
    await sql.query(`UPDATE employees SET firstName = '${firstName}', lastName = '${lastName}', vacationDays = ${vacationDays}, paidToDate = ${paidToDate}, paidLastYear = ${paidLastYear}, payRate = ${payRate}, payRateId = ${payRateId} WHERE employeeId = ${employeeId}`);

    return res.status(200).json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    sql.close();
    pool.end();
  }
};
