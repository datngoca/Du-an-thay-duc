<%-- 
    Document   : deleteEmployee
    Created on : 10-Apr-2024, 23:31:30
    Author     : Administrator
--%>
<%-- 
    Document   : editEmployee
    Created on : 10-Apr-2024, 18:08:33
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
                    <h3>=Edit Employee</h3>
                </div>
                
                    <div class="module-body">
                        <c:if test="${not empty successMessage}">
                            <div class="alert alert-success">${successMessage}</div>
                        </c:if>
                        <c:if test="${not empty errorMessage}">
                            <div class="alert alert-success">${errorMessage}</div>
                        </c:if>
                        <form:form method="POST" action="${contextPath}/admin/employee/delete.html?employeeNumber=${employee.employeeNumber}" commandName="employee" cssClass="form-horizontal row-fluid">
                        <!--<form class="form-horizontal row-fluid">-->
                           
                            <form:errors path="*" cssClass="text-danger"/>
                        <!--<form class="form-horizontal row-fluid">-->
                            <div class="control-group">
                            <label class="control-label" for="idEmployee">idEmployee</label>
                            <div class="controls">
                                <form:input path="idEmployee" cssClass="span6" readonly="true"/>
                                <form:errors path="idEmployee" cssClass="text-danger"/> 
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="lastName">Last Name</label>
                            <div class="controls">
                                <form:input path="lastName" cssClass="span6" readonly="true"/>
                                <form:errors path="lastName" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="firstName">First Name</label>
                            <div class="controls">
                                <form:input path="firstName" cssClass="span6" readonly="true"/>
                                <form:errors path="firstName" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="ssn">SSN</label>
                            <div class="controls">
                                <form:input path="ssn" cssClass="span6" readonly="true"/>
                                <form:errors path="ssn" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="payRate">Pay Rate</label>
                            <div class="controls">
                                <form:input path="payRate" cssClass="span6" readonly="true"/>
                                <form:errors path="payRate" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="payRatesId">Pay Rates ID</label>
                            <div class="controls">
                                <form:input path="payRatesId" cssClass="span6" readonly="true"/>
                                <form:errors path="payRatesId" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="vacationDays">Vacation Days</label>
                            <div class="controls">
                                <form:input path="vacationDays" cssClass="span6" readonly="true"/>
                                <form:errors path="vacationDays" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="paidToDate">Paid To Date</label>
                            <div class="controls">
                                <form:input path="paidToDate" cssClass="span6" readonly="true"/>
                                <form:errors path="paidToDate" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="paidLastYear">Paid Last Year</label>
                            <div class="controls">
                                <form:input path="paidLastYear" cssClass="span6" readonly="true"/>
                                <form:errors path="paidLastYear" cssClass="text-danger"/>
                            </div>
                        </div>
                            <div class="control-group">
                            <div class="col-md-offset-2 controls">
                                <input type="submit" value="Delete" class="btn btn-default" />
                               <a href="${contextPath}/admin/employee/list.html" class="btn btn-default">Back to List</a>
                            </div>
                        </div>
                        </form:form>
                    </div>
            </div>
        </div><!--/.content-->
    </tiles:putAttribute>
</tiles:insertDefinition>
