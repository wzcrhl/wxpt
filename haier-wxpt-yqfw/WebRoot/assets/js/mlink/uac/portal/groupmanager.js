

	var app_id = "";
	var app_name = "";
	var group_id = "";
	var role_name = "";
	var org_id = "";

	var page_id = 1;

        function getGroupList(appid,appname){
        	app_id = appid;
        	app_name = appname;
        	gt('group_appname_show').innerText = app_name;
        	gt('group_table').innerHTML = '';
			gt('group_org_list').innerHTML = '';
			gt('user_table').innerHTML = '';
			gt('user_page').innerHTML = '';
			
            g_utils.load("/portal/web/group/getGroupList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    alert(json.msg);
                    return;
                }

                //开始拼列表
                var content = '';

                var groups = json.groups;
                if(groups == null || groups == undefined)
                {
                    return;
                }
                for(var i=0;i<groups.length;i++){
                    var group = groups[i];
                    if(group == null || group == undefined){
                        continue;
                    }

                    content += '<tr onclick="choose_list(this);getOrgList(\''+ group.id +'\');" class="app_none">';
                    content += '    <td>'+ group.appname +'</td>';
                    content += '    <td>'+ group.name +'</td>';
                    content += '    <td>';
                    content += '			<div class="tree-actions" onclick="event.stopPropagation();" style="font-size:1.3em;!important">';
                    content += '        <i title="编辑分组" onclick="edit_group_click(\''+ group.name +'\',\''+ group.id +'\');" class="fa fa-edit blizzard"></i>&nbsp;&nbsp;';
                    content += '        <i title="删除分组" onclick="deleteGroup(\''+ group.id +'\',\''+ group.name +'\')" class="fa fa-trash-o danger"></i>';
                    content += '    		</div>';
                    content += '    </td>';
                    content += '</tr>';
                }
                gt('group_table').innerHTML = content;

                var listClick = $(".app_none");
                if(listClick != null && listClick != undefined && listClick.length > 0)
                {
                    listClick[0].click();
                }

            },"&appid=" + appid);
        }
        
        
        function addGroup(type,groupid){
            var name = "";
            if(type == 'add')
            {
                name = gt('group_name').value;
            }else if(type =='edit'){
                name = gt('edit_group_name').value;
            }
            
            g_utils.load("/portal/web/group/addGroup",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getGroupList(app_id,app_name);
                    if(type == 'add')
                    {
                        gt('group_name').value = '';
                    }else if(type =='edit'){
                        gt('bootbox_btn_close').click();
                    }
                }
                alert(json.msg);

            },"&name=" + name + "&type=" + type + "&appid=" + app_id + "&groupid=" + groupid);

        }
        
        function getOrgList(groupid){
        	group_id = groupid;
            g_utils.load("/portal/web/group/getOrgList",false,function(html){
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
                gt('group_org_list').innerHTML = content;

                $('.dd').nestable();
                $('.dd-handle a').on('mousedown', function (e) {
                    e.stopPropagation();
                });
                
                var listClick = $(".org-list.dd2-content");
                if(listClick != null && listClick != undefined && listClick.length > 0)
                {
                    listClick[0].click();
                }

            },"&groupid=" + groupid + "&appid=" + app_id);
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
                
                content += '    <div class="org-list dd2-content" onclick="listpick_org(this);getUserList(\''+ org.groupid +'\',\''+ orgid +'\',\'1\');">'+ org.name +'</div>';
                
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
        
        function getAppList(){
        	gt('app_list').innerHTML = '';
        	gt('group_appname_show').innerText = "";
        	gt('group_table').innerHTML = '';
			gt('group_org_list').innerHTML = '';
			gt('user_table').innerHTML = '';
			gt('user_page').innerHTML = '';
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
                    content += '    <div class="dd2-content" onclick="listpick(this);getGroupList(\''+ app.id +'\',\''+ app.name +'\');">'+ app.name +'</div>';
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
        
        function edit_group_click(groupname,groupid){
            //需要拼编辑界面....
            var msg = getgroup_msg(groupname,"addGroup('edit','"+ groupid +"')");
             bootbox.dialog({
                message: msg,
                title: "编辑分组",
                className: "modal-darkorange",
                
            });
        }
        function deleteGroup(groupid,groupname)
        {
            bootbox.confirm("确定删除["+ groupname +"]分组么?", function (result) {
                if (result) {
                    //确认删除.
                    g_utils.load("/portal/web/group/delGroup",false,function(html){
                        var json = eval("(" + html + ")");
                        var code = json.code;
                        if(code == 1)
                        {
                            getGroupList(app_id,app_name);
                        }
                        alert(json.msg);
                    },"groupid=" + groupid);
                }
            });
        }


		function getUserList(groupid,orgid,pageid){
			group_id = groupid;
			org_id = orgid;
			page_id = pageid;
			g_utils.load("/portal/web/group/getUserList",false,function(html){
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
                    content += '    <td>'+ user.orgname +'</td>';
                    
                    var isIn = user.inrole;
                    var showText1 = "";
                    var showText2 = "";
                    var showId = 0;
                    var showClass = "";
                    if(isIn == '1'){
                    	showText1 = "属于";
                    	showText2 = "取消";
                    	showId = 0;
                    	showClass = "btn btn-danger btn-xs edit";
                    }else{
                    	showText1 = "不属于";
                    	showText2 = "加入";
                    	showId = 1;
                    	showClass = "btn btn-info btn-xs edit";
                    }
                    content += '    <td>'+ showText1 +'</td>';
                    
                    content += '    <td>';
                    content += '        <a onclick="event.stopPropagation();changeUserGroup(\''+ user.userid +'\',\''+ showId +'\');" class="'+showClass+'"><i class="fa fa-edit"></i>'+ showText2 +'</a>';
                    content += '    </td>';
                    content += '</tr>';
                }
                gt('user_table').innerHTML = content;
                
                perpage(json.total_count,json.total_page,pageid);
                
			
			},"&groupid=" + groupid + "&appid=" + app_id + "&pageid=" + pageid + "&orgid=" + orgid);
		}
		
		function saveGroupOrgList(){
            if(group_id == '')
            {
                alert('请选择分组!');
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
            g_utils.load("/portal/web/group/saveGroupOrgList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1){
                    getOrgList(group_id);
                }
                alert(json.msg);
            },"&checkid=" + params + "&appid=" + app_id + "&groupid=" + group_id);

        }

		function perpage(total_count,total_page,pageid){
			var pageContent = '共'+ total_count +'条数据,共'+ total_page +'页&nbsp;<ul class="pagination">';
			if(pageid == 1){
				pageContent += '<li class="prev disabled"><a href="#">首页</a></li>';
			}
			else{
				pageContent += '<li class="prev"><a onclick="getUserList(\''+ group_id +'\',\''+ org_id +'\',1);">首页</a></li>';
			}
			
			
			for(var i=1;i<=total_page;i++)
			{
				if(i == pageid){
					pageContent += '<li class="active"><a >'+ i +'</a></li>';
				}else{
					pageContent += '<li><a  onclick="getUserList(\''+ group_id +'\',\''+ org_id +'\','+ i +');">'+ i +'</a></li>';
				}
			}
			if(pageid == total_page){
				pageContent += '<li class="prev disabled"><a href="#">尾页</a></li></ul>';
			}else{
				pageContent += '<li class="prev" onclick="getUserList(\''+ group_id +'\',\''+ org_id +'\','+ total_page +');"><a >尾页</a></li></ul>';
			}
			
			gt('user_page').innerHTML = pageContent;
		}

		function changeUserGroup(userid,showid){
			g_utils.load("/portal/web/group/changeUserGroup",false,function(html){
				var json = eval("(" + html + ")");
			 	var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    if(json.code == '1'){
                    	getUserList(group_id,org_id,page_id);
                    }else{
                    	alert(json.msg);
                    }
                }
			},"&userid=" + userid + "&groupid=" + group_id + "&showid=" + showid);
		}


window.onload = function(){
    getAppList();
}
