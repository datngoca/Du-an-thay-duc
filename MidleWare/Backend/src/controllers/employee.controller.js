import Employee from "../models/Employee.js";
import mysql from 'mysql2';
import { connectToMySQL } from "../mysqlConfig.js";
import sqlConfig from "../sqlConfig.js";
import sql from 'mssql'; // Import thư viện để kết nối với SQL Server
import dotenv from 'dotenv';
import { pool } from "../mysqlConfig.js";
// import { sendNotification } from "../websocket.js";
// import { io } from "../socket.js";
dotenv.config();



export const createEmployee = async (req, res) => {
    try {
        const { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;

        // creating a new Employee object
        const employee = new Employee({
            employeeId,
            firstName,
            lastName,
            vacationDays,
            paidToDate,
            paidLastYear,
            payRate,
            payRateId
        });

        // saving the new employee
        const savedUser = await employee.save();

        return res.status(200).json({
            success: true, data: {
                _id: savedUser._id,
                employeeId: savedUser.employeeId,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                vacationDays: savedUser.vacationDays,
                paidToDate: savedUser.paidToDate,
                paidLastYear: savedUser.paidLastYear,
                payRate: savedUser.payRate,
                payRateId: savedUser.payRateId
            }
        });
    } catch (error) {
        console.error({success: true, data: error});
    }
};

export const getEmployee = async (req, res, next) => {

    const {employeeId}=req.params  
    const employee = await Employee.findById(employeeId);
    console.log(employee)
    return res.json({ success: true, data: employee });
};

export const getEmployeeByEmployeeID = async (req, res, next) => {

    const {Employee_ID}=req.params  
    const employee = await Employee.findOne({Employee_ID: Employee_ID});
    console.log(employee)
    return res.json({ success: true, data: employee });
};



export const getEmployees = async (req, res, next) => {
    const employees = await Employee.find();
    return res.json({ success: true, data: employees });
}

export const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.employeeId);
        if (!employee) {
            console.log("backend: "+employee.employeeId)
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        return res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        console.error({ success: false, data: error });
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateEmployee = async (req, res, next) => {
    try {
        const { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.employeeId,
            { employeeId, firstName, lastName, vacationDays, paidToDate, paidLastYear, payRate, payRateId },
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        return res.status(200).json({ success: true, data: updatedEmployee });
    } catch (error) {
        console.error({ success: false, data: error });
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getCombinedData = async (req, res) => {
        try {
            // Kết nối đến MySQL
            await connectToMySQL();
        
            // Lấy dữ liệu từ MySQL (bảng Employee)
            const [mysqlEmployees] = await pool.promise().query('SELECT * FROM Employee');
            const mysqlData = mysqlEmployees;
        
            // Lấy dữ liệu từ SQL Server (bảng Personal)
            const result = await sql.query('SELECT * FROM Personal');
            const sqlData = result.recordset;
        
            const combinedData = {};
        
            // Duyệt qua từng nhân viên từ MySQL (bảng Employee)
            for (let mysqlEmployee of mysqlData) {
                // Tìm thông tin cá nhân tương ứng từ SQL Server (bảng Personal)
                const personal = sqlData.find(personal => personal.Employee_ID === mysqlEmployee.idEmployee);
        
                if (personal) {
                    combinedData[mysqlEmployee.Employee_Number] = {
                        ...personal,
                        ...mysqlEmployee
                    };
                } else {
                    combinedData[mysqlEmployee.idEmployee] = {
                        ...mysqlEmployee,
                        Employee_ID: null,
                        Employment_Status: null,
                        Hire_Date: null,
                        Workers_Comp_Code: null,
                        Termination_Date: null,
                        Rehire_Date: null,
                        Last_Review_Date: null
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
        } catch (err) {
            console.error(err);
            res.status(500).send('Lỗi máy chủ getCombinedData');
        }
    
};

export const createEmployeeData = async (req, res) => {
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
            Paid_Last_Year
        } = req.body;
    
        // Tạo một bản ghi mới cho Employee và lưu vào MySQL
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
                ${idEmployee}, 
                '${Last_Name}', 
                '${First_Name}', 
                ${SSN}, 
                '${Pay_Rate}', 
                ${PayRates_id}, 
                ${Vacation_Days}, 
                ${Paid_To_Date}, 
                ${Paid_Last_Year}
            )
        `);
    
        // Tạo một bản ghi mới cho Personal và lưu vào SQL Server
        await sql.connect(sqlConfig);
        await sql.query(`
            INSERT INTO Personal (
                Employee_ID, 
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
                ${idEmployee}, 
                '${Last_Name}', 
                '${First_Name}', 
                ${SSN}, 
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
        const { Employee_Number } = req.params;

        // Tìm dữ liệu trong MySQL (Employee)
        const [mysqlEmployee] = await pool.promise().query(`SELECT * FROM employee WHERE Employee_Number = ${Employee_Number}`);
        const employeeData = mysqlEmployee[0];

        // Tìm dữ liệu trong SQL Server (Personal)
        await sql.connect(sqlConfig);
        const result = await sql.query(`SELECT * FROM Personal WHERE Employee_Number = ${Employee_Number}`);
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
                idEmployee: employeeData.idEmployee,
                Last_Name: employeeData.Last_Name,
                First_Name: employeeData.First_Name,
                SSN: null,
                Pay_Rate: null,
                PayRates_id: null,
                Vacation_Days: null,
                Paid_To_Date: null,
                Paid_Last_Year: null
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
            Employee_Number,
            Last_Name,
            First_Name,
            SSN,
            Pay_Rate,
            PayRates_id,
            Vacation_Days,
            Paid_To_Date,
            Paid_Last_Year,
            Middle_Initial,
            Address1,
            Address2,
            City,
            State,
            Zip,
            Email,
            Phone_Number,
            Drivers_License,
            Marital_Status,
            Gender,
            Shareholder_Status,
            Benefit_Plans,
            Ethnicity
        } = req.body;

        // Cập nhật hoặc tạo mới dữ liệu trong MySQL (Employee)
        const [mysqlEmployee] = await pool.promise().query(`SELECT * FROM Employee WHERE Employee_Number = ${Employee_Number}`);
        let employeeData = mysqlEmployee[0];

        if (!employeeData) {
            // Nếu không tìm thấy Employee, tạo mới
            await pool.promise().query(`
                INSERT INTO Employee (Employee_Number, Last_Name, First_Name, SSN, Pay_Rate, PayRates_id, Vacation_Days, Paid_To_Date, Paid_Last_Year) 
                VALUES (${Employee_Number}, '${Last_Name}', '${First_Name}', ${SSN}, '${Pay_Rate}', ${PayRates_id}, ${Vacation_Days}, ${Paid_To_Date}, ${Paid_Last_Year})`);
        } else {
            // Nếu tìm thấy Employee, cập nhật
            await pool.promise().query(`
                UPDATE Employee 
                SET Last_Name = '${Last_Name}', 
                    First_Name = '${First_Name}', 
                    SSN = ${SSN}, 
                    Pay_Rate = '${Pay_Rate}', 
                    PayRates_id = ${PayRates_id}, 
                    Vacation_Days = ${Vacation_Days}, 
                    Paid_To_Date = ${Paid_To_Date}, 
                    Paid_Last_Year = ${Paid_Last_Year} 
                WHERE Employee_Number = ${Employee_Number}`);
        }

        // Cập nhật hoặc tạo mới dữ liệu trong SQL Server (Personal)
        await sql.connect(sqlConfig);
        const result = await sql.query(`SELECT * FROM Personal WHERE Employee_Number = ${Employee_Number}`);
        const personalData = result.recordset[0];

        if (!personalData) {
            // Nếu không tìm thấy Personal, tạo mới
            await sql.query(`
                INSERT INTO Personal (Employee_Number, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) 
                VALUES (${Employee_Number}, '${Middle_Initial}', '${Address1}', '${Address2}', '${City}', '${State}', '${Zip}', '${Email}', '${Phone_Number}', '${Drivers_License}', '${Marital_Status}', ${Gender ? 1 : 0}, ${Shareholder_Status ? 1 : 0}, ${Benefit_Plans}, '${Ethnicity}')`);
        } else {
            // Nếu tìm thấy Personal, cập nhật
            await sql.query(`
                UPDATE Personal 
                SET Middle_Initial = '${Middle_Initial}', 
                    Address1 = '${Address1}', 
                    Address2 = '${Address2}', 
                    City = '${City}', 
                    State = '${State}', 
                    Zip = '${Zip}', 
                    Email = '${Email}', 
                    Phone_Number = '${Phone_Number}', 
                    Drivers_License = '${Drivers_License}', 
                    Marital_Status = '${Marital_Status}', 
                    Gender = ${Gender ? 1 : 0}, 
                    Shareholder_Status = ${Shareholder_Status ? 1 : 0}, 
                    Benefit_Plans = ${Benefit_Plans}, 
                    Ethnicity = '${Ethnicity}' 
                WHERE Employee_Number = ${Employee_Number}`);
        }

        res.json({ success: true, message: "Dữ liệu đã được cập nhật thành công vào cả hai cơ sở dữ liệu" });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi máy chủ');
    } finally {
        sql.close(); // Đảm bảo đóng kết nối với SQL Server sau khi sử dụng xong
    }
};
export const deleteCombinedData = async (req, res) => {
    try {
        const { Employee_Number } = req.params;

        // Xóa dữ liệu trong MySQL (Employee)
        const [mysqlEmployee] = await pool.promise().query(`DELETE FROM Employee WHERE Employee_Number = ${Employee_Number}`);
        const mysqlEmployeeDeleted = mysqlEmployee.affectedRows > 0;

        // Xóa dữ liệu trong SQL Server (Personal)
        await sql.connect(sqlConfig);
        const result = await sql.query(`DELETE FROM Personal WHERE Employee_Number = ${Employee_Number}`);
        const personalDeleted = result.rowsAffected > 0;

        if (mysqlEmployeeDeleted || personalDeleted) {
            res.json({ success: true, message: "Dữ liệu đã được xóa thành công khỏi cả hai cơ sở dữ liệu" });
        } else {
            res.json({ success: false, message: "Không tìm thấy dữ liệu để xóa" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi máy chủ');
    } finally {
        sql.close(); // Đảm bảo đóng kết nối với SQL Server sau khi sử dụng xong
    }
};

