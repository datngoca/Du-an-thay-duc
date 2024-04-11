import Employee from "../models/Employee.js";
import sqlConfig from "../sqlConfig.js";
import sql from 'mssql'; // Import thư viện để kết nối với SQL Server
import dotenv from 'dotenv';
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
        const employees = await Employee.find();

        await sql.connect(sqlConfig);
        const result = await sql.query('SELECT * FROM Personal');
        const personals = result.recordset;
        const combinedData = {};

        employees.forEach(employee => {
            const personal = personals.find(personal => personal.Employee_ID === employee.Employee_ID);

            if (personal) {
                combinedData[employee.Employee_ID] = {
                    ...personal,
                    ...employee.toObject()
                };
            } else {
                combinedData[employee.Employee_ID] = {
                    ...employee.toObject(),
                    First_Name: employee.First_Name,
                    Last_Name: employee.Last_Name,
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
                    Gender: null,
                    Shareholder_Status: null,
                    Benefit_Plans: null,
                    Ethnicity: null
                };
            }
        });

        // Kiểm tra và thêm những personal mà không có trong danh sách employees
        personals.forEach(personal => {
            if (!combinedData[personal.Employee_ID]) {
                combinedData[personal.Employee_ID] = {
                    ...personal,
                    First_Name: personal.First_Name,
                    Last_Name: personal.Last_Name,
                    Middle_Initial: personal.Middle_Initial,
                    Address1: personal.Address1,
                    Address2: personal.Address2,
                    City: personal.City,
                    State: personal.State,
                    Zip: personal.Zip,
                    Email: personal.Email,
                    Phone_Number: personal.Phone_Number,
                    Social_Security_Number: personal.Social_Security_Number,
                    Drivers_License: personal.Drivers_License,
                    Marital_Status: personal.Marital_Status,
                    Gender: personal.Gender,
                    Shareholder_Status: personal.Shareholder_Status,
                    Benefit_Plans: personal.Benefit_Plans,
                    Ethnicity: personal.Ethnicity
                };
            }
        });

        // Trả về dữ liệu kết hợp
        res.json({ success: true, data: Object.values(combinedData) });
    } catch (err) {
        console.error(err);
        res.status(500).send('Lỗi máy chủ');
    } finally {
        sql.close(); // Đảm bảo đóng kết nối với SQL Server sau khi sử dụng xong
    }
};

export const createEmployeeData = async (req, res) => {
    try {
        // Lấy dữ liệu từ req.body
        const {
            Employee_ID,
            First_Name,
            Last_Name,
            VacationDays,
            PaidToDate,
            PaidLastYear,
            PayRate,
            PayRateId,
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
        } = req.body;
        
        // Tạo một document mới cho Employee và lưu vào MongoDB
        const newEmployee = new Employee({
            Employee_ID,
            First_Name,
            Last_Name,
            VacationDays,
            PaidToDate,
            PaidLastYear,
            PayRate,
            PayRateId
        }); 
        console.log("--------------",newEmployee)
        await newEmployee.save();
       
        // Kết nối tới SQL Server
        await sql.connect(sqlConfig);

        // Tạo một record mới cho Personal và lưu vào SQL Server
        await sql.query(`INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) 
        VALUES ('${Employee_ID}', '${First_Name}', '${Last_Name}', '${Middle_Initial}', '${Address1}', '${Address2}', '${City}', '${State}', '${Zip}', '${Email}', '${Phone_Number}', '${Social_Security_Number}', '${Drivers_License}', '${Marital_Status}', ${Gender==="Male" ? 1 : 0}, ${Shareholder_Status ? 1 : 0}, ${Benefit_Plans}, '${Ethnicity}')`);
       // io.emit('newEmployeeAdded', { message: 'New employee added' });

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

        // Tìm dữ liệu trong MongoDB (employee)
        const employee = await Employee.findOne({ Employee_ID });
        console.log(employee)
        // Tìm dữ liệu trong SQL Server (personal)
        await sql.connect(sqlConfig);
        const result = await sql.query(`SELECT * FROM Personal WHERE Employee_ID = ${Employee_ID}`);
        const personal = result.recordset[0]; // Lấy dòng đầu tiên (nếu có)
        console.log(personal)
        // Kiểm tra xem có dữ liệu trong cả hai cơ sở dữ liệu không
        if (employee && personal) {
            // Gộp dữ liệu nếu cả hai đều tồn tại
            const combinedData = {
                ...personal,
                ...employee.toObject()
            };
            res.json({ success: true, data: combinedData });
        } else if (employee) {
            // Nếu chỉ có dữ liệu trong MongoDB (employee)
            const combinedData = {
                ...employee.toObject(),
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
                Gender: null,
                Shareholder_Status: null,
                Benefit_Plans: null,
                Ethnicity: null
            };
            res.json({ success: true, data: combinedData });
        } else if (personal) {
            // Nếu chỉ có dữ liệu trong SQL Server (personal)
            const combinedData = {
                ...personal,
                First_Name: personal.First_Name,
                Last_Name: personal.Last_Name,
                Middle_Initial: personal.Middle_Initial,
                Address1: personal.Address1,
                Address2: personal.Address2,
                City: personal.City,
                State: personal.State,
                Zip: personal.Zip,
                Email: personal.Email,
                Phone_Number: personal.Phone_Number,
                Social_Security_Number: personal.Social_Security_Number,
                Drivers_License: personal.Drivers_License,
                Marital_Status: personal.Marital_Status,
                Gender: personal.Gender,
                Shareholder_Status: personal.Shareholder_Status,
                Benefit_Plans: personal.Benefit_Plans,
                Ethnicity: personal.Ethnicity
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
            VacationDays,
            PaidToDate,
            PaidLastYear,
            PayRate,
            PayRateId,
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
        } = req.body;

        // Cập nhật hoặc tạo mới dữ liệu trong MongoDB (employee)
        let employee = await Employee.findOne({ Employee_ID });
        if (!employee) {
            employee = new Employee({
                Employee_ID,
                First_Name,
                Last_Name,
                VacationDays,
                PaidToDate,
                PaidLastYear,
                PayRate,
                PayRateId
            });
        } else {
            employee.First_Name = First_Name;
            employee.Last_Name = Last_Name;
            employee.VacationDays = VacationDays;
            employee.PaidToDate = PaidToDate;
            employee.PaidLastYear = PaidLastYear;
            employee.PayRate = PayRate;
            employee.PayRateId = PayRateId;
        }
        await employee.save();

        // Cập nhật hoặc tạo mới dữ liệu trong SQL Server (personal)
        await sql.connect(sqlConfig);
        const result = await sql.query(`SELECT * FROM Personal WHERE Employee_ID = ${Employee_ID}`);
        const personal = result.recordset[0]; // Lấy dòng đầu tiên (nếu có)

        if (!personal) {
            await sql.query(`INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity) 
                VALUES (${Employee_ID}, '${First_Name}', '${Last_Name}', '${Middle_Initial}', '${Address1}', '${Address2}', '${City}', '${State}', ${Zip}, '${Email}', '${Phone_Number}', '${Social_Security_Number}', '${Drivers_License}', '${Marital_Status}', ${Gender ? 1 : 0}, ${Shareholder_Status ? 1 : 0}, ${Benefit_Plans}, '${Ethnicity}')`);
        } else {
            await sql.query(`UPDATE Personal SET First_Name = '${First_Name}', Last_Name = '${Last_Name}', Middle_Initial = '${Middle_Initial}', Address1 = '${Address1}', Address2 = '${Address2}', City = '${City}', State = '${State}', Zip = ${Zip}, Email = '${Email}', Phone_Number = '${Phone_Number}', Social_Security_Number = '${Social_Security_Number}', Drivers_License = '${Drivers_License}', Marital_Status = '${Marital_Status}', Gender = ${Gender ? 1 : 0}, Shareholder_Status = ${Shareholder_Status ? 1 : 0}, Benefit_Plans = ${Benefit_Plans}, Ethnicity = '${Ethnicity}' WHERE Employee_ID = ${Employee_ID}`);
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
        const { Employee_ID } = req.params;
        console.log(Employee_ID)
        // Xóa dữ liệu trong MongoDB (employee)
        const deletedEmployee = await Employee.findOneAndDelete({ Employee_ID });

        // Xóa dữ liệu trong SQL Server (personal)
        await sql.connect(sqlConfig);
        const result1 = await sql.query(`DELETE FROM Emergency_Contacts WHERE Employee_ID = ${Employee_ID}`);
        const result2 = await sql.query(`DELETE FROM Job_History WHERE Employee_ID = ${Employee_ID}`);
        const result3 = await sql.query(`DELETE FROM Employment WHERE Employee_ID = ${Employee_ID}`);
        const result = await sql.query(`DELETE FROM Personal WHERE Employee_ID = ${Employee_ID}`);
        
        if (deletedEmployee || result.rowsAffected > 0) {
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

