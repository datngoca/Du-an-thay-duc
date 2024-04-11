<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="core" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<core:set var="contextPath" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<tiles:insertDefinition name="layouts">
    <tiles:putAttribute name="body">
        <div class="content">
            <div class="module">
                <div class="module-head">
                    <h3>Create Employee</h3>
                </div>
                <!-- Sửa đường dẫn action thành ${contextPath}/admin/employee/add -->
                <form:form action="${contextPath}/admin/employee/add.html" method="post" modelAttribute="employee" cssClass="form-horizontal row-fluid">
                    <div class="module-body">
                        <!-- Hiển thị message thành công nếu có -->
                        <c:if test="${not empty successMessage}">
                            <div class="alert alert-success">${successMessage}</div>
                        </c:if>
                        
                        <form:errors path="*" cssClass="text-danger"/>
                            <div class="control-group">
                            <label class="control-label" for="idEmployee">id Employee</label>
                            <div class="controls">
                                <form:input path="idEmployee" cssClass="span6" />
                                <form:errors path="idEmployee" cssClass="text-danger"/> 
                            </div>
                        </div>

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
                                <input type="submit" value="Create" class="btn btn-default" />
                                <a href="${contextPath}/admin/employee/list.html" class="btn btn-default">Back to List</a>
                            </div>
                        </div>
                    </div>
                </form:form>
            </div>
        </div><!--/.content-->
    </tiles:putAttribute>
</tiles:insertDefinition>

