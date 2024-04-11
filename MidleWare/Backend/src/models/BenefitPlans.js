import mongoose from "mongoose";

const BenefitPlanSchema = new mongoose.Schema({
  benefitplan_id: {
    type: Number,
    unique: true
  },
  plan_name: {
    type: String,
    maxlength: 50
  },
  deductable: {
    type: Number,
    maxlength: 50
  },
  percentage: {
    type: Number,
    maxlength: 50
  }
},
  {
    timestamps: true,
    versionKey: false,
  });



export default mongoose.model('BenefitPlan', BenefitPlanSchema);
