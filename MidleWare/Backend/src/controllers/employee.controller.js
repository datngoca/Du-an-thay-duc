//import Employee from "../models/Employee.js";
import mysql from 'mysql2';
import { connectToMySQL } from "../mysqlConfig.js";
import sqlConfig from "../sqlConfig.js";
import sql from 'mssql'; // Import thư viện để kết nối với SQL Server
import dotenv from 'dotenv';
import { pool } from "../mysqlConfig.js";
import Employee from '../models/Employee.js';
// import { sendNotification } from "../websocket.js";
// import { io } from "../socket.js";
dotenv.config();



// export const createEmployee = async (req, res) => {
//     try {
//         const { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;

//         // creating a new Employee object
//         const employee = new Employee({
//             employeeId,
//             firstName,
//             lastName,
//             vacationDays,
//             paidToDate,
//             paidLastYear,
//             payRate,
//             payRateId
//         });

//         // saving the new employee
//         const savedUser = await employee.save();

//         return res.status(200).json({
//             success: true, data: {
//                 _id: savedUser._id,
//                 employeeId: savedUser.employeeId,
//                 firstName: savedUser.firstName,
//                 lastName: savedUser.lastName,
//                 vacationDays: savedUser.vacationDays,
//                 paidToDate: savedUser.paidToDate,
//                 paidLastYear: savedUser.paidLastYear,
//                 payRate: savedUser.payRate,
//                 payRateId: savedUser.payRateId
//             }
//         });
//     } catch (error) {
//         console.error({success: true, data: error});
//     }
// };

// export const getEmployee = async (req, res, next) => {

//     const {employeeId}=req.params  
//     const employee = await Employee.findById(employeeId);
//     console.log(employee)
//     return res.json({ success: true, data: employee });
// };

// export const getEmployeeByEmployeeID = async (req, res, next) => {

//     const {Employee_ID}=req.params  
//     const employee = await Employee.findOne({Employee_ID: Employee_ID});
//     console.log(employee)
//     return res.json({ success: true, data: employee });
// };



// export const getEmployees = async (req, res, next) => {
//     const employees = await Employee.find();
//     return res.json({ success: true, data: employees });
// }

// export const deleteEmployee = async (req, res, next) => {
//     try {
//         const employee = await Employee.findByIdAndDelete(req.params.employeeId);
//         if (!employee) {
//             console.log("backend: "+employee.employeeId)
//             return res.status(404).json({ success: false, message: "Employee not found" });
//         }
//         return res.status(200).json({ success: true, message: "Employee deleted successfully" });
//     } catch (error) {
//         console.error({ success: false, data: error });
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// export const updateEmployee = async (req, res, next) => {
//     try {
//         const { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;
//         const updatedEmployee = await Employee.findByIdAndUpdate(
//             req.params.employeeId,
//             { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId },
//             { new: true }
//         );
//         if (!updatedEmployee) {
//             return res.status(404).json({ success: false, message: "Employee not found" });
//         }
//         return res.status(200).json({ success: true, data: updatedEmployee });
//     } catch (error) {
//         console.error({ success: false, data: error });
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// }


export const getCombinedData = async (req, res) => {
    let sqlData; // Define sqlData variable for MSSQL connection

    try {
        // Connect to MySQL
        await connectToMySQL();
    
        // Lấy dữ liệu từ MySQL (bảng Employee)
        const [mysqlEmployees] = await pool.promise().query('SELECT * FROM Employee');
        const mysqlData = mysqlEmployees;
    
        // Connect to SQL Server
        await sql.connect(sqlConfig);

        // Lấy dữ liệu từ SQL Server (bảng Personal)
        const result = await sql.query('SELECT * FROM Personal');
        sqlData = result.recordset; // Assign result to sqlData
    
        const combinedData = {};
    
        // Duyệt qua từng nhân viên từ MySQL (bảng Employee)
        for (let mysqlEmployee of mysqlData) {
            // Tìm thông tin cá nhân tương ứng từ SQL Server (bảng Personal)
            const personal = sqlData.find(personal => personal.Employee_ID === mysqlEmployee.idEmployee);
    
            if (personal) {
                combinedData[mysqlEmployee.idEmployee] = {
                    ...personal,
                    ...mysqlEmployee
                };
            } else {
                combinedData[mysqlEmployee.idEmployee] = {
                    ...mysqlEmployee,
                    First_Name: null,
                    Last_Name: null,
                    Middle_Initial:  null,
                    Address1: null,
                    Address2: null,
                    City: null,
                    State: null,
                    Zip: null,
                    Email: null,
                    Phone_Number: null,
                    Social_Security_Number: null,
                    Drivers_License: null,
                    Marital_Status: null,
                    Gender: null,
                    Shareholder_Status: null,
                    Benefit_Plans: null,
                    Ethnicity: null
                };
            }
        }
    
        // Kiểm tra và thêm những thông tin cá nhân từ SQL Server mà không có trong MySQL
        for (let personal of sqlData) {
            if (!combinedData[personal.idEmployee]) {
                combinedData[personal.idEmployee] = {
                    ...personal,
                    idEmployee: null,
                    Last_Name: null,
                    First_Name: null,
                    SSN: null,
                    Pay_Rate: null,
                    PayRates_id: null,
                    Vacation_Days: null,
                    Paid_To_Date: null,
                    Paid_Last_Year: null
                };
            }
        }
    
        // Trả về dữ liệu kết hợp
        res.json({ success: true, data: Object.values(combinedData) });
        await sql.close(sqlConfig);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi máy chủ getCombinedData');
    }
};





export const createEmployeeData = async (req, res) => {
    try {
        const {
            First_Name,
            Last_Name,
            Middle_Initial,
            Address1,
            Address2,
            City,
            State,
            Zip,
            Email,
            Phone_Number,
            Social_Security_Number,
            Drivers_License,
            Marital_Status,
            Gender,
            Shareholder_Status,
            Benefit_Plans,
            Ethnicity,
            Pay_Rate,
            PayRates_id,
            Vacation_Days,
            Paid_To_Date,
            Paid_Last_Year
        } = req.body;
    
        // Thêm bản ghi vào bảng Personal và lấy Employee_ID mà SQL Server tự động tạo
        const personalResult = await sql.connect(sqlConfig).query(`
            INSERT INTO Personal (
                First_Name,
                Last_Name,
                Middle_Initial,
                Address1,
                Address2,
                City,
                State,
                Zip,
                Email,
                Phone_Number,
                Social_Security_Number,
                Drivers_License,
                Marital_Status,
                Gender,
                Shareholder_Status,
                Benefit_Plans,
                Ethnicity
            ) 
            OUTPUT INSERTED.Employee_ID
            VALUES (
                '${First_Name}',
                '${Last_Name}',
                '${Middle_Initial}',
                '${Address1}',
                '${Address2}',
                '${City}',
                '${State}',
                '${Zip}',
                '${Email}',
                '${Phone_Number}',
                '${Social_Security_Number}',
                '${Drivers_License}',
                '${Marital_Status}',
                '${Gender}',
                '${Shareholder_Status}',
                ${Benefit_Plans},
                '${Ethnicity}'
            )
        `);
    
        const { Employee_ID } = personalResult.recordset[0]; // Lấy Employee_ID
    
        // Thêm bản ghi vào bảng Employee và sử dụng Employee_ID từ bước trước
        await pool.promise().query(`
            INSERT INTO Employee (
                idEmployee,
                Last_Name, 
                First_Name, 
                SSN, 
                Pay_Rate, 
                PayRates_id, 
                Vacation_Days, 
                Paid_To_Date, 
                Paid_Last_Year
            ) 
            VALUES (
                ${Employee_ID},
                '${Last_Name}', 
                '${First_Name}', 
                '${Social_Security_Number}', 
                '${Pay_Rate}', 
                ${PayRates_id}, 
                ${Vacation_Days}, 
                ${Paid_To_Date}, 
                ${Paid_Last_Year}
            )
        `);
    
        // Trả về kết quả thành công
        res.json({ success: true, message: 'Dữ liệu đã được thêm thành công.' });
    } catch (error) {
        console.error(error);
        // Trả về thông báo lỗi nếu có
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi thêm dữ liệu.' });
    } finally {
        sql.close(); // Đóng kết nối với SQL Server
    }
    
};
export const getDataByEmployeeID = async (req, res) => {
    try {
        const { Employee_ID } = req.params;

        // Tìm dữ liệu trong MySQL (Employee)
        const [mysqlEmployee] = await pool.promise().query(`SELECT * FROM employee WHERE idEmployee = ${Employee_ID}`);
        const employeeData = mysqlEmployee[0];

        // Tìm dữ liệu trong SQL Server (Personal)
        await sql.connect(sqlConfig);
        const result = await sql.query(`SELECT * FROM Personal WHERE Employee_ID = ${Employee_ID}`);
        const personalData = result.recordset[0]; // Lấy dòng đầu tiên (nếu có)

        // Kiểm tra xem có dữ liệu trong cả hai cơ sở dữ liệu không
        if (employeeData && personalData) {
            // Gộp dữ liệu nếu cả hai đều tồn tại
            const combinedData = {
                ...personalData,
                ...employeeData
            };
            res.json({ success: true, data: combinedData });
        } else if (employeeData) {
            // Nếu chỉ có dữ liệu trong MySQL (Employee)
            const combinedData = {
                ...employeeData,
                    First_Name: employeeData.First_Name,
                    Last_Name: employeeData.Last_Name,
                    Middle_Initial: employeeData.Middle_Initial,
                    Address1: employeeData.Address1,
                    Address2: employeeData.Address2,
                    City: employeeData.City,
                    State: employeeData.State,
                    Zip: employeeData.Zip,
                    Email: employeeData.Email,
                    Phone_Number: employeeData.Phone_Number,
                    Social_Security_Number: employeeData.Social_Security_Number,
                    Drivers_License: employeeData.Drivers_License,
                    Marital_Status: employeeData.Marital_Status,
                    Gender: employeeData.Gender,
                    Shareholder_Status: employeeData.Shareholder_Status,
                    Benefit_Plans: employeeData.Benefit_Plans,
                    Ethnicity: employeeData.Ethnicity
            };
            res.json({ success: true, data: combinedData });
        } else if (personalData) {
            // Nếu chỉ có dữ liệu trong SQL Server (Personal)
            const combinedData = {
                ...personalData,
                idEmployee: null,
                Last_Name: null,
                First_Name: null,
                SSN: personalData.SSN,
                Pay_Rate: personalData.Pay_Rate,
                PayRates_id: personalData.PayRates_id,
                Vacation_Days: personalData.Vacation_Days,
                Paid_To_Date: personalData.Paid_To_Date,
                Paid_Last_Year: personalData.Paid_Last_Year
            };
            res.json({ success: true, data: combinedData });
        } else {
            // Nếu không tìm thấy dữ liệu trong cả hai cơ sở dữ liệu
            res.status(404).json({ success: false, message: "Không tìm thấy dữ liệu" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi máy chủ');
    } finally {
        sql.close(); // Đảm bảo đóng kết nối với SQL Server sau khi sử dụng xong
    }
};

export const updateCombinedData = async (req, res) => {
    try {
        const {
            Employee_ID,
            First_Name,
            Last_Name,
            Middle_Initial,
            Address1,
            Address2,
            City,
            State,
            Zip,
            Email,
            Phone_Number,
            Social_Security_Number,
            Drivers_License,
            Marital_Status,
            Gender,
            Shareholder_Status,
            Benefit_Plans,
            Ethnicity,
            Pay_Rate,
            PayRates_id,
            Vacation_Days,
            Paid_To_Date,
            Paid_Last_Year
        } = req.body;
    
        // Connect to SQL Server
        await sql.connect(sqlConfig);
    
        // Update data in the 'Personal' table
        await sql.query`
            UPDATE Personal
            SET
                First_Name = ${First_Name},
                Last_Name = ${Last_Name},
                Middle_Initial = ${Middle_Initial},
                Address1 = ${Address1},
                Address2 = ${Address2},
                City = ${City},
                State = ${State},
                Zip = ${Zip},
                Email = ${Email},
                Phone_Number = ${Phone_Number},
                Social_Security_Number = ${Social_Security_Number},
                Drivers_License = ${Drivers_License},
                Marital_Status = ${Marital_Status},
                Gender = ${Gender},
                Shareholder_Status = ${Shareholder_Status},
                Benefit_Plans = ${Benefit_Plans},
                Ethnicity = ${Ethnicity}
            WHERE Employee_ID = ${Employee_ID};
        `;
    
        // Connect to MySQL
        await connectToMySQL();
    
        // Update data in the 'Employee' table
        await pool.promise().query(`
            UPDATE employee
            SET
                Last_Name = ?,
                First_Name = ?,
                SSN = ?,
                Pay_Rate = ?,
                PayRates_id = ?,
                Vacation_Days = ?,
                Paid_To_Date = ?,
                Paid_Last_Year = ?
            WHERE idEmployee = ?
        `, [
            Last_Name,
            First_Name,
            Social_Security_Number,
            Pay_Rate,
            PayRates_id,
            Vacation_Days,
            Paid_To_Date,
            Paid_Last_Year,
            Employee_ID
        ]);
    
        // Close SQL Server connection
        await sql.close();
    
        // Return success response
        res.json({ success: true, message: 'Data updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while updating data.' });
    }
};

export const deleteCombinedData = async (req, res) => {
    try {
        const { Employee_ID } = req.params;

        // Xóa bản ghi trong bảng Employee
        await pool.promise().query(`DELETE FROM Employee WHERE idEmployee = ${Employee_ID}`);

        // Xóa bản ghi trong bảng Personal
        await sql.connect(sqlConfig).query(`DELETE FROM Personal WHERE Employee_ID = ${Employee_ID}`);

        // Trả về kết quả thành công
        res.json({ success: true, message: 'Dữ liệu đã được xóa thành công.' });
    } catch (error) {
        console.error(error);
        // Trả về thông báo lỗi nếu có
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xóa dữ liệu.' });
    } finally {
        sql.close(); // Đóng kết nối với SQL Server
    }
};
