import React from "react";
// import '../util/Content';
import '../util/bootstrap/css/bootstrap-responsive.min.css';
import '../util/bootstrap/css/bootstrap.min.css';
// import '../util/bootstrap/js/bootstrap.min.js';
// import '../util/bootstrap/img'
import '../util/bootstrap.3.0.0/content/Content/bootstrap.css';
import '../util/bootstrap.3.0.0/content/Content/bootstrap.min.css';
// import '../util/bootstrap.3.0.0/content/Content/Site.css';
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

const Admin = () => {
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
                                        <a href="/employee"><i className="menu-icon icon-bullhorn"></i>Personal List </a>
                                    </li>
                                    <li>
                                        <a href="/">
                                            <i className="menu-icon icon-tasks"></i>Benefit Plans
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/">
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
                        <div className="span9">
                            <div className="content">
                                <div className="btn-controls">
                                    <div className="btn-box-row row-fluid">
                                        <a href="#" className="btn-box big span4">
                                            <i className=" icon-random"></i><b>65%</b>
                                            <p className="text-muted">
                                                Growth
                                            </p>
                                        </a><a href="#" className="btn-box big span4">
                                            <i className="icon-user"></i><b>15</b>
                                            <p className="text-muted">
                                                New Users
                                            </p>
                                        </a><a href="#" className="btn-box big span4">
                                            <i className="icon-money"></i><b>15,152</b>
                                            <p className="text-muted">
                                                Profit
                                            </p>
                                        </a>
                                    </div>
                                    <div className="btn-box-row row-fluid">
                                        <div className="span8">
                                            <div className="row-fluid">
                                                <div className="span12">
                                                    <a href="#" className="btn-box small span4">
                                                        <i className="icon-envelope"></i><b>Messages</b>
                                                    </a><a href="#" className="btn-box small span4">
                                                        <i className="icon-group"></i><b>Clients</b>
                                                    </a><a href="#" className="btn-box small span4">
                                                        <i className="icon-exchange"></i><b>Expenses</b>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="row-fluid">
                                                <div className="span12">
                                                    <a href="#" className="btn-box small span4">
                                                        <i className="icon-save"></i><b>Total Sales</b>
                                                    </a><a href="#" className="btn-box small span4">
                                                        <i className="icon-bullhorn"></i><b>Social Feed</b>
                                                    </a><a href="#" className="btn-box small span4">
                                                        <i className="icon-sort-down"></i><b>
                                                            Bounce
                                                            Rate
                                                        </b>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="widget widget-usage unstyled span4">
                                            <li>
                                                <p>
                                                    <strong>Windows 8</strong> <span className="pull-right small muted">78%</span>
                                                </p>
                                                <div className="progress tight">
                                                    {/* <div className="bar" style="width: 78%;"> */}
                                                    <div className='bar' style={{ width: '78%' }}>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <p>
                                                    <strong>Mac</strong> <span className="pull-right small muted">56%</span>
                                                </p>
                                                <div className="progress tight">
                                                    {/* <div className="bar bar-success" style="width: 56%;"> */}
                                                    <div className='bar bar-success' style={{ width: '56%' }}>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <p>
                                                    <strong>Linux</strong> <span className="pull-right small muted">44%</span>
                                                </p>
                                                <div className="progress tight">
                                                    <div className="bar bar-warning" style={{ width: "44%" }}>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <p>
                                                    <strong>iPhone</strong> <span className="pull-right small muted">67%</span>
                                                </p>
                                                <div className="progress tight">
                                                    <div className="bar bar-danger" style={{ width: "67%" }}>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <!--/#btn-controls--> */}
                                <div className="module">
                                    <div className="module-head">
                                        <h3>
                                            Profit Chart
                                        </h3>
                                    </div>
                                    <div className="module-body">
                                        <div className="chart inline-legend grid">
                                            <div id="placeholder2" className="graph" style={{ height: "500px" }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!--/.module--> */}
                                <div className="module hide">
                                    <div className="module-head">
                                        <h3>
                                            Adjust Budget Range
                                        </h3>
                                    </div>
                                    <div className="module-body">
                                        <div className="form-inline clearfix">
                                            <a href="#" className="btn pull-right">Update</a>
                                            <label for="amount">
                                                Price range:
                                            </label>
                                            &nbsp;
                                            <input type="text" id="amount" className="input-" />
                                        </div>
                                        <hr />
                                        <div className="slider-range">
                                        </div>
                                    </div>
                                </div>
                                <div className="module">
                                    <div className="module-head">
                                        <h3>
                                            DataTables
                                        </h3>
                                    </div>
                                    <div className="module-body table">
                                        <table cellpadding="0" cellspacing="0" border="0"
                                            className="datatable-1 table table-bordered table-striped	 display" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Rendering engine
                                                    </th>
                                                    <th>
                                                        Browser
                                                    </th>
                                                    <th>
                                                        Platform(s)
                                                    </th>
                                                    <th>
                                                        Engine version
                                                    </th>
                                                    <th>
                                                        CSS grade
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="odd gradeX">
                                                    <td>
                                                        Trident
                                                    </td>
                                                    <td>
                                                        Internet Explorer 4.0
                                                    </td>
                                                    <td>
                                                        Win 95+
                                                    </td>
                                                    <td className="center">
                                                        4
                                                    </td>
                                                    <td className="center">
                                                        X
                                                    </td>
                                                </tr>
                                                <tr className="even gradeC">
                                                    <td>
                                                        Trident
                                                    </td>
                                                    <td>
                                                        Internet Explorer 5.0
                                                    </td>
                                                    <td>
                                                        Win 95+
                                                    </td>
                                                    <td className="center">
                                                        5
                                                    </td>
                                                    <td className="center">
                                                        C
                                                    </td>
                                                </tr>
                                                <tr className="odd gradeA">
                                                    <td>
                                                        Trident
                                                    </td>
                                                    <td>
                                                        Internet Explorer 5.5
                                                    </td>
                                                    <td>
                                                        Win 95+
                                                    </td>
                                                    <td className="center">
                                                        5.5
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="even gradeA">
                                                    <td>
                                                        Trident
                                                    </td>
                                                    <td>
                                                        Internet Explorer 6
                                                    </td>
                                                    <td>
                                                        Win 98+
                                                    </td>
                                                    <td className="center">
                                                        6
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="odd gradeA">
                                                    <td>
                                                        Trident
                                                    </td>
                                                    <td>
                                                        Internet Explorer 7
                                                    </td>
                                                    <td>
                                                        Win XP SP2+
                                                    </td>
                                                    <td className="center">
                                                        7
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="even gradeA">
                                                    <td>
                                                        Trident
                                                    </td>
                                                    <td>
                                                        AOL browser (AOL desktop)
                                                    </td>
                                                    <td>
                                                        Win XP
                                                    </td>
                                                    <td className="center">
                                                        6
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Firefox 1.0
                                                    </td>
                                                    <td>
                                                        Win 98+ / OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        1.7
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Firefox 1.5
                                                    </td>
                                                    <td>
                                                        Win 98+ / OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        1.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Firefox 2.0
                                                    </td>
                                                    <td>
                                                        Win 98+ / OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        1.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Firefox 3.0
                                                    </td>
                                                    <td>
                                                        Win 2k+ / OSX.3+
                                                    </td>
                                                    <td className="center">
                                                        1.9
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Camino 1.0
                                                    </td>
                                                    <td>
                                                        OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        1.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Camino 1.5
                                                    </td>
                                                    <td>
                                                        OSX.3+
                                                    </td>
                                                    <td className="center">
                                                        1.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Netscape 7.2
                                                    </td>
                                                    <td>
                                                        Win 95+ / Mac OS 8.6-9.2
                                                    </td>
                                                    <td className="center">
                                                        1.7
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Netscape Browser 8
                                                    </td>
                                                    <td>
                                                        Win 98SE+
                                                    </td>
                                                    <td className="center">
                                                        1.7
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Netscape Navigator 9
                                                    </td>
                                                    <td>
                                                        Win 98+ / OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        1.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.0
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.1
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1.1
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.2
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1.2
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.3
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1.3
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.4
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1.4
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.5
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1.5
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.6
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1.6
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.7
                                                    </td>
                                                    <td>
                                                        Win 98+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1.7
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Mozilla 1.8
                                                    </td>
                                                    <td>
                                                        Win 98+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        1.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Seamonkey 1.1
                                                    </td>
                                                    <td>
                                                        Win 98+ / OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        1.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Gecko
                                                    </td>
                                                    <td>
                                                        Epiphany 2.20
                                                    </td>
                                                    <td>
                                                        Gnome
                                                    </td>
                                                    <td className="center">
                                                        1.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Webkit
                                                    </td>
                                                    <td>
                                                        Safari 1.2
                                                    </td>
                                                    <td>
                                                        OSX.3
                                                    </td>
                                                    <td className="center">
                                                        125.5
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Webkit
                                                    </td>
                                                    <td>
                                                        Safari 1.3
                                                    </td>
                                                    <td>
                                                        OSX.3
                                                    </td>
                                                    <td className="center">
                                                        312.8
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Webkit
                                                    </td>
                                                    <td>
                                                        Safari 2.0
                                                    </td>
                                                    <td>
                                                        OSX.4+
                                                    </td>
                                                    <td className="center">
                                                        419.3
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Webkit
                                                    </td>
                                                    <td>
                                                        Safari 3.0
                                                    </td>
                                                    <td>
                                                        OSX.4+
                                                    </td>
                                                    <td className="center">
                                                        522.1
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Webkit
                                                    </td>
                                                    <td>
                                                        OmniWeb 5.5
                                                    </td>
                                                    <td>
                                                        OSX.4+
                                                    </td>
                                                    <td className="center">
                                                        420
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Webkit
                                                    </td>
                                                    <td>
                                                        iPod Touch / iPhone
                                                    </td>
                                                    <td>
                                                        iPod
                                                    </td>
                                                    <td className="center">
                                                        420.1
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Webkit
                                                    </td>
                                                    <td>
                                                        S60
                                                    </td>
                                                    <td>
                                                        S60
                                                    </td>
                                                    <td className="center">
                                                        413
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Opera 7.0
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.1+
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Opera 7.5
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Opera 8.0
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Opera 8.5
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.2+
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Opera 9.0
                                                    </td>
                                                    <td>
                                                        Win 95+ / OSX.3+
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Opera 9.2
                                                    </td>
                                                    <td>
                                                        Win 88+ / OSX.3+
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Opera 9.5
                                                    </td>
                                                    <td>
                                                        Win 88+ / OSX.3+
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Opera for Wii
                                                    </td>
                                                    <td>
                                                        Wii
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Nokia N800
                                                    </td>
                                                    <td>
                                                        N800
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Presto
                                                    </td>
                                                    <td>
                                                        Nintendo DS browser
                                                    </td>
                                                    <td>
                                                        Nintendo DS
                                                    </td>
                                                    <td className="center">
                                                        8.5
                                                    </td>
                                                    <td className="center">
                                                        C/A<sup>1</sup>
                                                    </td>
                                                </tr>
                                                <tr className="gradeC">
                                                    <td>
                                                        KHTML
                                                    </td>
                                                    <td>
                                                        Konqureror 3.1
                                                    </td>
                                                    <td>
                                                        KDE 3.1
                                                    </td>
                                                    <td className="center">
                                                        3.1
                                                    </td>
                                                    <td className="center">
                                                        C
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        KHTML
                                                    </td>
                                                    <td>
                                                        Konqureror 3.3
                                                    </td>
                                                    <td>
                                                        KDE 3.3
                                                    </td>
                                                    <td className="center">
                                                        3.3
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        KHTML
                                                    </td>
                                                    <td>
                                                        Konqureror 3.5
                                                    </td>
                                                    <td>
                                                        KDE 3.5
                                                    </td>
                                                    <td className="center">
                                                        3.5
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeX">
                                                    <td>
                                                        Tasman
                                                    </td>
                                                    <td>
                                                        Internet Explorer 4.5
                                                    </td>
                                                    <td>
                                                        Mac OS 8-9
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        X
                                                    </td>
                                                </tr>
                                                <tr className="gradeC">
                                                    <td>
                                                        Tasman
                                                    </td>
                                                    <td>
                                                        Internet Explorer 5.1
                                                    </td>
                                                    <td>
                                                        Mac OS 7.6-9
                                                    </td>
                                                    <td className="center">
                                                        1
                                                    </td>
                                                    <td className="center">
                                                        C
                                                    </td>
                                                </tr>
                                                <tr className="gradeC">
                                                    <td>
                                                        Tasman
                                                    </td>
                                                    <td>
                                                        Internet Explorer 5.2
                                                    </td>
                                                    <td>
                                                        Mac OS 8-X
                                                    </td>
                                                    <td className="center">
                                                        1
                                                    </td>
                                                    <td className="center">
                                                        C
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Misc
                                                    </td>
                                                    <td>
                                                        NetFront 3.1
                                                    </td>
                                                    <td>
                                                        Embedded devices
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        C
                                                    </td>
                                                </tr>
                                                <tr className="gradeA">
                                                    <td>
                                                        Misc
                                                    </td>
                                                    <td>
                                                        NetFront 3.4
                                                    </td>
                                                    <td>
                                                        Embedded devices
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        A
                                                    </td>
                                                </tr>
                                                <tr className="gradeX">
                                                    <td>
                                                        Misc
                                                    </td>
                                                    <td>
                                                        Dillo 0.8
                                                    </td>
                                                    <td>
                                                        Embedded devices
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        X
                                                    </td>
                                                </tr>
                                                <tr className="gradeX">
                                                    <td>
                                                        Misc
                                                    </td>
                                                    <td>
                                                        Links
                                                    </td>
                                                    <td>
                                                        Text only
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        X
                                                    </td>
                                                </tr>
                                                <tr className="gradeX">
                                                    <td>
                                                        Misc
                                                    </td>
                                                    <td>
                                                        Lynx
                                                    </td>
                                                    <td>
                                                        Text only
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        X
                                                    </td>
                                                </tr>
                                                <tr className="gradeC">
                                                    <td>
                                                        Misc
                                                    </td>
                                                    <td>
                                                        IE Mobile
                                                    </td>
                                                    <td>
                                                        Windows Mobile 6
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        C
                                                    </td>
                                                </tr>
                                                <tr className="gradeC">
                                                    <td>
                                                        Misc
                                                    </td>
                                                    <td>
                                                        PSP browser
                                                    </td>
                                                    <td>
                                                        PSP
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        C
                                                    </td>
                                                </tr>
                                                <tr className="gradeU">
                                                    <td>
                                                        Other browsers
                                                    </td>
                                                    <td>
                                                        All others
                                                    </td>
                                                    <td>
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        -
                                                    </td>
                                                    <td className="center">
                                                        U
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>
                                                        Rendering engine
                                                    </th>
                                                    <th>
                                                        Browser
                                                    </th>
                                                    <th>
                                                        Platform(s)
                                                    </th>
                                                    <th>
                                                        Engine version
                                                    </th>
                                                    <th>
                                                        CSS grade
                                                    </th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                {/* <!--/.module--> */}
                            </div>
                            {/* <!--/.content--> */}
                        </div>
                        {/* <!--/.span9--> */}
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

export default Admin;