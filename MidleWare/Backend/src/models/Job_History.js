import mongoose  from 'mongoose';

const jobHistorySchema = new mongoose.Schema({
    EmployeeID: { type: Number, required: true },
    Employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    Department: { type: String, maxlength: 50 },
    Division: { type: String, maxlength: 50 },
    Start_Date: { type: Date },
    End_Date: { type: Date },
    Job_Title: { type: String, maxlength: 50 },
    Supervisor: { type: Number },
    Job_Category: { type: String, maxlength: 50 },
    Location: { type: String, maxlength: 50 },
    Departmen_Code: { type: Number },
    Salary_Type: { type: Number },
    Pay_Period: { type: String, maxlength: 50 },
    Hours_per_Week: { type: Number },
    Hazardous_Training: { type: Boolean },
    // Personal: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal' } // Assuming 'Personal' is another Mongoose model
},
{
  timestamps: true,
  versionKey: false,
})
// Add a virtual field to schema for FullName
// jobHistorySchema.virtual('employeeFullName').get(function() {
//   return `${this.Employee.firstName} ${this.Employee.lastName}`;
// });
export default mongoose.model("JobHistory", jobHistorySchema);
