import sql from 'mssql'
import sqlConfig from '../sqlConfig.js'

// Function lấy tất cả các bản ghi Job_History
export const getAllJobHistories = async (req, res) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request().query('SELECT * FROM Job_History');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const getPaginationJobHistory = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request().query(`
        SELECT j.*, e.First_Name, e.Last_Name
        FROM (
            SELECT ROW_NUMBER() OVER (ORDER BY ID) AS RowNum, * 
            FROM Job_History
        ) AS j
        INNER JOIN Personal e ON j.Employee_ID = e.Employee_ID
        WHERE j.RowNum BETWEEN ${(page - 1) * limit + 1} AND ${page * limit}
    `);
        const jobHistories = result.recordset;
        const totalJobHistories = await pool.request().query('SELECT COUNT(*) AS TotalCount FROM Job_History');
        const totalPages = Math.ceil(totalJobHistories.recordset[0].TotalCount / limit);

        res.json({
            totalJobHistories: totalJobHistories.recordset[0].TotalCount,
            totalPages,
            currentPage: page,
            jobHistories,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

export const getJobHistoryById = async (req, res) => {
    const id = req.params.jobHistoryId;

    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('id', sql.Decimal, id)
            .query(`
                SELECT j.*, e.First_Name, e.Last_Name
                FROM Job_History j
                INNER JOIN Personal e ON j.Employee_ID = e.Employee_ID
                WHERE j.ID = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Job history not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


export const createJobHistory = async (req, res) => {
    const { Employee_ID, Department, Division, Start_Date, End_Date, Job_Title, Supervisor, Job_Category, Location, Departmen_Code, Salary_Type, Pay_Period, Hours_per_Week, Hazardous_Training } = req.body;

    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('Employee_ID', sql.Decimal, Employee_ID)
            .input('Department', sql.NVarChar(50), Department)
            .input('Division', sql.NVarChar(50), Division)
            .input('Start_Date', sql.DateTime, Start_Date)
            .input('End_Date', sql.DateTime, End_Date)
            .input('Job_Title', sql.NVarChar(50), Job_Title)
            .input('Supervisor', sql.Decimal, Supervisor)
            .input('Job_Category', sql.NVarChar(50), Job_Category)
            .input('Location', sql.NVarChar(50), Location)
            .input('Departmen_Code', sql.Decimal, Departmen_Code)
            .input('Salary_Type', sql.Decimal, Salary_Type)
            .input('Pay_Period', sql.NVarChar(50), Pay_Period)
            .input('Hours_per_Week', sql.Decimal, Hours_per_Week)
            .input('Hazardous_Training', sql.Bit, Hazardous_Training)
            .query(`
                INSERT INTO Job_History 
                (Employee_ID, Department, Division, Start_Date, End_Date, Job_Title, Supervisor, Job_Category, Location, Departmen_Code, Salary_Type, Pay_Period, Hours_per_Week, Hazardous_Training)
                VALUES
                (@Employee_ID, @Department, @Division, @Start_Date, @End_Date, @Job_Title, @Supervisor, @Job_Category, @Location, @Departmen_Code, @Salary_Type, @Pay_Period, @Hours_per_Week, @Hazardous_Training)
            `);

        res.json({ message: 'Job history created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
export const deleteJobHistory = async (req, res) => {
    const id = req.params.jobHistoryId;

    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('id', sql.Decimal, id)
            .query('DELETE FROM Job_History WHERE ID = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Job history not found' });
        }

        res.json({ message: 'Job history deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
export const updateJobHistoryById = async (req, res) => {
    const id = req.params.jobHistoryId;
    const { Employee_ID, Department, Division, Start_Date, End_Date, Job_Title, Supervisor, Job_Category, Location, Departmen_Code, Salary_Type, Pay_Period, Hours_per_Week, Hazardous_Training } = req.body;

    try {
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('id', sql.Decimal, id)
            .input('Employee_ID', sql.Decimal, Employee_ID)
            .input('Department', sql.NVarChar(50), Department)
            .input('Division', sql.NVarChar(50), Division)
            .input('Start_Date', sql.DateTime, Start_Date)
            .input('End_Date', sql.DateTime, End_Date)
            .input('Job_Title', sql.NVarChar(50), Job_Title)
            .input('Supervisor', sql.Decimal, Supervisor)
            .input('Job_Category', sql.NVarChar(50), Job_Category)
            .input('Location', sql.NVarChar(50), Location)
            .input('Departmen_Code', sql.Decimal, Departmen_Code)
            .input('Salary_Type', sql.Decimal, Salary_Type)
            .input('Pay_Period', sql.NVarChar(50), Pay_Period)
            .input('Hours_per_Week', sql.Decimal, Hours_per_Week)
            .input('Hazardous_Training', sql.Bit, Hazardous_Training)
            .query(`
                UPDATE Job_History 
                SET Employee_ID = @Employee_ID, 
                    Department = @Department, 
                    Division = @Division, 
                    Start_Date = @Start_Date, 
                    End_Date = @End_Date, 
                    Job_Title = @Job_Title, 
                    Supervisor = @Supervisor, 
                    Job_Category = @Job_Category, 
                    Location = @Location, 
                    Departmen_Code = @Departmen_Code, 
                    Salary_Type = @Salary_Type, 
                    Pay_Period = @Pay_Period, 
                    Hours_per_Week = @Hours_per_Week, 
                    Hazardous_Training = @Hazardous_Training
                WHERE ID = @id;

                SELECT * FROM Job_History WHERE ID = @id;
            `);

        if (result.rowsAffected[0] > 0) {
            res.json({ message: 'Job history updated successfully', data: result.recordset[0] });
        } else {
            res.status(404).json({ message: 'Job history not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};