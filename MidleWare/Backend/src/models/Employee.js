import mongoose from "mongoose";


const EmployeeSchema = new mongoose.Schema({
        
      Employee_ID: {
        type: Number,
        unique: true,
      },
      First_Name: {
        type: String,
        required: true,
      },
      Last_Name: {
        type: String,
      },
      VacationDays:{
        type: Number,
        required: true,
      },
      PaidToDate:{
        type: Number,
        required: true,
      },
      PaidLastYear:{
        type: Number,
        required: true,
      },
      PayRate:{
        type: Number,
        required: true,
      },
      PayRateId:{
        type: Number,
        required: true,
      }
    },
      {
        timestamps: true,
        versionKey: false,
      }
)

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;