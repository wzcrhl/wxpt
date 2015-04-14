<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<!-- Head -->
<head>
    <meta charset="utf-8" />
    <title>海尔园区管理</title>

    <meta name="description" content="Haier" />
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
    <link id="bootstrap-rtl-link" href="" rel="stylesheet" />
    <link href="assets/css/font-awesome.min.css" rel="stylesheet" />
    <link id="beyond-link" href="assets/css/beyond.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/css/demo.min.css" rel="stylesheet" />
    <link href="assets/css/typicons.min.css" rel="stylesheet" />
    <link href="assets/css/animate.min.css" rel="stylesheet" />
    <link id="skin-link" href="" rel="stylesheet" type="text/css" />
    <script src="assets/js/skins.min.js"></script>
</head>
<!-- /Head -->
<!-- Body -->
<body>
    <!-- Loading Container -->
    <div class="loading-container">
        <div class="loader"></div>
    </div>
    <!--  /Loading Container -->
    <!-- Navbar -->
    <div class="navbar">
        <div class="navbar-inner">
            <div class="navbar-container">
                <!-- LOGO -->
                <div class="navbar-header pull-left" id="logo">海尔园区管理</div>
                                
                <!-- 用户中心 -->
                <div class="navbar-header pull-right">
                    <div class="navbar-account">
                        <ul class="account-area" id="user_info">
                            
                        </ul>
                    </div>
                </div>
                <!-- /Account Area and Settings -->
            </div>
        </div>
    </div>
    <!-- /Navbar -->
    
    <!-- Main Container -->
    <div class="main-container container-fluid">
        <!-- Page Container -->
        <div class="page-container">

            <!-- Page Sidebar -->
            <div class="page-sidebar" id="sidebar">
                <!-- Page Sidebar Header-->
                <div class="sidebar-header-wrapper">
                </div>
                <!-- /Page Sidebar Header -->
                <!-- Sidebar Menu -->
                <ul class="nav sidebar-menu" id="catagory">
                </ul>
                <!-- /Sidebar Menu -->
            </div>
            <!-- /Page Sidebar -->
            
            <!-- Page Content -->
            <div class="page-content">
                <!-- Page Breadcrumb -->
                <div class="page-breadcrumbs">
                    <ul class="breadcrumb">
                        <li>
                            <i class="fa fa-home"></i>
                            <a href="#">用户模块</a>
                        </li>
                        <li class="active">用户管理</li>
                    </ul>
                </div>
                <!-- /Page Breadcrumb -->
                <!-- Page Header -->
                <div class="page-header position-relative">
                    <div class="header-title">
                        <h1>
                            设备绑定管理
                        </h1>
                    </div>
                    <!--Header Buttons-->
                    <div class="header-buttons">
                        <a class="sidebar-toggler" href="#">
                            <i class="fa fa-arrows-h"></i>
                        </a>
                        <a class="refresh" id="refresh-toggler" href="">
                            <i class="glyphicon glyphicon-refresh"></i>
                        </a>
                        <a class="fullscreen" id="fullscreen-toggler" href="#">
                            <i class="glyphicon glyphicon-fullscreen"></i>
                        </a>
                    </div>
                    <!--Header Buttons End-->
                </div>
                <!-- /Page Header -->
                
                <!-- Page Body -->
                <div class="page-body">
                    <div class="col-lg-12 col-sm-6 col-xs-12">
                        <div class="well" style="height:50px;!important;">
                            <div style="float:left;width:40%">
                                <h5><i class="typcn typcn-tabs-outline"></i>&nbsp;设备列表</h5>
                            </div>
                            <div style="float:right;width:50%;text-align:right;margin-top:-5px;">
                                 <!--<a href="#" class="btn btn-blue">编辑</a>-->
                            </div>
                            
                        </div>
                        
                        <div class="well" style="margin-top:-25px;">
                            <table class="table table-striped table-hover table-bordered" id="Table1">
                                <thead>
                                    <tr role="row">
                                        <th>业务系统</th>
                                        <th>绑定用户名</th>
                                        <th>设备名称</th>
                                        <th>设备唯一标识</th>
                                        <th>设备状态</th>
                                        <th>绑定状态</th>
                                        <th>操作</th>
                                    </tr>
                                </thead>
								<tbody id="user_bind_add" style="display:none">
									<tr>
										<td>
											<input type="text" class="form-control input-small" id="bind_appname" value="" readonly="readonly">
										</td>
										<td>
											<input type="text" class="form-control input-small" id="bind_username" value=""  readonly="readonly">
										</td>
										<td>
											<input type="text" class="form-control input-small" id="bind_devicename" value="" required>
										</td>
										<td>
											<input type="text" class="form-control input-small" id="bind_deviceid" value="" required>
										</td>
										<td></td>
										<td></td>
										<td>
											<a href="#" class="btn btn-info btn-xs edit" style="margin-top:5px;" onclick="addBind();"><i class="fa fa-edit"></i> 添加设备</a>
										</td>
									</tr>
								</tbody>
                                <tbody id="user_bind_list">
                                </tbody>
							</table>
							
							<div class="dataTables_paginate paging_bootstrap" id="user_page" style="width:100%;!important;text-align:right;!important;margin-top:3px;">
							</div>
                        </div>
                    </div>
                </div>
                
                <!-- /Page Body -->
                
                <button id="btn_alt" class="btn btn-default" data-toggle="modal" data-target=".bs-example-modal-sm" style="display:none;">btn_alt</button>
                <!--Small Modal Templates-->
				<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" style="z-index:9999;!important">
					<div class="modal-dialog modal-sm">
						<div class="modal-content">

							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
								<h4 class="modal-title" id="mySmallModalLabel">提 示</h4>
							</div>
							<div class="modal-body" id="alt_content">
								
							</div>
						</div><!-- /.modal-content -->
					</div><!-- /.modal-dialog -->
				</div>
				<!--End Small Modal Templates-->
                
            </div>
            <!-- /Page Content -->

        </div>
        <!-- /Page Container -->
        <!-- Main Container -->

    </div>

    <!--Basic Scripts-->
    <script src="assets/js/jquery-2.0.3.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/slimscroll/jquery.slimscroll.min.js"></script>

    <!--Beyond Scripts-->
    <!--beyond模板业务逻辑js-->
    <script src="assets/js/beyond.js"></script>
    <script src="assets/js/nestable/jquery.nestable.min.js"></script>
    <script src="assets/js/bootbox/bootbox.js?a=1"></script>

    <!--Mlink Scripts-->
    <script type="text/javascript" src="assets/js/mlink/utils.js"></script>
    <script type="text/javascript" src="assets/js/mlink/commons.js"></script>
    <script type="text/javascript" src="assets/js/mlink/uac/portal/bind.js"></script>
    <script type="text/javascript" src="assets/js/mlink/uac/portal/bindmanager.js"></script>
    <script type="text/javascript" src="assets/js/mlink/uac/portal/catagory.js"></script>
    <!-- mlink css-->
    <link rel="stylesheet" type="text/css" href="assets/css/mlink-mam.css" />
    <script type="text/javascript">
		var userid = '<%=request.getParameter("userid") == null ? "" : request.getParameter("userid")%>';
		var appid = '<%=request.getParameter("appid") == null ? "" : request.getParameter("appid")%>';
		


    </script>
</body>
<!--  /Body -->
</html>