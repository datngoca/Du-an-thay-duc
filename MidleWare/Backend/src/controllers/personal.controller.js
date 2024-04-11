import Personal from "../models/Personal.js";

// Controller function to create a new personal record
export const createPersonal = async (req, res) => { 
  
  try {
    const personal = new Personal(req.body);
    await personal.save();
     console.log("++++++++++++++++++++++++++++++++++++++++++++++++++",personal);
    res.status(201).json({ success: true, data: personal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get all personal records
export const getAllPersonal = async (req, res) => {
  try {
    const personals = await Personal.find();
    res.status(200).json({ success: true, data: personals });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to get a personal record by ID
export const getPersonalById = async (req, res) => {
  try {
    const personal = await Personal.findById(req.params.id);
    if (!personal) {
      return res.status(404).json({ success: false, error: 'Personal not found' });
    }
    res.status(200).json({ success: true, data: personal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to update a personal record
export const updatePersonal = async (req, res) => {
  const { employee_ID, First_Name, last_Name, middle_Initial, address1, address2, city, state, zip, email, phone_Number, social_Security_Number, drivers_License, marital_Status, gender, shareholder_Status, benefit_Plans, ethnicity } = req.body;

  try {
    const personal = await Personal.findByIdAndUpdate(
      req.params.id,
      { employee_ID,  First_Name, last_Name, middle_Initial, address1, address2, city, state, zip, email, phone_Number, social_Security_Number, drivers_License, marital_Status, gender, shareholder_Status, benefit_Plans, ethnicity },
      { new: true }
  );
  
    console.log( "-----------------------first_Name: \t\n",personal );
    if (!personal) {
      return res.status(404).json({ success: false, error: 'Personal not found' });
    }
    res.status(200).json({ success: true, data: personal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function to delete a personal record
export const deletePersonal = async (req, res) => {
  try {
    const personal = await Personal.findByIdAndDelete(req.params.id);
    if (!personal) {
      return res.status(404).json({ success: false, error: 'Personal not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
