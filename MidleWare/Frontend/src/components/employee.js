import '../util/bootstrap/css/bootstrap-responsive.min.css';
import '../util/bootstrap/css/bootstrap.min.css';
import '../util/bootstrap.3.0.0/content/Content/bootstrap.css';
import '../util/bootstrap.3.0.0/content/Content/bootstrap.min.css';
import '../util/Content/bootstrap.css';
import '../util/Content/bootstrap.min.css';
import '../util/Content/Site.css';
import '../util/css/theme.css';
import '../util/images/icons/css/font-awesome.css';
import './employee.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import $ from 'jquery';
import 'datatables.net';

const socket1 = io('http://localhost:4000');

const Employee = () => {
    const [items, setItems] = useState([]);

    // Hàm fetch dữ liệu từ server
    const fetchEmployee = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/employee/combionedData');
            console.log(">>>check data: ", response);
            setItems(response.data.data);
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    }

    // Effect này sẽ chạy khi component được render lần đầu tiên hoặc khi trang được load lại
    useEffect(() => {
        fetchEmployee(); // Gọi hàm fetchEmployee để lấy dữ liệu từ server
    }, []);

    // Effect này sẽ chạy khi items thay đổi
    useEffect(() => {
        let dataTable = null;

        // Socket lắng nghe sự kiện từ server và cập nhật dữ liệu khi có sự kiện xảy ra
        socket1.on('employeeCreated', fetchEmployee);
        socket1.on('employeeUpdated', fetchEmployee);
        socket1.on('employeeDeleted', fetchEmployee);

        socket1.on('Employee', fetchEmployee);
        socket1.emit('payroll');

        socket1.on('Personal', fetchEmployee);
        socket1.emit('HR');



        if (items.length > 0) {
            // Initialize or reinitialize DataTable
            dataTable = $('#employeeTable').DataTable({
                data: items,
                columns: [
                    { data: 'First_Name', defaultContent: 'N/A' },
                    { data: 'Address1', defaultContent: 'N/A' },
                    { data: 'City', defaultContent: 'N/A' },
                    { data: 'State', defaultContent: 'N/A' },
                    { data: 'Phone_Number', defaultContent: 'N/A' },
                    { data: 'Ethnicity', defaultContent: 'N/A' },
                    { data: 'Paid_Last_Year', defaultContent: 'N/A' },
                    { data: 'SSN', defaultContent: 'N/A' },
                    { data: 'Drivers_License', defaultContent: 'N/A' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return `
                                <div class='Edit-Detail-Delete'>
                                <a href="/editEmployee/${row.Employee_ID ? row.Employee_ID : row.idEmployee}" class="btn btn-primary">Edit</a>
                                <a href="/detailEmployee/${row.Employee_ID ? row.Employee_ID : row.idEmployee}" class="btn btn-info">Detail</a>
                                <a href="/deleteEmployee/${row.Employee_ID ? row.Employee_ID : row.idEmployee}" class="btn btn-danger">Delete</a
                                </div>
                            `;
                        }
                    }
                ],
                lengthMenu: [
                    [5, 10, 50, -1],
                    [5, 10, 50, 'All']
                ],
                dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            });
        }

        return () => {
            socket1.off();

            // Destroy DataTable when unmounting component
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
                                                <th>Ethnicity</th>
                                                <th>Paid Last Year</th>
                                                <th>SSN</th>
                                                <th>Drivers License</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
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
