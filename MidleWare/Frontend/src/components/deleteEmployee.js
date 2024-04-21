import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';


const DeleteEmployee = () => {
    const { id } = useParams();
    
    const [items, setItems] = useState({
        First_Name: "",
        Last_Name: "",
        Middle_Initial: "",
        Address1: "",
        Address2: "",
        City: "",
        State: "",
        Zip: "",
        Email: "",
        Phone_Number: "",
        Social_Security_Number: "",
        Drivers_License: "",
        Marital_Status: "",
        Gender: true,
        Shareholder_Status: true,
        Benefit_Plans: "",
        Ethnicity: "",
//     Employee_Number: "",
        SSN: "",
        Pay_Rate: "",
        PayRates_id: "",
        Vacation_Days: "",
        Paid_To_Date: "",
        Paid_Last_Year: "",
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                let response = await axios.get(`http://localhost:4000/api/employee/${id}`);
                setItems(response.data.data);
            } catch (error) {
                console.log('Error fetching data : ', error);
            }
        };
        fetchEmployee();
    }, [id]);

// Hàm handleChange
const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Kiểm tra nếu là checkbox
    const newValue = type === 'checkbox' ? checked : value;

    setItems(prevState => ({
        ...prevState,
        [name]: newValue
    }));
};


const handleDeleteEmployee = async () => {
    try {
        // Gửi yêu cầu DELETE đến máy chủ API để xóa nhân viên
        let response = await axios.delete(`http://localhost:4000/api/employee/${id}`);
        
        // Xử lý phản hồi từ máy chủ API
        console.log('Employee deleted successfully:', response.data);
        
        // Hiển thị thông báo thành công
        alert('Employee deleted successfully');
        
        // Có thể thực hiện các hành động khác sau khi xóa thành công
    } catch (error) {
        // Xử lý lỗi nếu có
        console.log('Error deleting employee:', error);
        alert('Error deleting employee. Please try again.');
    }
}


    const handleBackToList = (e) => {
        e.preventDefault();
        window.location.href = "http://localhost:3000/employee";
    };

    return (
        <div>
            <div className="navbar navbar-fixed-top">
                {/* Navbar code */}
            </div>
            <div className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="span2">
                            {/* Sidebar code */}
                        </div>
                        <div className='span9'>
                            <div className="content">
                                <div className="module">
                                    <div className="module-head">
                                        <h2>Delete Personals</h2>
                                    </div>
                                    <div className="module-body">
                                        <form className="form-horizontal row-fluid">
                                            <div className="control-group">
                                                <label className="control-label" htmlFor="First_Name">First Name</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="First_Name"
                                                        name="First_Name"
                                                        value={items.First_Name || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Last_Name">Last Name</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Last_Name"
                                                        name="Last_Name"
                                                        value={items.Last_Name || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Middle_Initial">Middle Initial</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Middle_Initial"
                                                        name="Middle_Initial"
                                                        value={items.Middle_Initial || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Address1">Address1</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Address1"
                                                        name="Address1"
                                                        value={items.Address1 || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Address2">Address2</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Address2"
                                                        name="Address2"
                                                        value={items.Address2 || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="City">City</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="City"
                                                        name="City"
                                                        value={items.City || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="State">State</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="State"
                                                        name="State"
                                                        value={items.State || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Zip">Zip</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Zip"
                                                        name="Zip"
                                                        value={items.Zip || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Email">Email</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Email"
                                                        name="Email"
                                                        value={items.Email || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Phone_Number">Phone Number</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Phone_Number"
                                                        name="Phone_Number"
                                                        value={items.Phone_Number || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Social_Security_Number">Social Security Number</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Social_Security_Number"
                                                        name="Social_Security_Number"
                                                        value={items.Social_Security_Number || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Drivers_License">Driver's License</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Drivers_License"
                                                        name="Drivers_License"
                                                        value={items.Drivers_License || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Marital_Status">Marital Status</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Marital_Status"
                                                        name="Marital_Status"
                                                        value={items.Marital_Status || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Gender">Gender</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="checkbox"
                                                        id="Gender"
                                                        name="Gender"
                                                        checked={items.Gender}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Shareholder_Status">Shareholder Status</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="checkbox"
                                                        id="Shareholder_Status"
                                                        name="Shareholder_Status"
                                                        checked={items.Shareholder_Status}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Benefit_Plans">Benefit Plans</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Benefit_Plans"
                                                        name="Benefit_Plans"
                                                        value={items.Benefit_Plans || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Ethnicity">Ethnicity</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Ethnicity"
                                                        name="Ethnicity"
                                                        value={items.Ethnicity || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
{/* 
                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Employee_Number">Employee Number</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Employee_Number"
                                                        name="Employee_Number"
                                                        value={items.Employee_Number || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div> */}

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="SSN">SSN</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="SSN"
                                                        name="SSN"
                                                        value={items.SSN || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Pay_Rate">Pay Rate</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Pay_Rate"
                                                        name="Pay_Rate"
                                                        value={items.Pay_Rate || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="PayRates_id">PayRates ID</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="PayRates_id"
                                                        name="PayRates_id"
                                                        value={items.PayRates_id || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Vacation_Days">Vacation Days</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Vacation_Days"
                                                        name="Vacation_Days"
                                                        value={items.Vacation_Days || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Paid_To_Date">Paid To Date</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Paid_To_Date"
                                                        name="Paid_To_Date"
                                                        value={items.Paid_To_Date || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <label className="control-label" htmlFor="Paid_Last_Year">Paid Last Year</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="Paid_Last_Year"
                                                        name="Paid_Last_Year"
                                                        value={items.Paid_Last_Year || ''}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="control-group">
                                                <div className="controls">
                                                <input
                                                        type="button"
                                                        value="Delete"
                                                        className="btn btn-default"
                                                        onClick={handleDeleteEmployee}
                                                    />
                                                    <input
                                                        type="button"
                                                        value="Back to list"
                                                        className="btn btn-default"
                                                        onClick={handleBackToList}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="container">
                    <b className="copyright">&copy; 2014 Admin - DaoNguyen </b>All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default DeleteEmployee;