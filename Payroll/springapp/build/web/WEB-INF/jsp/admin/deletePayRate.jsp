<%-- 
    Document   : deletePayRate
    Created on : 12-Apr-2024, 01:54:16
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
                    <h3>Delete PayRate</h3>
                </div>
                
                <div class="module-body">
                    <form:form method="POST" action="${contextPath}/admin/payrates/delete.html?idPayRates=${payrate.idPayRates}" commandName="payrate" cssClass="form-horizontal row-fluid">
                        <form:errors path="*" cssClass="text-danger"/>

                        <div class="control-group">
                            <label class="control-label" for="payRateName">Pay Rate Name</label>
                            <div class="controls">
                                <form:input path="payRateName" cssClass="span6" readonly="true"/>
                                <form:errors path="payRateName" cssClass="text-danger"/> 
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="value">Value</label>
                            <div class="controls">
                                <form:input path="value" cssClass="span6" readonly="true"/>
                                <form:errors path="value" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="taxPercentage">Tax Percentage</label>
                            <div class="controls">
                                <form:input path="taxPercentage" cssClass="span6" readonly="true"/>
                                <form:errors path="taxPercentage" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="payType">Pay Type</label>
                            <div class="controls">
                                <form:input path="payType" cssClass="span6" readonly="true"/>
                                <form:errors path="payType" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="payAmount">Pay Amount</label>
                            <div class="controls">
                                <form:input path="payAmount" cssClass="span6" readonly="true"/>
                                <form:errors path="payAmount" cssClass="text-danger"/>
                            </div>
                        </div>

                        <div class="control-group">
                            <label class="control-label" for="ptLevelC">PT Level C</label>
                            <div class="controls">
                                <form:input path="ptLevelC" cssClass="span6" readonly="true"/>
                                <form:errors path="ptLevelC" cssClass="text-danger"/>
                            </div>
                        </div>
                        
                        <div class="control-group">
                            <div class="col-md-offset-2 controls">
                                <input type="submit" value="Delete" class="btn btn-default" />
                                <a href="${contextPath}/admin/payrates/list.html" class="btn btn-default">Back to List</a>
                            </div>
                        </div>
                    </form:form>
                </div>
            </div>
        </div><!--/.content-->
    </tiles:putAttribute>
</tiles:insertDefinition>
