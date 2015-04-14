        g_utils.load("/portal/web/catagory/getCatagory",false,function(html){
            //alert(html);

            gt('catagory').innerHTML = html;
            //var json = eval("(" + html + ")");
            //var code = json.code;
            //if(code == 1)
            //{
               
            //}
        },"&current=" + page_name);
        
        g_utils.load("/portal/web/catagory/getUserInfo",false,function(html){
            //alert(html);

            gt('user_info').innerHTML = html;
            //var json = eval("(" + html + ")");
            //var code = json.code;
            //if(code == 1)
            //{
               
            //}
        },"&current=" + page_name);
        
        function logout()
        {
        	g_utils.load("/portal/web/login/logout",false,function(html){
            	location.href = '/portal/';
        	},"");
        }
        
        function editAdmin(id){
        	var username = gt('edit_admin_name').value;
        	var truename = gt('edit_admin_truename').value;
        	var oldpass = gt('edit_admin_oldpass').value;
        	var newpass = gt('edit_admin_newpass').value;
        	var newpassconfirm = gt('edit_admin_newpass_confirm').value;
        	g_utils.load("/portal/web/login/modadmin",false,function(html){
            	var json = eval("(" + html + ")");
            	if(json.code != null && json.code != undefined)
                {
                	if(json.code == '1'){
						gt('bootbox_btn_close').click();                		
                	}
                	alert(json.msg);
                	
                    return;
                }
        	},"&username=" + username + "&truename=" + truename + "&oldpass=" + oldpass + "&newpass=" + newpass + "&newpassconfirm=" + newpassconfirm);
        }
        
        function edit_admin_click()
        {
        	g_utils.load("/portal/web/login/getadmin",false,function(html){
            	var json = eval("(" + html + ")");
            	if(json.code != null && json.code != undefined)
                {
                	alert(json.msg);
                    return;
                }
				var msg = getAdmin_msg(json.truename,json.name,"editAdmin('"+ json.id +"');");
				bootbox.dialog({
					message: msg,
					title: "修改管理员信息",
					className: "modal-darkorange",
				});
        	},"");
        	
        }
        
var admin_msg = '<div id="admin_msg">';
admin_msg += '	<div class="row">';
admin_msg += '		<div class="col-md-12">';
admin_msg += '			<div class="form-group">';
admin_msg += '				管理员真实姓名：<input type="text" id="edit_admin_truename" name="edit_admin_truename" value="edit_admin_truename_VALUE" class="form-control" placeholder="管理员名称" >';
admin_msg += '			</div>';
admin_msg += '			<div class="form-group">';
admin_msg += '				登录用户名：<input type="text" id="edit_admin_name" value="edit_admin_name_VALUE" name="edit_admin_name" class="form-control" placeholder="管理员用户名" >';
admin_msg += '			</div>';
admin_msg += '			<div class="form-group">';
admin_msg += '				旧密码：<input type="password" id="edit_admin_oldpass" name="edit_admin_oldpass" value="" class="form-control" placeholder="输入旧密码" required="">';
admin_msg += '			</div>';
admin_msg += '			<div class="form-group">';
admin_msg += '				新密码：<input type="password" id="edit_admin_newpass" name="edit_admin_newpass" value="" class="form-control" placeholder="输入新密码" required="">';
admin_msg += '			</div>';
admin_msg += '			<div class="form-group">';
admin_msg += '				确认新密码：<input type="password" id="edit_admin_newpass_confirm" name="edit_admin_newpass_confirm" value="" class="form-control" placeholder="再次确认新密码" required="">';
admin_msg += '			</div>';
admin_msg += '			<div class="form-group">';
admin_msg += '				<div class="clearfix">';
admin_msg += '					<button class="btn btn-warning btn-block btn-blue" onclick="ADMIN_SUBMIT_VALUE">确认修改</button>';
admin_msg += '				</div>';
admin_msg += '			</div>';
admin_msg += '		</div>';
admin_msg += '	</div>';
admin_msg += '</div>';
admin_msg += '';
admin_msg += '';
admin_msg += '';


function getAdmin_msg(edit_admin_truename_VALUE,edit_admin_name_VALUE,ADMIN_SUBMIT_VALUE)
{

	var msg = admin_msg;
	//开始处理
	if(edit_admin_truename_VALUE != null && edit_admin_truename_VALUE != undefined){
		msg = msg.replace(/edit_admin_truename_VALUE/g,edit_admin_truename_VALUE);
	}
	else{
		msg = msg.replace(/edit_admin_truename_VALUE/g,"");
	}
	
	if(edit_admin_name_VALUE != null && edit_admin_name_VALUE != undefined){
		msg = msg.replace(/edit_admin_name_VALUE/g,edit_admin_name_VALUE);
	}else{
		msg = msg.replace(/edit_admin_name_VALUE/g,"");
	}
	
	if(ADMIN_SUBMIT_VALUE != null && ADMIN_SUBMIT_VALUE != undefined){
		msg = msg.replace(/ADMIN_SUBMIT_VALUE/g,ADMIN_SUBMIT_VALUE);
	}else{
		msg = msg.replace(/ADMIN_SUBMIT_VALUE/g,"");
	}
	
	return msg;
	
}


gt('logo').innerHTML = '<a href="#" class="navbar-brand"><small><img src="assets/img/logo.png" alt="" />&nbsp;UC管理平台</small></a>';

