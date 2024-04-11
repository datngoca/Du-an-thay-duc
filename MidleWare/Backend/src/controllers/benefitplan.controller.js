import benefit_Plans from "../models/BenefitPlans.js";

// Controller function to create a new personal record
export const createBenefitPlan = async (req, res) => { 
  
  try {
    const data = new benefit_Plans(req.body);
    await data.save();
     console.log("++++++++++++++++++++++++++++++++++++++++++++++++++",data);
    res.status(201).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get all personal records
export const getAllBenefitPlan = async (req, res) => {
  try {
    const BenefitPlan = await benefit_Plans.find();
    res.status(200).json({ success: true, data: BenefitPlan });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get a personal record by ID
export const getBenefitPlanById = async (req, res) => {
  try {
    const Benefitplan = await benefit_Plans.findById(req.params.id);
    if (!Benefitplan) {
      return res.status(404).json({ success: false, error: 'Personal not found' });
    }
    res.status(200).json({ success: true, data: Benefitplan });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to update a personal record
export const updateBenefitPlan = async (req, res) => {
  const {benefitplan_id,plan_name,deductable,percentage } = req.body;

  try {
    const Benefitplan = await benefit_Plans.findByIdAndUpdate(
      req.params.id,
      {benefitplan_id,plan_name,deductable,percentage  },
      { new: true }
  );
  
    console.log( "-----------------------first_Name: \t\n",Benefitplan );
    if (!Benefitplan) {
      return res.status(404).json({ success: false, error: 'Personal not found' });
    }
    res.status(200).json({ success: true, data: Benefitplan });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to delete a personal record
export const deleteBenefitPlan = async (req, res) => {
  try {
    const BenefitPlan = await benefit_Plans.findByIdAndDelete(req.params.id);
    if (!BenefitPlan) {
      return res.status(404).json({ success: false, error: 'Personal not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
