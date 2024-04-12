import '../util/bootstrap/css/bootstrap-responsive.min.css';
import '../util/bootstrap/css/bootstrap.min.css';
import '../util/Content/bootstrap.css';
import '../util/Content/bootstrap.min.css';
import '../util/Content/Site.css';
import '../util/css/theme.css';
import '../util/images/icons/css/font-awesome.css';
import axios from 'axios';
import React, { useState, useEffect } from "react";

const Employee = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 
    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        setLoading(true);
        try {
            let response = await axios.get('http://localhost:4000/api/employee/combionedData');
            console.log(">>>check data: ", response);
            setItems(response.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setItems([]);
        }
        setLoading(false);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
    
        return (
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {pageNumbers.map((number) => (
                    <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                        {number}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>Next</button>
            </div>
        );
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className="navbar navbar-fixed-top container">
                <div className="navbar-inner">
                    <div className="container">
                        <a className="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                            <i className="icon-reorder shaded"></i>
                        </a><a className="brand" href="/">Admin </a>
                        <div className="nav-collapse collapse navbar-inverse-collapse">
                            <ul className="nav nav-icons">
                                <li className="active"><a href="#"><i className="icon-envelope"></i></a></li>
                                <li><a href="#"><i className="icon-eye-open"></i></a></li>
                                <li><a href="#"><i className="icon-bar-chart"></i></a></li>
                            </ul>
                            <form className="navbar-search pull-left input-append" action="#">
                                <input type="text" className="span3" />
                                <button className="btn" type="button">
                                    <i className="icon-search"></i>
                                </button>
                            </form>
                            <ul className="nav pull-right">
                                <li className="nav-user dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <img src="~/images/user.png" className="nav-avatar" alt="User Avatar" />
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
                                            <i className="menu-icon icon-cog"></i>
                                            <i className="icon-chevron-down pull-right"></i>
                                            <i className="icon-chevron-up pull-right"></i>More Pages
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
                        <div className="span9">
                            <div className="module">
                                <div className="module-head">
                                    <h3>Employee - <a href="/createEmployee"> create</a></h3>
                                </div>
                                <div className="module-body table">
                                    <table className="datatable-1 table table-bordered table-striped display" width="100%">
                                        <thead>
                                            <tr>
                                                <th>Full Name</th>
                                                <th>SSN</th>
                                                <th>Pay Rate</th>
                                                <th>Pay Rates ID</th>
                                                <th>Vacation Days</th>
                                                <th>Paid To Date</th>
                                                <th>Paid Last Year</th>
                                                <th>Employment Status</th>
                                                <th>Hire Date</th>
                                                <th>Workers Comp Code</th>
                                                <th>Termination Date</th>
                                                <th>Rehire Date</th>
                                                <th>Last Review Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {Array.isArray(items) && items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                                                <tr key={index} className="odd gradeX">
                                                    <td>{item.First_Name} {item.Last_Name}</td>
                                                    <td>{item.SSN}</td>
                                                    <td>{item.Pay_Rate}</td>
                                                    <td>{item.PayRates_id}</td>
                                                    <td>{item.Vacation_Days}</td>
                                                    <td>{item.Paid_To_Date}</td>
                                                    <td>{item.Paid_Last_Year}</td>
                                                    <td>{item.Employment_Status}</td>
                                                    <td>{item.Hire_Date}</td>
                                                    <td>{item.Workers_Comp_Code}</td>
                                                    <td>{item.Termination_Date}</td>
                                                    <td>{item.Rehire_Date}</td>
                                                    <td>{item.Last_Review_Date}</td>
                                                    <td>
                                                        <div className='Edit-Detail-Delete'>
                                                            <a>Edit</a>
                                                            <a>Detail</a>
                                                            <a>Delete</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="pagination">
                                    {/* Pagination */}
                                    {renderPagination()}
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

export default Employee;
