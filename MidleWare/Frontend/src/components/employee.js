import '../util/bootstrap/css/bootstrap-responsive.min.css';
import '../util/bootstrap/css/bootstrap.min.css';
// import '../util/bootstrap/js/bootstrap.min.js';
// import '../util/bootstrap/img'
import '../util/bootstrap.3.0.0/content/Content/bootstrap.css';
import '../util/bootstrap.3.0.0/content/Content/bootstrap.min.css';
// import '../util/bootstrap.3.0.0/content/Scripts'
// import '../util/bootstrap.3.0.0/content/fonts'
import '../util/Content/bootstrap.css';
import '../util/Content/bootstrap.min.css';
import '../util/Content/Site.css';
import '../util/css/theme.css';
// import '../util/fonts'
import '../util/images/icons/css/font-awesome.css';
// import '../util/images/jquery-ui'
// import '../util/jQuery.1.10.2/Content'
// import '../util/jQuery.1.10.2/Tools'
import './employee.scss';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState,useEffect } from "react";
import $ from 'jquery';
import 'datatables.net'; 

    const Employee = () => {
        const [items, setItems] = useState([]);
        useEffect(() => {
            fetchEmployee();
        },[])
        const fetchEmployee = async() => {
                let response = await axios.get('http://localhost:4000/api/employee/combionedData');
            console.log(">>>check data: ", response);
            setItems(response.data.data)
        }
    
    
    // dataEmployee = res.data.data;
    useEffect(() => {
        let dataTable = null;
    
        if (items.length > 0) {
            if ($.fn.DataTable.isDataTable('#employeeTable')) {
                // DataTable đã được khởi tạo trước đó, vì vậy cần xóa trước khi khởi tạo lại
                $('#employeeTable').DataTable().destroy();
            }
    
            // Khởi tạo DataTable với tùy chọn dom
            dataTable = $('#employeeTable').DataTable({
                lengthMenu: [
                    [5, 10, 50, -1],
                    [5, 10, 50, 'All']
                ],
                dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
                     "<'row'<'col-sm-12'tr>>" +
                     "<'row'<'col-sm-5'i><'col-sm-7'p>>", // Đặt ô tìm kiếm sang bên phải
            });
        }
    
        return () => {
            // Đảm bảo rằng DataTable được xóa khi component unmount
            if (dataTable) {
                dataTable.destroy();
            }
        };
    }, [items]);
    return (
        <div>
            <div className="navbar navbar-fixed-top container">
                <div className="navbar-inner">
                    <div className="container">
                        <a className="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                            <i className="icon-reorder shaded"></i>
                        </a><a className="brand" href="~/">Admin </a>
                        <div className="nav-collapse collapse navbar-inverse-collapse">
                            <ul className="nav nav-icons">
                                <li className="active"><a href="#"><i className="icon-envelope"></i></a></li>
                                <li><a href="#"><i className="icon-eye-open"></i></a></li>
                                <li><a href="#"><i className="icon-bar-chart"></i></a></li>
                            </ul>
                            <form className="navbar-search pull-left input-append" action="#">
                                {/* <input type="text" className="span3"> */}
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
                                        <a href="/BenefitPlans">
                                            <i className="menu-icon icon-tasks"></i>Benefit Plans
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/JobHistory">
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
                            {/* <!--/.sidebar--> */}
                        </div>
                        {/* <!--/.span3--> */}

                        {/* <!--/.span9--> */}
                        <div className="span9">
                            <div className="module">
                                <div className="module-head">
                                    <h3>Employee -
                                        <a href="/createEmployee"> create</a>
                                    </h3>
                                </div>
                                <div className="module-body table">
                                <table id="employeeTable" className="datatable-1 table table-bordered table-striped display" width="100%">
                                        <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Address1</th>
                                            <th>city</th>
                                            <th>state</th>
                                            <th>Phone Number</th>
                                            {/* <th>Email</th> */}
                                            <th>Ethnicity</th>
                                            <th>Paid Last Year</th>
                                            <th>Drivers License</th>
                                            <th></th>
                                        </tr>

                                        </thead>
                                        <tbody>
                                        {items && items.map((item, index) => (
                                            <tr key={item.Employee_ID} className="odd gradeX">
                                                <td>{item.First_Name !== null ? item.First_Name : 'N/A'} {item.Last_Name !== null ? item.Last_Name : 'N/A'}</td>
                                                <td>{item.Address1 !== null ? item.Address1 : 'N/A'}</td>
                                                <td>{item.City !== null ? item.City : 'N/A'}</td>
                                                <td>{item.State !== null ? item.State : 'N/A'}</td>
                                                <td>{item.Phone_Number !== null ? item.Phone_Number : 'N/A'}</td>
                                                {/* <td>{item.Email !== null ? item.Email : 'N/A'}</td> */}
                                                <td>{item.Ethnicity !== null ? item.Ethnicity : 'N/A'}</td>
                                                <td>{item.Paid_Last_Year !== null ? item.Paid_Last_Year : 'N/A'}</td>
                                                <td>{item.Drivers_License !== null ? item.Drivers_License : 'N/A'}</td>
                                                <td>
                                                <div className='Edit-Detail-Delete'>
                                                    <Link to={`/editEmployee/${item.Employee_ID}`}>Edit</Link>
                                                    <Link to={`/detailEmployee/${item.Employee_ID}`}>Detail</Link>
                                                    <Link to={`/deleteEmployee/${item.Employee_ID}`}>Delete</Link>
                                                </div>
                                                </td>
                                            </tr>
                                            ))}

                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--/.container--> */}

            </div>
            <div className="footer">
                <div className="container">
                    <b className="copyright">&copy; 2014 Admin - DaoNguyen </b>All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Employee;
