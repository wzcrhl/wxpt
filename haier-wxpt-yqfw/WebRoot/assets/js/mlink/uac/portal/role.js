        function listpick(obj)
        {
            var list = $(".dd2-content.bg-azure.no-hover");
            for(var i=0;i<list.length;i++)
            {
                list[i].className = "dd2-content";
            }
            obj.className="dd2-content bg-azure no-hover";
        }
        
        function listpick_org(obj)
        {
            var list = $(".org-list.dd2-content.bg-azure.no-hover");
            for(var i=0;i<list.length;i++)
            {
                list[i].className = "org-list dd2-content";
            }
            obj.className="org-list dd2-content bg-azure no-hover";
        }
        
        function choose_list(obj)
        {
            var list = $(".app_none.bg-azure");
            for(var i=0;i<list.length;i++)
            {
                list[i].className = "app_none";
            }
            obj.className="app_none bg-azure";
        }
        
        
        
var role_msg = '<div id="edit_role_msg">';
role_msg += '	<div class="row">';
role_msg += '		<div class="col-md-12">';
role_msg += '			<div class="form-group">';
role_msg += '				角色名称：';
role_msg += '				<input type="text" id="edit_role_name" name="edit_role_name" value="edit_role_name_VALUE" class="form-control" placeholder="角色名称" required="">';
role_msg += '			</div>';
role_msg += '			<div class="form-group">';
role_msg += '				<div><label><input type="checkbox" class="inverted" name="edit_role_uacadmin" id="edit_role_uacadmin" edit_role_uacadmin_VALUE value="0"><span class="text">是否为UAC平台管理员</span></label></div>';
role_msg += '			</div>';
role_msg += '			<div class="form-group">';
role_msg += '				<div class="clearfix">';
role_msg += '					<button class="btn btn-warning btn-block btn-blue" onclick="ROLE_SUBMIT_VALUE">提  交</button>';
role_msg += '				</div>';
role_msg += '			</div>';
role_msg += '		</div>';
role_msg += '	</div>';
role_msg += '</div>';
role_msg += '';
role_msg += '';
role_msg += '';


function getrole_msg(edit_role_name_VALUE,edit_role_uacadmin_VALUE,ROLE_SUBMIT_VALUE)
{
	var msg = role_msg;
	//开始处理
	if(edit_role_name_VALUE != null && edit_role_name_VALUE != undefined){
		msg = msg.replace(/edit_role_name_VALUE/g,edit_role_name_VALUE);
	}
	else{
		msg = msg.replace(/edit_role_name_VALUE/g,"");
	}
	if(edit_role_uacadmin_VALUE != null && edit_role_uacadmin_VALUE != undefined){
		if(edit_role_uacadmin_VALUE == '是'){
			msg = msg.replace(/edit_role_uacadmin_VALUE/g,"checked");
		}else{
		msg = msg.replace(/edit_role_uacadmin_VALUE/g,"");
		}
	}else{
		msg = msg.replace(/edit_role_uacadmin_VALUE/g,"");
	}
	if(ROLE_SUBMIT_VALUE != null && ROLE_SUBMIT_VALUE != undefined){
		msg = msg.replace(/ROLE_SUBMIT_VALUE/g,ROLE_SUBMIT_VALUE);
	}else{
		msg = msg.replace(/ROLE_SUBMIT_VALUE/g,"");
	}
	return msg;
	
}

