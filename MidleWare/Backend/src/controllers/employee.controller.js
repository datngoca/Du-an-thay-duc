//import Employee from "../models/Employee.js";
import mysql from 'mysql2';
import { connectToMySQL } from "../mysqlConfig.js";
import sqlConfig from "../sqlConfig.js";
import sql from 'mssql'; // Import thư viện để kết nối với SQL Server
import dotenv from 'dotenv';
import { pool } from "../mysqlConfig.js";
import Employee from '../models/Employee.js';
import http from 'http';
import { Server } from 'socket.io';
import { io } from "../index.js"; 

dotenv.config();

export const getCombinedData = async (req, res) => {
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
        const sqlData = result.recordset;

        // Tạo một đối tượng map để lưu trữ dữ liệu từ SQL Server dựa trên Employee_ID
        const sqlDataMap = {};
        sqlData.forEach(sqlEmployee => {
            sqlDataMap[sqlEmployee.Employee_ID] = sqlEmployee;
        });

        // Tạo một đối tượng map để lưu trữ dữ liệu từ MySQL dựa trên idEmployee
        const mysqlDataMap = {};
        mysqlData.forEach(mysqlEmployee => {
            mysqlDataMap[mysqlEmployee.idEmployee] = mysqlEmployee;
        });

        // Kết hợp dữ liệu từ cả hai nguồn
        const combinedData = [];

        // Duyệt qua dữ liệu từ SQL Server
        sqlData.forEach(sqlEmployee => {
            const mysqlEmployee = mysqlDataMap[sqlEmployee.Employee_ID];
            if (mysqlEmployee) {
                // Nếu id tồn tại trong cả hai nguồn
                combinedData.push({
                    ...sqlEmployee,
                    ...mysqlEmployee
                });
            } else {
                // Nếu id chỉ tồn tại trong SQL Server
                combinedData.push({
                    idEmployee: null,
                    Last_Name: null,
                    First_Name:null,
                    Vacation_Days: null,
                    PayRates_id: null,
                    SNN: null,
                    Paid_To_Date: null,
                    Paid_Last_Year: null,
                    Pay_Rate: null,
                    ...sqlEmployee,
                });
            }
        });

        // Duyệt qua dữ liệu từ MySQL
        mysqlData.forEach(mysqlEmployee => {
            if (!sqlDataMap[mysqlEmployee.idEmployee]) {
                // Nếu id chỉ tồn tại trong MySQL
                combinedData.push({
                    ...mysqlEmployee,
                    Employee_ID:null,
                    First_Name:null,
                    Last_Name:null,
                    Middle_Initial: null,
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
                    Gender: 1,
                    Shareholder_Status: 0,
                    Benefit_Plans: null,
                    Ethnicity: null
                });
            }
        });

        // Trả về dữ liệu kết hợp
        res.json({ success: true, data: combinedData });

        // Đóng kết nối
        await sql.close(sqlConfig);
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi máy chủ getCombinedData');
    }
};
//
export const createCombineData = async (req, res) => {
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

        // Connect to SQL Server
        await sql.connect(sqlConfig);

        // Convert strings to appropriate data types
        const numericZip = isNaN(parseInt(Zip)) ? 0 : parseInt(Zip);
        const numericBenefit_Plans = isNaN(parseInt(Benefit_Plans)) ? 0 : parseInt(Benefit_Plans);
        const numericPayRates_id = isNaN(parseInt(PayRates_id)) ? 0 : parseInt(PayRates_id);
        const decimalPay_Rate = parseFloat(Pay_Rate);
        const numericVacation_Days = isNaN(parseInt(Vacation_Days)) ? 0 : parseInt(Vacation_Days);
        const decimalPaid_To_Date = parseFloat(Paid_To_Date);
        const decimalPaid_Last_Year = parseFloat(Paid_Last_Year);

        // Thêm bản ghi vào bảng Personal của SQL Server và lấy Employee_ID tự động tạo
        const personalResult = await sql.query(`
        DECLARE @First_Name nvarchar(255),
                @Last_Name nvarchar(255),
                @Middle_Initial nvarchar(255),
                @Address1 nvarchar(255),
                @Address2 nvarchar(255),
                @City nvarchar(255),
                @State nvarchar(255),
                @Zip int,
                @Email nvarchar(255),
                @Phone_Number nvarchar(255),
                @Social_Security_Number int,
                @Drivers_License nvarchar(255),
                @Marital_Status nvarchar(255),
                @Gender bit,
                @Shareholder_Status bit,
                @Benefit_Plans int,
                @Ethnicity nvarchar(255);
    
        SET @First_Name = '${First_Name}';
        SET @Last_Name = '${Last_Name}';
        SET @Middle_Initial = '${Middle_Initial}';
        SET @Address1 = '${Address1}';
        SET @Address2 = '${Address2}';
        SET @City = '${City}';
        SET @State = '${State}';
        SET @Zip = ${numericZip};
        SET @Email = '${Email}';
        SET @Phone_Number = '${Phone_Number}';
        SET @Social_Security_Number = ${Social_Security_Number};
        SET @Drivers_License = '${Drivers_License}';
        SET @Marital_Status = '${Marital_Status}';
        SET @Gender = ${Gender ? 1 : 0};
        SET @Shareholder_Status = ${Shareholder_Status ? 1 : 0};
        SET @Benefit_Plans = ${numericBenefit_Plans};
        SET @Ethnicity = '${Ethnicity}';
    
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
            @First_Name,
            @Last_Name,
            @Middle_Initial,
            @Address1,
            @Address2,
            @City,
            @State,
            @Zip,
            @Email,
            @Phone_Number,
            @Social_Security_Number,
            @Drivers_License,
            @Marital_Status,
            @Gender,
            @Shareholder_Status,
            @Benefit_Plans,
            @Ethnicity
        )
    `);    
        const { Employee_ID } = personalResult.recordset[0]; // Lấy Employee_ID từ OUTPUT
        // Thêm bản ghi vào bảng Employee của MySQL và sử dụng Employee_ID từ trên
        const [mysqlResult] = await pool.promise().query(`
            INSERT INTO employee (
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
                ${pool.escape(Last_Name)},
                ${pool.escape(First_Name)},
                ${Social_Security_Number},
                '${Pay_Rate}',
                ${numericPayRates_id},
                ${numericVacation_Days},
                ${decimalPaid_To_Date},
                ${decimalPaid_Last_Year}
            )
        `);

        // Kiểm tra và trả về kết quả thành công
        if (mysqlResult.affectedRows > 0) {
            io.emit('employeeCreated');
            res.json({ success: true, message: 'Dữ liệu đã được thêm thành công.' });
        } else {
            res.json({ success: false, message: 'Không thể thêm dữ liệu vào MySQL.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi thêm dữ liệu.' });
    } finally {
        sql.close(); // Đảm bảo đóng kết nối với SQL Server sau khi thêm xong
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
        io.emit('employeeUpdated');
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

        // Connect to MySQL
        await connectToMySQL();

        // Xóa bản ghi trong bảng Employee trong MySQL
        const [mysqlResult] = await pool.promise().query(`DELETE FROM employee WHERE idEmployee = ${Employee_ID}`);

        // Connect to SQL Server
        await sql.connect(sqlConfig);

        // Xóa bản ghi trong bảng Emergency_Contacts trong SQL Server trước
        const requestEmergency = new sql.Request();
        const queryEmergency = `DELETE FROM Emergency_Contacts WHERE Employee_ID = @Employee_ID`;
        const sqlResultEmergency = await requestEmergency.input('Employee_ID', sql.Int, Employee_ID).query(queryEmergency);

        const requestEmployment = new sql.Request();
        const queryEployment = `DELETE FROM Employment WHERE Employee_ID = @Employee_ID`;
        const sqlResultEmployment = await requestEmployment.input('Employee_ID', sql.Int, Employee_ID).query(queryEployment);

        const requestJob_History = new sql.Request();
        const queryJob_History = `DELETE FROM Job_History WHERE Employee_ID = @Employee_ID`;
        const sqlResultJob_History = await requestJob_History.input('Employee_ID', sql.Int, Employee_ID).query(queryJob_History);

        // Xóa bản ghi trong bảng Personal trong SQL Server
        const requestPersonal = new sql.Request();
        const queryPersonal = `DELETE FROM Personal WHERE Employee_ID = @Employee_ID`;
        const sqlResultPersonal = await requestPersonal.input('Employee_ID', sql.Int, Employee_ID).query(queryPersonal);
        io.emit('employeeDeleted');
        // Kiểm tra kết quả và trả về thông báo
        if (mysqlResult.affectedRows > 0 && sqlResultPersonal.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Dữ liệu đã được xóa thành công từ cả hai cơ sở dữ liệu.' });
            console.log("Xoá thành công từ cả hai cơ sở dữ liệu");
        } else if (mysqlResult.affectedRows > 0) {
            res.json({ success: true, message: 'Dữ liệu đã được xóa thành công từ cơ sở dữ liệu MySQL.' });
            console.log("Xoá thành công từ cơ sở dữ liệu MySQL");
        } else if (sqlResultPersonal.rowsAffected[0] > 0) {
            res.json({ success: true, message: 'Dữ liệu đã được xóa thành công từ cơ sở dữ liệu SQL Server.' });
            console.log("Xoá thành công từ cơ sở dữ liệu SQL Server");
        } else {
            res.status(404).json({ success: false, message: 'Không tìm thấy bản ghi để xóa.' });
            console.log("lỗi deleted");
        }
    } catch (error) {
        console.error(error);
        // Trả về thông báo lỗi nếu có
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi xóa dữ liệu.' });
    } finally {
        // Đóng kết nối với SQL Server
        await sql.close();
    }
};
