<%-- 
    Document   : addEmployee
    Created on : 09-Apr-2024, 20:05:42
    Author     : Administrator
--%>

<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<core:set var="contextPath" value="${pageContext.request.contextPath}"/>
<tiles:insertDefinition name="layouts">
    <tiles:putAttribute name="body">
        <div class="content">
            <div class="module">
                <div class="module-head">
                    <h3>Create Employee</h3>
                </div>
                <div class="module-body">
                    <c:if test="${not empty successMessage}">
                        <div class="alert alert-success">${successMessage}</div>
                    </c:if>
                    <c:if test="${not empty errorMessage}">
                        <div class="alert alert-danger">${errorMessage}</div>
                    </c:if>
                    <form:form method="POST" action="${contextPath}/admin/employee/add.html" commandName="employee" cssClass="form-horizontal row-fluid">
                        <form:errors path="*" cssClass="text-danger"/>
                        <!--<form class="form-horizontal row-fluid">-->

                        <div class="control-group">
                            <label class="control-label" for="lastName">Last Name</label>
                            <div class="controls">
                                <form:input path="lastName" cssClass="span6" />
                                <form:errors path="lastName" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="firstName">First Name</label>
                            <div class="controls">
                                <form:input path="firstName" cssClass="span6" />
                                <form:errors path="firstName" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="ssn">SSN</label>
                            <div class="controls">
                                <form:input path="ssn" cssClass="span6" />
                                <form:errors path="ssn" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="payRate">Pay Rate</label>
                            <div class="controls">
                                <form:input path="payRate" cssClass="span6" />
                                <form:errors path="payRate" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="payRatesId">Pay Rates ID</label>
                            <div class="controls">
                                <form:input path="payRatesId" cssClass="span6" />
                                <form:errors path="payRatesId" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="vacationDays">Vacation Days</label>
                            <div class="controls">
                                <form:input path="vacationDays" cssClass="span6" />
                                <form:errors path="vacationDays" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="paidToDate">Paid To Date</label>
                            <div class="controls">
                                <form:input path="paidToDate" cssClass="span6" />
                                <form:errors path="paidToDate" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="paidLastYear">Paid Last Year</label>
                            <div class="controls">
                                <form:input path="paidLastYear" cssClass="span6" />
                                <form:errors path="paidLastYear" cssClass="text-danger"/>
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="col-md-offset-2 controls">
                                <input type="submit" value="Create" class="btn btn-default" onclick="createEmployee(); redirectToEmployeeList();"/>
                                <a href="${contextPath}/admin/employee/list.html" class="btn btn-default">Back to List</a>
                            </div>
                        </div>
                    </form:form>
                </div>
            </div>
        </div><!--/.content-->
    </tiles:putAttribute>
</tiles:insertDefinition>

<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.5/socket.io.js"></script>
<script>
    const socket = io('http://localhost:4000');
    socket.emit("payroll");

    function createEmployee() {
        socket.emit("createdEmployee");
    }

    // Hàm chuyển hướng trang sau khi tạo nhân viên thành công
    function redirectToEmployeeList() {
        setTimeout(function () {
            window.location.href = "${contextPath}/admin/employee/list.html";
        }, 3000); // Chuyển hướng sau 3 giây
    }
</script>


