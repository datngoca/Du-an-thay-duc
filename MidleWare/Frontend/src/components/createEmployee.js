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
import axios from 'axios';
import React, { useState, useEffect } from "react";

const CreateEmployee = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                let response = await axios.get('http://localhost:4000/api/employee');
                setItems(response.data.data);
            } catch (error) {
                console.log('Error fetching data : ', error);
            }
        }
        fetchEmployee();
    }, [])

    const handleCreateEmployee = () => {
        alert('me')
    }
    // dataEmployee = res.data.data;

    return (
        <div>
            <div className="navbar navbar-fixed-top">
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
                            {/* <!--/.sidebar--> */}
                        </div>
                        {/* <!--/.span3--> */}

                        {/* <!--/.span9--> */}
                        <div className='span9'>
                            <div class="content">
                                <div class="module">
                                    <div class="module-head">
                                        <h2>Create Personal</h2>
                                    </div>
                                    {/* @using (Html.BeginForm("Create", "Personals", FormMethod.Post, new { @class = "form-horizontal row-fluid" }))
        {
            @Html.AntiForgeryToken() */}

                                    <div class="module-body">
                                        <form class="form-horizontal row-fluid">
                                            {/* @Html.ValidationSummary(true, "", new { @class = "text-danger" }) */}
                                            <div class="control-group">
                                                {/* @*@Html.LabelFor(model => model.Employee_ID, htmlAttributes: new { @class = "control-label" })*@ */}
                                                <label class="control-label" for="EmployeeID">Employee ID</label>
                                                <div class="controls">
                                                    <input className='span6'></input>
                                                    {/* @Html.EditorFor(model => model.Employee_ID, new { htmlAttributes = new { @class = "span6" } }) */}
                                                    {/* @Html.ValidationMessageFor(model => model.Employee_ID, "", new { @class = "text-danger" }) */}
                                                </div>
                                            </div>

                                            <div class="control-group">
                                                <label class="control-label" for="EmployeeID">First Name</label>
                                                <div class="controls">
                                                <input className='span6'></input>
                                                    {/* @Html.EditorFor(model => model.First_Name, new { htmlAttributes = new { @class = "span6" } }) */}
                                                    {/* @Html.ValidationMessageFor(model => model.First_Name, "", new { @class = "text-danger" }) */}
                                                </div>
                                            </div>

                                            <div class="control-group">
                                                <label class="control-label">Last Name</label>
                                                {/* @Html.LabelFor(model => model.Last_Name, htmlAttributes: new { @class = "control-label col-md-2" }) */}
                                                <div class="controls">
                                                    <input className='span6'></input>
                                                    {/* @Html.EditorFor(model => model.Last_Name, new { htmlAttributes = new { @class = "span6" } }) */}
                                                    {/* @Html.ValidationMessageFor(model => model.Last_Name, "", new { @class = "text-danger" }) */}
                                                </div>
                                            </div>


                                            <div class="control-group">
                                                <label class="control-label">vacationDays</label>
                                                {/* @Html.LabelFor(model => model.Address1, htmlAttributes: new { @class = "control-label col-md-2" }) */}
                                                <div class="controls">
                                                    <input className='span6'></input>
                                                    {/* @Html.EditorFor(model => model.Address1, new { htmlAttributes = new { @class = "span6" } }) */}
                                                    {/* @Html.ValidationMessageFor(model => model.Address1, "", new { @class = "text-danger" }) */}
                                                </div>
                                            </div>


                                            <div class="control-group">
                                                <label class="control-label">paidToDate</label>
                                                {/* @Html.LabelFor(model => model.City, htmlAttributes: new { @class = "control-label col-md-2" }) */}
                                                <div class="controls">
                                                    <input className='span6'></input>
                                                    {/* @Html.EditorFor(model => model.City, new { htmlAttributes = new { @class = "span6" } }) */}
                                                    {/* @Html.ValidationMessageFor(model => model.City, "", new { @class = "text-danger" }) */}
                                                </div>
                                            </div>

                                            <div class="control-group">
                                                <label class="control-label">paidLastYear</label> 
                                                {/* @Html.LabelFor(model => model.State, htmlAttributes: new { @class = "control-label col-md-2" }) */}
                                                <div class="controls">
                                                    <input className='span6'></input>
                                                    {/* @Html.EditorFor(model => model.State, new { htmlAttributes = new { @class = "span6" } }) */}
                                                    {/* @Html.ValidationMessageFor(model => model.State, "", new { @class = "text-danger" }) */}
                                                </div>
                                            </div>



                                            <div class="control-group">
                                                <label class="control-label">payRate</label> 
                                                {/* @Html.LabelFor(model => model.Email, htmlAttributes: new { @class = "control-label col-md-2" }) */}
                                                <div class="controls">
                                                <input className='span6'></input>
                                                    {/* @Html.EditorFor(model => model.Email, new { htmlAttributes = new { @class = "span6" } }) */}
                                                    {/* @Html.ValidationMessageFor(model => model.Email, "", new { @class = "text-danger" }) */}
                                                </div>
                                            </div>

                                            <div class="control-group">
                                                <label class="control-label">payRateId</label> 
                                                {/* @Html.LabelFor(model => model.Phone_Number, htmlAttributes: new { @class = "control-label col-md-2" }) */}
                                                <div class="controls">
                                                    <input className='span6'></input>
                                                    {/* @Html.EditorFor(model => model.Phone_Number, new { htmlAttributes = new { @class = "span6" } }) */}
                                                    {/* @Html.ValidationMessageFor(model => model.Phone_Number, "", new { @class = "text-danger" }) */}
                                                </div>
                                            </div>

                                            <div class="control-group">
                                                <div class="col-md-offset-2 controls">
                                                    <input type="submit" value="Create" class="btn btn-default"
                                                    onClick={()=>handleCreateEmployee()}/>
                                                    {/* @Html.ActionLink("Back to List", "Index", "", new { @class = "btn btn-default" }) */}

                                                </div>
                                            </div>
                                        </form>
                                    </div>

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
        </div >
    );
}

export default CreateEmployee;