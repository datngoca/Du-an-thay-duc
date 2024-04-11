import JobHistory from '../models/Job_History.js'
import mssql from "mssql";
import sqlConfig from '../sqlConfig.js'


export const getJobHistory = async (req, res, next) => {
    const jobHistory  = await JobHistory.find()
    .populate('Employee') // Populate Employee field
    return res.json({ success: true, data: jobHistory });
};

// export const createJobHistory= async (req, res) => {
//     try {

//         const jobHistory = new JobHistory(req.body);

//         const savedJobHistory = await jobHistory.save();

//         return res.status(200).json({
//             success: true, data: {
//                 savedJobHistory
//             }
//         });
//     } catch (error) {
//         console.error({success: true, data: error});
//     }
// };

export const getJobHistoryById = async (req, res, next) => {
    const jobHistory = await JobHistory.findById(req.params.jobHistoryId)
    .populate('Employee') // Populate Employee field
    return res.json({ success: true, data: jobHistory });
};
export const deleteJobHistory = async (req, res, next) => {
    try {
        const jobHistory = await JobHistory.findByIdAndDelete(req.params.jobHistoryId);
        if (!jobHistory) {
            return res.status(404).json({ success: false, message: "JobHistory not found" });
        }
        return res.status(200).json({ success: true, message: "JobHistory deleted successfully" });
    } catch (error) {
        console.error({ success: false, data: error });
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const updateJobHistory = async (req, res, next) => {
    try {
        const updatedJobHistory= await JobHistory.findByIdAndUpdate(
            req.params.jobHistoryId,
            req.body,
            { new: true }
        );
        if (!updatedJobHistory) {
            return res.status(404).json({ success: false, message: "JobHistory not found" });
        }
        return res.status(200).json({ success: true, data: updatedJobHistory });
    } catch (error) {
        console.error({ success: false, data: error });
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getPaginationJobHistory = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const jobHistories = await JobHistory.find()
        .populate('Employee') // Populate Employee field
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
  
    //   const formattedJobHistories = jobHistories.map(history => ({
    //     ...history.toObject(), // Convert to plain JavaScript object
    //     FullName: `${history.Employee.firstName} ${history.Employee.lastName}`
    //   }));
  
      res.json({
        totalJobHistories: await JobHistory.countDocuments(),
        totalPages: Math.ceil(await JobHistory.countDocuments() / limit),
        currentPage: page,
        jobHistories: jobHistories, // Send formatted jobHistories
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  export const addJobHistoryToSQLServer = async (jobHistoryData) => {
    try {
        await mssql.connect(sqlConfig);
        const request = new mssql.Request();
        // Chuyển đổi ngày/thời gian sang định dạng chuẩn của SQL Server (YYYY-MM-DD)
        const startDate = jobHistoryData.Start_Date ? jobHistoryData.Start_Date.toISOString().split('T')[0] : '';
        const endDate = jobHistoryData.End_Date ? jobHistoryData.End_Date.toISOString().split('T')[0] : '';
        
        const query = `
        INSERT INTO Job_History (
            Employee_ID,
            Department,
            Division,
            Start_Date,
            End_Date,
            Job_Title,
            Supervisor,
            Job_Category,
            Location,
            Departmen_Code,
            Salary_Type,
            Pay_Period,
            Hours_per_Week,
            Hazardous_Training
        ) VALUES (
            '${jobHistoryData.EmployeeID}',
            '${jobHistoryData.Department || ''}',
            '${jobHistoryData.Division || ''}',
            '${startDate}',
            '${endDate}',
            '${jobHistoryData.Job_Title || ''}',
            '${jobHistoryData.Supervisor || ''}',
            '${jobHistoryData.Job_Category || ''}',
            '${jobHistoryData.Location || ''}',
            '${jobHistoryData.Departmen_Code || ''}',
            '${jobHistoryData.Salary_Type || ''}',
            '${jobHistoryData.Pay_Period || ''}',
            '${jobHistoryData.Hours_per_Week || ''}',
            '${jobHistoryData.Hazardous_Training || ''}'
        )
    `;
            await request.query(query);
        await mssql.close();
        console.log("Job history added to SQL Server successfully");
    } catch (error) {
        console.error("Error adding job history to SQL Server:", error);
    }
};

  export const createJobHistory = async (req, res) => {
    try {
        const jobHistory = new JobHistory(req.body);
        const savedJobHistory = await jobHistory.save();

        // Thêm dữ liệu vào SQL Server
        await addJobHistoryToSQLServer(savedJobHistory.toObject());

        return res.status(200).json({
            success: true,
            data: savedJobHistory
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};