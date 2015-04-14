

	var app_id = "";
	var app_name = "";
	var role_id = "";
	var role_name = "";
	var org_id = "";

	var page_id = 1;

        function getRoleList(appid,appname){
        	app_id = appid;
        	app_name = appname;
        	gt('role_appname_show').innerText = app_name;
			gt('role_table').innerHTML = '';
			gt('role_perm_list').innerHTML = '';
			gt('user_table').innerHTML = '';
			gt('role_org_list').innerHTML = '';
			gt('role_permname_show').innerText = "";
        	gt('role_org_show').innerText = "";
			
            g_utils.load("/portal/web/role/getRoleList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    alert(json.msg);
                    return;
                }

                //开始拼列表
                var content = '';

                var roles = json.roles;
                if(roles == null || roles == undefined)
                {
                    return;
                }
                for(var i=0;i<roles.length;i++){
                    var role = roles[i];
                    if(role == null || role == undefined){
                        continue;
                    }

                    content += '<tr onclick="choose_list(this);getPermList(\''+ role.id +'\',\''+ role.name +'\');getOrgList(\''+ role.id +'\');" class="app_none">';
                    content += '    <td>'+ role.appname +'</td>';
                    content += '    <td>'+ role.name +'</td>';
                    content += '    <td>'+ role.uacadmin +'</td>';
                    content += '    <td>';
                    content += '			<div class="tree-actions" onclick="event.stopPropagation();" style="font-size:1.3em;!important">';
                    content += '        <i title="编辑角色" onclick="edit_role_click(\''+ role.name +'\',\''+ role.uacadmin +'\',\''+ role.id +'\');" class="fa fa-edit blizzard"></i>&nbsp;&nbsp;';
                    content += '        <i title="删除角色" onclick="deleteRole(\''+ role.id +'\',\''+ role.name +'\')" class="fa fa-trash-o danger"></i>';
                    content += '    		</div>';
                    content += '    </td>';
                    content += '</tr>';
                }
                gt('role_table').innerHTML = content;

                var listClick = $(".app_none");
                if(listClick != null && listClick != undefined && listClick.length > 0)
                {
                    listClick[0].click();
                }

            },"&appid=" + appid);
        }
        
        
        function addRole(type,roleid){
            var name = "";
            var uacadmin = "";
            if(type == 'add')
            {
                name = gt('role_name').value;
                if(gt('role_uacadmin').checked){
                	uacadmin = "1";
                }else{
                	uacadmin = "0";
                }
            }else if(type =='edit'){
                name = gt('edit_role_name').value;
                if(gt('edit_role_uacadmin').checked){
                	uacadmin = "1";
                }else{
                	uacadmin = "0";
                }
            }
            
            g_utils.load("/portal/web/role/addRole",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getRoleList(app_id,app_name);
                    if(type == 'add')
                    {
                        gt('role_name').value = '';
                        gt('role_uacadmin').checked = false;
                    }else if(type =='edit'){
                        gt('bootbox_btn_close').click();
                    }
                    
                }
                alert(json.msg);

            },"&name=" + name + "&uacadmin=" + uacadmin + "&type=" + type + "&appid=" + app_id + "&roleid=" + roleid);

        }
        
        function getOrgList(roleid){
        	role_id = roleid;
            g_utils.load("/portal/web/role/getOrgList",false,function(html){
            	//alert(html);
                var json = eval("(" + html + ")");
                if(json.code != null && json.code != undefined)
                {
                    return;
                }

                //开始拼列表
                var content = '<div class="dd dd-draghandle bordered">';
                var orgs = json.orgs;
                if(orgs == null || orgs == undefined)
                {
                    return;
                }
                content += showOrgList(orgs,'org');

                content += '</div>';
                //alert(content);
                gt('role_org_list').innerHTML = content;


                $('.dd').nestable();
                $('.dd-handle a').on('mousedown', function (e) {
                    e.stopPropagation();
                });
                
                var listClick = $(".org-list.dd2-content");
                if(listClick != null && listClick != undefined && listClick.length > 0)
                {
                    listClick[0].click();
                }

            },"&roleid=" + roleid + "&appid=" + app_id);
        }
        
        function showOrgList(orgs,parentid){
            var content = '<ol class="dd-list">';
            var index = 1;
            for(var i=0;i<orgs.length;i++){
                var org = orgs[i];
                if(org == null || org == undefined){
                    continue;
                }
                var checkId = parentid + '_' + index + '';
                content += '<li class="dd-item dd2-item" data-id="1">';
                content += '    <div class="ico-border-style dd2-handle">';
                content += '        <div class="checkbox checkbox_mg"><label>';
                
                var orgid = org.id;
                if(orgid == null || orgid == undefined)
                {
                	orgid = "";
                }
                
                if(org.checkbox != null && org.checkbox != undefined && org.checkbox == 'false'){
                	
                }else{
                	if(org.isin == 'true'){
	                    content += '<input type="checkbox" class="inverted" onclick="changecheck(this);" checked name="orgs" value="'+ orgid +'" id="'+ checkId +'"><span class="text"></span>';
	                }else{
	                    content += '<input type="checkbox" class="inverted" onclick="changecheck(this);" name="orgs" value="'+ orgid +'" id="'+ checkId +'"><span class="text"></span>';
	                }
                }
                
                content += '        </label></div>';
                content += '    </div>';
                
                content += '    <div class="org-list dd2-content" onclick="listpick_org(this);getUserList(\''+ org.roleid +'\',\''+ orgid +'\',\'1\');">'+ org.name +'</div>';
                
                index ++;

                var childs = org.orgs;
                if(childs != null && childs != undefined && childs.length > 0)
                {
                    content += showOrgList(childs,checkId);
                }

                content += '</li>';
            }
            content += '</ol>';
            return content;

        }
        
        
        function getPermList(roleid,rolename){
        	role_id = role_id;
        	role_name = rolename;
        	gt('role_permname_show').innerText = role_name;
        	gt('role_org_show').innerText = role_name;
            g_utils.load("/portal/web/role/getPermList",false,function(html){
            	//alert(html);
                var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    return;
                }

                //开始拼列表
                var content = '<div class="dd dd-draghandle bordered">';
                var perms = json.perms;
                if(perms == null || perms == undefined)
                {
                    return;
                }
                content += showPermList(perms,'check');

                content += '</div>';
                //alert(content);
                gt('role_perm_list').innerHTML = content;


                $('.dd').nestable();
                $('.dd-handle a').on('mousedown', function (e) {
                    e.stopPropagation();
                });

            },"&roleid=" + roleid + "&appid=" + app_id);
        }
        
        function showPermList(perms,parentid){
            var content = '<ol class="dd-list">';
            var index = 1;
            for(var i=0;i<perms.length;i++){
                var perm = perms[i];
                if(perm == null || perm == undefined){
                    continue;
                }
                var checkId = parentid + '_' + index + '';
                content += '<li class="dd-item dd2-item" data-id="1">';
                content += '    <div class="ico-border-style dd2-handle">';
                content += '        <div class="checkbox checkbox_mg"><label>';
                
                if(perm.checkbox != null && perm.checkbox != undefined && perm.checkbox == 'false'){
                	
                }else{
                	 if(perm.isin == 'true'){
	                    content += '<input type="checkbox" class="inverted" onclick="changecheck(this);" checked name="perms" value="'+ perm.id +'" id="'+ checkId +'"><span class="text"></span>';
	                }else{
	                    content += '<input type="checkbox" class="inverted" onclick="changecheck(this);" name="perms" value="'+ perm.id +'" id="'+ checkId +'"><span class="text"></span>';
	                }
                }
                
               
                
                content += '        </label></div>';
                content += '    </div>';
                
                content += '    <div class="dd2-content">'+ perm.name +'</div>';
                
                index ++;

                var childs = perm.perms;
                if(childs != null && childs != undefined && childs.length > 0)
                {
                    content += showPermList(childs,checkId);
                }

                content += '</li>';

            }
            content += '</ol>';
            return content;

        }
        
        
        
        function getAppList(){
        	gt('app_list').innerHTML = '';
        	gt('role_permname_show').innerText = "";
        	gt('role_org_show').innerText = "";
        	gt('role_table').innerHTML = '';
			gt('role_perm_list').innerHTML = '';
			gt('user_table').innerHTML = '';
			gt('role_org_list').innerHTML = '';
            g_utils.load("/portal/web/app/getAppList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    return;
                }

                //开始拼列表
                var content = '<div class="dd dd-draghandle bordered">';
                var apps = json.apps;
                if(apps == null || apps == undefined)
                {
                    return;
                }
                content += '<ol class="dd-list">';
	            for(var i=0;i<apps.length;i++){
	                var app = apps[i];
	                if(app == null || app == undefined){
	                    continue;
	                }
	
	                content += '<li class="dd-item dd2-item" data-id="1">';
                    content += '    <div class="ico-border-style dd2-handle">';
	                content += '        <i class="normal-icon fa fa-android"></i><i class="drag-icon fa fa-arrows-alt "></i>';
	                content += '    </div>';
                    content += '    <div class="dd2-content" onclick="listpick(this);getRoleList(\''+ app.id +'\',\''+ app.name +'\');">'+ app.name +'</div>';
	                content += '</li>';
	            }
	            content += '</ol>';

                content += '</div>';
                gt('app_list').innerHTML = content;


                $('.dd').nestable();
                $('.dd-handle a').on('mousedown', function (e) {
                    e.stopPropagation();
                });

                var listClick = $(".dd2-content");
                if(listClick != null && listClick != undefined && listClick.length > 0)
                {
                    listClick[0].click();
                }

            },"");
        }
        
        function edit_role_click(rolename,uacadmin,roleid){
            //需要拼编辑界面....

            var msg = getrole_msg(rolename,uacadmin,"addRole('edit','"+ roleid +"')");
             bootbox.dialog({
                message: msg,
                title: "编辑角色",
                className: "modal-darkorange",
                
            });
        }
        function deleteRole(roleid,rolename)
        {
            bootbox.confirm("确定删除["+ rolename +"]角色么?", function (result) {
                if (result) {
                    //确认删除.
                    g_utils.load("/portal/web/role/delRole",false,function(html){
                        var json = eval("(" + html + ")");
                        var code = json.code;
                        if(code == 1)
                        {
                            getRoleList(app_id,app_name);
                        }
                        alert(json.msg);
                    },"roleid=" + roleid);
                }
            });
        }


		function getUserList(roleid,orgid,pageid){
			role_id = roleid;
			//role_name = rolename;
			org_id = orgid;
			page_id = pageid;
			//gt('role_rolename_show').innerText = role_name;
			g_utils.load("/portal/web/role/getUserList",false,function(html){
				var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    alert(json.msg);
                    return;
                }

                //开始拼列表
                var content = '';

                var users = json.users;
                if(users == null || users == undefined)
                {
                    return;
                }
                for(var i=0;i<users.length;i++){
                    var user = users[i];
                    if(user == null || user == undefined){
                        continue;
                    }

                    content += '<tr>';
                    content += '    <td>'+ user.username +'</td>';
                    
                    var isIn = user.inrole;
                    var showText1 = "";
                    var showText2 = "";
                    var showId = 0;
                    var showClass = "";
                    if(isIn == '1'){
                    	showText1 = "已加入";
                    	showText2 = "取消";
                    	showId = 0;
                    	showClass = "btn btn-danger btn-xs edit";
                    }else{
                    	showText1 = "未加入";
                    	showText2 = "加入";
                    	showId = 1;
                    	showClass = "btn btn-info btn-xs edit";
                    }
                    content += '    <td>'+ showText1 +'</td>';
                    
                    content += '    <td>';
                    content += '        <a onclick="event.stopPropagation();changeUserRole(\''+ user.userid +'\',\''+ user.roleid +'\',\''+ showId +'\');" class="'+showClass+'"><i class="fa fa-edit"></i>'+ showText2 +'</a>';
                    content += '    </td>';
                    content += '</tr>';
                }
                gt('user_table').innerHTML = content;
                
                perpage(json.total_count,json.total_page,pageid);
                
                
			
			},"&roleid=" + roleid + "&appid=" + app_id + "&pageid=" + pageid + "&orgid=" + orgid);
			
			
		}
		
		
		function saveRolePermList(){
            if(role_id == '')
            {
                alert('请选择角色!');
                return;
            }
            var perms = document.getElementsByName('perms');
            if(perms == null || perms.length <=0){
                alert('保存失败!');
                return;
            }
            var params = '';
            for(var i=0;i<perms.length;i++){
                var perm = perms[i];
                if(perm == null || perm == undefined){
                    continue;
                }
                if(perm.checked){
                    params += perm.value + ',';
                }
            }
            g_utils.load("/portal/web/role/saveRolePermList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getPermList(role_id,role_name);
                    alert(json.msg);
                }else{
                    //失败
                    alert(json.msg);
                }
            },"&checkid=" + params + "&appid=" + app_id + "&roleid=" + role_id);

        }
		
		
		function saveRoleOrgList(){
            if(role_id == '')
            {
                alert('请选择角色!');
                return;
            }
            var orgs = document.getElementsByName('orgs');
            if(orgs == null || orgs.length <=0){
                alert('保存失败!');
                return;
            }
            var params = '';
            for(var i=0;i<orgs.length;i++){
                var org = orgs[i];
                if(org == null || org == undefined){
                    continue;
                }
                if(org.checked){
                    params += org.value + ',';
                }
            }
            g_utils.load("/portal/web/role/saveRoleOrgList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getOrgList(role_id);
                    alert(json.msg);
                }else{
                    //失败
                    alert(json.msg);
                }
            },"&checkid=" + params + "&appid=" + app_id + "&roleid=" + role_id);

        }

		function perpage(total_count,total_page,pageid){
			var pageContent = '共'+ total_count +'条数据,共'+ total_page +'页&nbsp;<ul class="pagination">';
			if(pageid == 1){
				pageContent += '<li class="prev disabled"><a href="#">首页</a></li>';
			}
			else{
				pageContent += '<li class="prev"><a onclick="getUserList(\''+ role_id +'\',\''+ org_id +'\',1);">首页</a></li>';
			}
			
			
			for(var i=1;i<=total_page;i++)
			{
				if(i == pageid){
					pageContent += '<li class="active"><a >'+ i +'</a></li>';
				}else{
					pageContent += '<li><a  onclick="getUserList(\''+ role_id +'\',\''+ org_id +'\','+ i +');">'+ i +'</a></li>';
				}
			}
			if(pageid == total_page){
				pageContent += '<li class="prev disabled"><a href="#">尾页</a></li></ul>';
			}else{
				pageContent += '<li class="prev" onclick="getUserList(\''+ role_id +'\',\''+ org_id +'\','+ total_page +');"><a >尾页</a></li></ul>';
			}
			
			gt('user_page').innerHTML = pageContent;
		}

		function changeUserRole(userid,roleid,showid){
			g_utils.load("/portal/web/role/changeUserRole",false,function(html){
				var json = eval("(" + html + ")");
			 	var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    if(json.code == '1'){
                    	getUserList(role_id,org_id,page_id);
                    }else{
                    	alert(json.msg);
                    }
                }
			},"&userid=" + userid + "&roleid=" + roleid + "&showid=" + showid);
		}


window.onload = function(){
    getAppList();
}
