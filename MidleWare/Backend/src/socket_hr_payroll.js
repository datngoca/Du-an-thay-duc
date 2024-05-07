import http from 'http';
import { Server } from 'socket.io';
import { connectToMySQL } from "./mysqlConfig.js";
import { pool } from "./mysqlConfig.js";
import sql from 'mssql';
import sqlConfig from "./sqlConfig.js";


const io = new Server({ cors: ["http://localhost:19335", "http://localhost:8080"] });

io.on("connection", (socket) => {
    socket.on("deletedPersonalHR", async (EmployeeID) => {
        try {
            // Kết nối tới MySQL
            await connectToMySQL();

            // Xóa dữ liệu trong MySQL
            const [mysqlResult] = await pool.promise().query(`DELETE FROM employee WHERE idEmployee = ${EmployeeID}`);
            io.emit('HRtoPayroll');
            // Kiểm tra xem dữ liệu đã được xóa thành công hay không
            if (mysqlResult.affectedRows > 0) {
                console.log(`Dữ liệu với EmployeeID ${EmployeeID} đã được xóa thành công.`);
                
            } else {
                console.log(`Không tìm thấy dữ liệu với EmployeeID ${EmployeeID} để xóa.`);
            }
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu từ MySQL:", error);
        }
    });
    socket.on("editPersonalHR", async (EmployeeID, SSN, FirstName, LastName) => {
        try {
            // Kết nối tới MySQL
            await connectToMySQL();

            // Update dữ liệu trong MySQL
            const [mysqlResult] = await pool.promise().query(`
                UPDATE employee 
                SET 
                    SSN = '${SSN}', 
                    First_Name= '${FirstName}', 
                    Last_Name= '${LastName}' 
                WHERE 
                idEmployee = ${EmployeeID}`);
                io.emit('HRtoPayroll');
            // Kiểm tra xem dữ liệu đã được cập nhật thành công hay không
            if (mysqlResult.affectedRows > 0) {
                console.log(`Dữ liệu với EmployeeID ${EmployeeID} đã được cập nhật thành công.`);
                
            } else {
                console.log(`Không tìm thấy dữ liệu với EmployeeID ${EmployeeID} để cập nhật.`);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu từ MySQL:", error);
        }
    });
    sql.connect(sqlConfig)
        .then(() => {
            console.log("Kết nối thành công với cơ sở dữ liệu.");
        })
        .catch((error) => {
            console.error("Lỗi khi kết nối với cơ sở dữ liệu:", error);
        });

    socket.on("deletedEmployeePayroll", async (EmployeeID) => {
        try {
            // Xóa bản ghi trong bảng Emergency_Contacts trong SQL Server trước
            const requestEmergency = new sql.Request();
            const queryEmergency = `DELETE FROM Emergency_Contacts WHERE Employee_ID = ${EmployeeID}`;
            const sqlResultEmergency = await requestEmergency.input('EmployeeID', sql.Int, EmployeeID).query(queryEmergency);

            const requestEmployment = new sql.Request();
            const queryEmployment = `DELETE FROM Employment WHERE Employee_ID = ${EmployeeID}`;
            const sqlResultEmployment = await requestEmployment.input('EmployeeID', sql.Int, EmployeeID).query(queryEmployment);

            const requestJob_History = new sql.Request();
            const queryJob_History = `DELETE FROM Job_History WHERE Employee_ID = ${EmployeeID}`;
            const sqlResultJob_History = await requestJob_History.input('EmployeeID', sql.Int, EmployeeID).query(queryJob_History);

            const requestPersonal = new sql.Request();
            const queryPersonal = `DELETE FROM Personal WHERE Employee_ID = ${EmployeeID}`;
            const sqlResultPersonal = await requestPersonal.input('EmployeeID', sql.Int, EmployeeID).query(queryPersonal);
            io.emit('PayrolltoHR');
            if (sqlResultPersonal.rowsAffected[0] > 0) {
                console.log(`Dữ liệu với EmployeeID ${EmployeeID} đã được xoá thành công.`);
                
            } else {
                console.log(`Không tìm thấy dữ liệu với EmployeeID ${EmployeeID} để cập nhật.`);
            }
        } catch (error) {
            console.error("Lỗi khi xoá dữ liệu từ SQL SERVER:", error);
        }
    });
    socket.on("editEmployeePayroll", async (employeeID, ssn, firstName, lastName) => {
        const ssnString = ssn.toString();
    
        try {
            // Tạo một request SQL mới
            const request = new sql.Request();
    
            // Update data in the 'Personal' table
            const sqlResult = await request.input('firstName', sql.NVarChar, firstName)
                                             .input('lastName', sql.NVarChar, lastName)
                                             .input('ssnString', sql.NVarChar, ssnString)
                                             .input('employeeID', sql.Int, employeeID)
                                             .query(`
                UPDATE Personal
                SET
                First_Name = @firstName,
                Last_Name = @lastName,
                Social_Security_Number = @ssnString
                WHERE Employee_ID = @employeeID;
            `);
            io.emit('PayrolltoHR');
            if (sqlResult.rowsAffected[0] > 0) {
                console.log(`Dữ liệu với EmployeeID ${employeeID} đã được cập nhật thành công.`);
                
            } else {
                console.log(`Không tìm thấy dữ liệu với EmployeeID ${employeeID} để cập nhật.`);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu từ SQL SERVER:", error);
        }
    });
    
    
    
    
    
    socket.on("disconnect", () => {
        // Xử lý sự kiện khi kết nối bị đóng
    });
});

io.listen(5000);
