import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  user: 'sa',
  password: '123',
  server: 'DESKTOP-T93ML2P',
  database: 'HR',
  options: {
    encrypt: false
  }
};
const getPersonalData = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Personal');
    res.send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  } finally {
    sql.close();
  }
};

const addPersonalData = async (req, res) => {
  try {
    const { employee_ID, first_Name, last_Name, middle_Initial, address1, address2, city, state, zip, email, phone_Number, social_Security_Number, drivers_License, marital_Status, gender, shareholder_Status, benefit_Plans, ethnicity } = req.body;

    await sql.connect(config);

    const result = await sql.query(`
      INSERT INTO Personal (Employee_ID, First_Name, Last_Name, Middle_Initial, Address1, Address2, City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License, Marital_Status, Gender, Shareholder_Status, Benefit_Plans, Ethnicity)
      VALUES (
        ${employee_ID},
        '${first_Name}',
        '${last_Name}',
        '${middle_Initial}',
        '${address1}',
        '${address2}',
        '${city}',
        '${state}',
        ${zip},
        '${email}',
        '${phone_Number}',
        '${social_Security_Number}',
        '${drivers_License}',
        '${marital_Status}',
        ${gender ? 1 : 0},
        ${shareholder_Status ? 1 : 0},
        ${benefit_Plans},
        '${ethnicity}'
      )
    `);
    
    // Gửi kết quả về cho client
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  } finally {
    // Đóng kết nối sau khi thực hiện xong
    sql.close();
  }
};

const deletePersonalData = async (req, res) => {
  try {
   
    const { employee_ID } = req.body.employee_ID;
    
    await sql.connect(config);

    const result = await sql.query(`
      DELETE FROM Personal 
      WHERE Employee_ID = ${employee_ID}
    `);
    
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  } finally {
    sql.close();
  }
};

const updatePersonalData = async (req, res) => {
  try {
    const { employee_ID } = req.body.employee_ID;
    const { first_Name, last_Name, middle_Initial, address1, address2, city, state, zip, email, phone_Number, social_Security_Number, drivers_License, marital_Status, gender, shareholder_Status, benefit_Plans, ethnicity } = req.body;
    
    await sql.connect(config);

    const result = await sql.query(`
      UPDATE Personal 
      SET 
     
        First_Name = '${first_Name}',
        Last_Name = '${last_Name}',
        Middle_Initial = '${middle_Initial}',
        Address1 = '${address1}',
        Address2 = '${address2}',
        City = '${city}',
        State = '${state}',
        Zip = ${zip},
        Email = '${email}',
        Phone_Number = '${phone_Number}',
        Social_Security_Number = '${social_Security_Number}',
        Drivers_License = '${drivers_License}',
        Marital_Status = '${marital_Status}',
        Gender = ${gender ? 1 : 0},
        Shareholder_Status = ${shareholder_Status ? 1 : 0},
        Benefit_Plans = ${benefit_Plans},
        Ethnicity = '${ethnicity}'
      WHERE Employee_ID = ${employee_ID}
    `);
    
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  } finally {
    sql.close();
  }
};

const getPersonalDataById = async (req, res) => {
  try {
    const { employee_ID } = req.params;
    
    await sql.connect(config);

    const result = await sql.query(`
      SELECT * FROM Personal 
      WHERE Employee_ID = ${employee_ID}
    `);
    
    res.send(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi máy chủ');
  } finally {
    sql.close();
  }
};


export default { getPersonalData, addPersonalData, updatePersonalData, deletePersonalData, getPersonalDataById };
