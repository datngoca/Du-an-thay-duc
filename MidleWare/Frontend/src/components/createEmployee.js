import '../util/bootstrap/css/bootstrap-responsive.min.css';
import '../util/bootstrap/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';

const CreateEmployee = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        First_Name: '',
        Last_Name: '',
        Middle_Initial: '',
        Address1: '',
        Address2: '',
        City: '',
        State: '',
        Zip: '',
        Email: '',
        Phone_Number: '',
        Social_Security_Number: '',
        Drivers_License: '',
        Marital_Status: '',
        Gender: false,
        Shareholder_Status: false,
        Benefit_Plans: '',
        Ethnicity: '',
        SSN: '',
        Pay_Rate: '',
        PayRates_id: '',
        Vacation_Days: '',
        Paid_To_Date: '',
        Paid_Last_Year: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBackToList = () => {
        window.location.href = "http://localhost:3000/employee";
    };

    const handleCreateEmployee = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        try {
            let response = await axios.post(`http://localhost:4000/api/employee`, formData);
            console.log('Employee created successfully:', response.data);
            alert('Employee created successfully');
            handleBackToList();
        } catch (error) {
            console.log('Error creating employee:', error);
            alert('Error creating employee. Please try again.');
        }
    };

    return (
        <div>
            <div className="navbar navbar-fixed-top">
                <div className="navbar-inner">
                    <div className="container">
                        <a className="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                            <i className="icon-reorder shaded"></i>
                        </a>
                        <a className="brand" href="~/">Admin </a>
                        <div className="nav-collapse collapse navbar-inverse-collapse">
                            <ul className="nav nav-icons">
                                <li className="active"><a href="#"><i className="icon-envelope"></i></a></li>
                                <li><a href="#"><i className="icon-eye-open"></i></a></li>
                                <li><a href="#"><i className="icon-bar-chart"></i></a></li>
                            </ul>
                            <form className="navbar-search pull-left input-append" action="#">
                                <input type="text" className="span3"></input>
                                <button className="btn" type="button">
                                    <i className="icon-search"></i>
                                </button>
                            </form>
                            <ul className="nav pull-right">
                                <li className="nav-user dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <img src="~/images/user.png" className="nav-avatar" />
                                        <b className="caret"></b>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Your Profile</a></li>
                                        <li><a href="#">Edit Profile</a></li>
                                        <li><a href="#">Account Settings</a></li>
                                        <li className="divider"></li>
                                        <li><a href="#">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrapper">
                <div className="container">
                    <div className="row">
                        <div className="span2">
                            <div className="sidebar">
                                <ul className="widget widget-menu unstyled">
                                    <li className="active">
                                        <a href="/">
                                            <i className="menu-icon icon-dashboard"></i>Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/employee"><i className="menu-icon icon-bullhorn"></i>Employee List </a>
                                    </li>
                                    <li>
                                        <a href="~/BenefitPlans">
                                            <i className="menu-icon icon-tasks"></i>Benefit Plans
                                        </a>
                                    </li>
                                    <li>
                                        <a href="~/JobHistory">
                                            <i className="menu-icon icon-inbox"></i>Job History
                                        </a>
                                    </li>
                                </ul>
                                <ul className="widget widget-menu unstyled">
                                    <li>
                                        <a className="collapsed" data-toggle="collapse" href="#togglePages">
                                            <i className="menu-icon icon-cog">
                                            </i><i className="icon-chevron-down pull-right"></i><i
                                                className="icon-chevron-up pull-right">
                                            </i>More Pages
                                        </a>
                                        <ul id="togglePages" className="collapse unstyled">
                                            <li><a href="#"><i className="icon-inbox"></i>Login </a></li>
                                            <li><a href="#"><i className="icon-inbox"></i>Profile </a></li>
                                            <li><a href="#"><i className="icon-inbox"></i>All Users </a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#"><i className="menu-icon icon-signout"></i>Logout </a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='span9'>
                            <div className="content">
                                <div className="module">
                                    <div className="module-head">
                                        <h2>Create Personal</h2>
                                    </div>
                                    <div className="module-body">
                                        <form className="form-horizontal row-fluid" onSubmit={handleCreateEmployee}>
                                            <div className="control-group">
                                                <label className="control-label" htmlFor="First_Name">First Name</label>
                                                <div className="controls">
                                                    <input
                                                        className="span6"
                                                        type="text"
                                                        id="First_Name"
                                                        name="First_Name"
                                                        value={formData.First_Name}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                </div>
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="Last_Name">Last Name</label>
                                                    <div className="controls">
                                                        <input
                                                            className="span6"
                                                            type="text"
                                                            id="Last_Name"
                                                            name="Last_Name"
                                                            value={formData.Last_Name}
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="Middle_Initial">Middle_Initial</label>
                                                    <div className="controls">
                                                        <input
                                                            className="span6"
                                                            type="text"
                                                            id="Middle_Initial"
                                                            name="Middle_Initial"
                                                            value={formData.Middle_Initial}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Address1}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Address2}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.City}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.State}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Zip}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Email}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Phone_Number}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Social_Security_Number}
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="Drivers_License">Drivers License</label>
                                                    <div className="controls">
                                                        <input
                                                            className="span6"
                                                            type="text"
                                                            id="Drivers_License"
                                                            name="Drivers_License"
                                                            value={formData.Drivers_License}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Marital_Status}
                                                            onChange={(e) => handleChange(e)}
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
                                                            checked={formData.Gender}
                                                            onChange={(e) => handleChange(e)}
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
                                                            checked={formData.Shareholder_Status}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Benefit_Plans}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Ethnicity}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Pay_Rate}
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="control-group">
                                                    <label className="control-label" htmlFor="PayRates_id">Pay Rates ID</label>
                                                    <div className="controls">
                                                        <input
                                                            className="span6"
                                                            type="text"
                                                            id="PayRates_id"
                                                            name="PayRates_id"
                                                            value={formData.PayRates_id}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Vacation_Days}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Paid_To_Date}
                                                            onChange={(e) => handleChange(e)}
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
                                                            value={formData.Paid_Last_Year}
                                                            onChange={(e) => handleChange(e)}
                                                        />
                                                    </div>
                                                </div>



                                            </div>
                                            {/* Add other input fields similarly */}
                                            <div className="control-group">
                                                <div className="col-md-offset-2 controls">
                                                    <input type="submit" value="Create" className="btn btn-default" onClick={handleCreateEmployee} />
                                                    <input type="button" value="Back to list" className="btn btn-default" onClick={handleBackToList} />
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
}

export default CreateEmployee;