
        
        var choose_appid = "";
        var choose_orgid = "";
        
        var pageid = 1;
        
        function getUserList(appid,orgid,pageid_,obj){
			choose_appid = appid;
			choose_orgid = orgid;
			listpick(obj);
			g_utils.load("/portal/web/user/getUserList",false,function(html){
					gt('userList_tbody').innerHTML = pageContent;
					var json = eval("(" + html + ")");
					if(json.code != null && json.code != undefined)
					{
						alert(json.msg); 
						return;
					}
					
					var users = json.users;
					var content = "";
					if(users != null && users != undefined && users.length > 0)
					{
						for(var i=0;i<users.length;i++)
						{
							var user  = users[i];
							if(user != null && user != undefined && user.id != null)
							{
								//开始拼用户吧?
								content += '<tr>';
								content += '	<td>'+ user.truename +'</td>';
								content += '	<td>'+ user.username +'</td>';
								content += '	<td>'+ user.appname +'</td>';
								content += '	<td class="center ">'+ user.orgname +'</td>';
								content += '	<td>';
								content += '		<a class="btn btn-info btn-xs edit" onclick="edit_user_click(\''+ user.id +'\');"><i class="fa"></i> 编辑</a>';
								content += '		<a class="btn btn-primary btn-xs edit" onclick="move_user_click(\''+ user.id +'\');"><i class="fa"></i> 转移</a>';
								content += '		<a class="btn btn-purple btn-xs edit" onclick="location.href=\'/portal/userbind.jsp?appid='+ user.appid +'&userid='+ user.id +'\';"><i class="fa"></i> 设备</a>';
								content += '		<a class="btn btn-warning btn-xs edit" onclick="window.open(\'/portal/userexcept.jsp?userid='+ user.id +'\');"><i class="fa"></i> 例外</a>';
								content += '		<a class="btn btn-danger btn-xs delete" onclick="delete_user_click(\''+ user.id +'\',\''+ user.truename +'\');"><i class="fa"></i> 删除</a>';
								content += '	</td>';
								content += '</tr>';
								content += '';
                                
							}
						}
					}
					gt('userList_tbody').innerHTML = content;
					
					//分页和用户列表.
					
					var pageContent = '共'+ json.total_count +'条数据,共'+ json.total_page +'页&nbsp;<ul class="pagination">';
					pageid = json.pageid;
					if(pageid == 1){
						pageContent += '<li class="prev disabled"><a href="#">首页</a></li>';
					}
					else{
						pageContent += '<li class="prev"><a onclick="getUserList(\''+ choose_appid +'\',\''+ choose_orgid +'\',1);">首页</a></li>';
					}
					
					
					for(var i=1;i<=json.total_page;i++)
					{
						if(i == pageid){
							pageContent += '<li class="active"><a href="#">'+ i +'</a></li>';
						}else{
							pageContent += '<li><a onclick="getUserList(\''+ choose_appid +'\',\''+ choose_orgid +'\','+ i +');">'+ i +'</a></li>';
						}
					}
					if(pageid == json.total_page){
						pageContent += '<li class="prev disabled"><a href="#">尾页</a></li></ul>';
					}else{
						pageContent += '<li class="prev" onclick="getUserList(\''+ choose_appid +'\',\''+ choose_orgid +'\','+ json.total_page +');"><a>尾页</a></li></ul>';
					}
					
					gt('user_page').innerHTML = pageContent;
					
			},"appid=" + appid + "&orgid=" + orgid + "&pageid=" + pageid_);
			
			
        }
        
        function new_user_click(){
			if(choose_appid == '')
			{
				alert('请先创建业务系统');
				return; 
			}
			if(choose_orgid == '')
			{
				alert('请先创建组织');
			}
			
			//请求后台,查询app和org
			g_utils.load("/portal/web/user/getAppnameOrgname",false,function(html){
				var json = eval("(" + html + ")");
				var app_id = '';
				var app_name = '';
				var org_id = '';
				var org_name = '';
				
				if(json.app_name != null)
				{
					app_id = json.app_id;
					app_name = json.app_name;
				}
				if(json.org_name != null)
				{
					org_id = json.org_id;
					org_name = json.org_name;
				}
				
				var msg = getUser_msg("","","",app_id,app_name,org_name,org_id,"","","addUser('add');");
				
				bootbox.dialog({
					message: msg,
					title: "新建用户",
					className: "modal-darkorange",
	                
				});
				
			},"appid=" + choose_appid + "&parentid=" + choose_orgid);
			
        }
        
                
        function edit_user_click(userid){
            g_utils.load("/portal/web/user/getUser",false,function(html){
				//alert(html);
				var json = eval("(" + html + ")");
				if(json.code != null && json.code != undefined)
				{
					alert(json.msg);
					return;
				}
				//,,,edit_user_appid_VALUE,edit_user_appname_VALUE,edit_user_orgname_VALUE,edit_user_orgid_VALUE,edit_user_addr_VALUE,edit_user_phone_VALUE,USER_SUBMIT_VALUE
				//edit_user_appid_VALUE,edit_user_appname_VALUE,edit_user_orgname_VALUE,edit_user_orgid_VALUE,edit_user_addr_VALUE,edit_user_phone_VALUE,USER_SUBMIT_VALUE
				var msg = getUser_msg(json.username,"",json.truename,json.appid,json.appname,json.orgname,json.orgid,json.addr,json.phone,"addUser('edit','"+ json.id +"');");
				
				bootbox.dialog({
					message: msg,
					title: "编辑用户",
					className: "modal-darkorange",
	                
				});
				
			},"userid=" + userid);
        }
        
        //新建,编辑用户
        function addUser(type,userid)
        {
        
			var user_name = gt('edit_user_name').value;
			var user_pass = gt('edit_user_pass').value;
			var user_truename = gt('edit_user_truename').value;
			var user_appid = gt('edit_user_appid').value;
			var user_orgid = gt('edit_user_orgid').value;
			var user_addr = gt('edit_user_addr').value;
			var user_phone = gt('edit_user_phone').value;
			
			g_utils.load("/portal/web/user/addUser",false,function(html){
				var json = eval("(" + html + ")");
				var code = json.code;
				if(code == 1)
				{
					gt('bootbox_btn_close').click();
					getUserList(choose_appid,choose_orgid,pageid);
					alert(json.msg);
				}else{
					//失败
					alert(json.msg);
				}
				
			},"user_name=" + user_name + "&user_pass=" + user_pass + "&user_truename=" + user_truename + "&user_appid=" + user_appid + "&user_orgid="+user_orgid + "&user_addr=" + user_addr + "&user_phone=" + user_phone + "&type=" + type + "&userid=" + userid);
        }
        
        

        function delete_user_click(userid,username)
        {
			bootbox.confirm("确定删除["+ username +"]用户么??", function (result) {
                if (result) {
					g_utils.load("/portal/web/user/delUser",false,function(html){
						var json = eval("(" + html + ")");
						var code = json.code;
						if(code == 1)
						{
							getUserList(choose_appid,choose_orgid,pageid);
							alert(json.msg);
						}else{
							//失败
							alert(json.msg);
						}
					},"userid=" + userid);
                }
            });

        }
        
        function delete_org_click(orgid,orgname)
        {
			bootbox.confirm("确定删除<"+ orgname +">组织么??", function (result) {
                if (result) {
					//确认删除.
						g_utils.load("/portal/web/user/delOrg",false,function(html){
							var json = eval("(" + html + ")");
							var code = json.code;
							if(code == 1)
							{
								getOrgList();
								alert(json.msg);
							}else{
								//失败
								alert(json.msg);
							}
						},"orgid=" + orgid);
                }
            });
        }
        
        
        //新建,编辑组织结构
        function addOrg(type,orgid)
        {
			var org_name = gt('edit_org_name').value;
			var org_simplename = gt('edit_org_simple_name').value;
			var app_id = gt('edit_org_app_id').value;
			var parent_id = gt('edit_org_parent_id').value;
			var enable_expand = gt('edit_org_enableexpand').checked;
			var org_id = "";
			if(orgid != null && orgid != undefined)
			{
				org_id = orgid;
			}
			
			
			g_utils.load("/portal/web/user/addOrg",false,function(html){
				//alert(html);
				var json = eval("(" + html + ")");
				var code = json.code;
				if(code == 1)
				{
					gt('bootbox_btn_close').click();
					getOrgList();
					alert(json.msg);
				}else{
					//失败
					alert(json.msg);
				}
				
			},"org_name=" + org_name + "&org_simplename=" + org_simplename + "&app_id=" + app_id + "&parent_id=" + parent_id + "&enable_expand=" + enable_expand + "&orgid="+org_id + "&type=" + type);
        }
        
        //新建组织结构
        function new_org_click(appid,parentid){
			g_utils.load("/portal/web/user/getAppnameOrgname",false,function(html){
				var json = eval("(" + html + ")");
				var app_id = '';
				var app_name = '';
				var parent_id = '';
				var parent_name = '';
				
				
				if(json.app_name != null)
				{
					app_id = json.app_id;
					app_name = json.app_name;
				}
				if(json.org_name != null)
				{
					parent_id = json.org_id;
					parent_name = json.org_name;
				}
				
				//,,,edit_org_enableexpand_VALUE,SUBMIT_VALUE
				var msg = getOrg_msg("","",app_id,app_name,parent_id,parent_name,"","addOrg('add','');");
				//alert(msg);
				bootbox.dialog({
					message:msg,
					title: "新建组织结构",
					className: "modal-darkorange",
				});
				
			},"appid=" + appid + "&parentid=" + parentid);
        }
        
        //编辑组织结构
        function edit_org_click(orgid){
			g_utils.load("/portal/web/user/getOrg",false,function(html){
				var json = eval("(" + html + ")");
				
				if(json.code != null && json.code != undefined)
				{
					alert(json.msg);
					return;
				}
				
				if(json.id != null && json.id != undefined)
				{
				//,edit_org_parent_id_VALUE,edit_org_parent_name_VALUE,edit_org_enableexpand_VALUE,SUBMIT_VALUE
					var parentid = json.parentid;
					var parentname = json.parentname;
					if(parentid == null || parentid == undefined)
					{
						parentid = "";
						parentname = "";
					}
					var msg = getOrg_msg(json.name,json.simple_name,json.appid,json.appname,parentid,parentname,json.allow_expand,"addOrg('edit','"+ json.id +"');");
					bootbox.dialog({
						message:msg,
						title: "编辑组织结构",
						className: "modal-darkorange",
					});
				}
				
				var app_id = '';
				var app_name = '';
				var parent_id = '';
				var parent_name = '';
				
				
				if(json.app_name != null)
				{
					app_id = json.app_id;
					app_name = json.app_name;
				}
				if(json.org_name != null)
				{
					parent_id = json.org_id;
					parent_name = json.org_name;
				}
				
			},"orgid=" + orgid);
        }
        
        
        
        //递归加载组织结构树
        function loadChildOrg(json,content)
        {
			content += '	<ol class="dd-list">';

			pageid = 1;
			for(var i=0;i<json.length;i++)
			{
				var org = json[i];
				var appid = '';
				var parentid = '';
				if(org.appid == null || org.appid == '')
				{
					appid = org.id;//说明这是创建根节点
					parentid = '';
				}
				else{
					appid = org.appid;
					parentid = org.id;
				}
				content += '<li class="dd-item dd2-item" data-id="1">';
				content += '	<div class="ico-border-style dd2-handle">';
				content += '		<i class="normal-icon fa fa-android"></i>';
				content += '		<i class="drag-icon fa fa-arrows-alt "></i>';
				content += '	</div>';
				content += '	<div class="dd2-content" onclick="getUserList(\''+ appid +'\',\''+ org.id +'\',\''+ pageid +'\',this);">';
				content += '		<div style="float:left;width:40%;overflow:hidden;!important;text-overflow:ellipsis;!important">'+ org.name +'</div>';
				content += '		<div style="float:right;width:50%;text-align:right;">';
				content += '			<div class="tree-actions" onclick="event.stopPropagation();" style="font-size:1.3em;!important">';
				
				if(org.edit == 'true')
				{
					content += '		<i title="编辑组织" onclick="edit_org_click(\''+ org.id +'\');" class="fa fa-edit blizzard"></i>&nbsp;&nbsp;';
				}
				if(org.delete == 'true')
				{
					content += '		<i title="删除组织"  onclick="delete_org_click(\''+ org.id +'\',\''+ org.name +'\');" class="fa fa-trash-o danger"></i>&nbsp;&nbsp;';
				}
				if(org.new == 'true')
				{
					content += '		<i title="新建子组织" class="fa fa-plus green" onclick="new_org_click(\''+ appid +'\',\''+ parentid +'\');"></i>';
				}
				
				content += '			</div>';
				content += '		</div>';
				content += '	</div>';
				
				//要开始递归?
				var childOrg = org.orgs;
				if(childOrg != null && childOrg.length > 0)
				{
					//有子级
					content = loadChildOrg(childOrg,content);
				}
				
				content += '</li>';
			}
			
			content += '	</ol>';
			
			return content;
        }
        
        //获取组织结构树列表
        function getOrgList()
        {
			g_utils.load("/portal/web/user/getOrgList",false,function(html){
				var json = eval("(" + html + ")");
				//TODO 判错
				//var jsonStr = JSON.stringify(json.orgs);
				var orgs = json.orgs;
				if(orgs != null && orgs.length > 0)
				{
					var content = '';
					content += '<div class="dd dd-draghandle bordered">';
					content = loadChildOrg(orgs,content);
					
					content += '</div>';
					//alert(content);
					document.getElementById('org_list').innerHTML = content;
					$('.dd').nestable();
					$('.dd-handle a').on('mousedown', function (e) {
						e.stopPropagation();
					});
					
					//找到第一个,然后选中?
					
					var list = getlistpick_b();
					if(list != null && list != undefined && list.length > 0)
					{
						list[0].click();
					}
				}
				
			},"");
        }
        
        
        function loadMoveOrg(orgs,content){
        	if(orgs == null || orgs == undefined || orgs.length <=0){
        		return content;
        	}
			content += '	<ol class="dd-list">';
        	for(var i=0;i<orgs.length;i++){
        		var org = orgs[i];
				content += '	<li class="dd-item bordered-inverse" data-id="'+ org.id +'">';
				if(org.user == 'true'){
					content += '		<div class="dd-handle bg-azure no-hover" id="user_'+ i +'">'+ org.name +'</div>';					
				}else{
					content += '		<div class="dd-handle" id="org_'+ i +'">'+ org.name +'</div>';
				}
				
				
				var child = org.orgs;
				if(child != null && child != undefined && child.length > 0){
					content = loadMoveOrg(child,content);
				}
				content += '	</li>';
			}
			content += '	</ol>';
			return content;
        }
        
        function saveMoveUser(userid){
        	var r = $('.dd').nestable('serialize'); 
     		 g_utils.load("/portal/web/user/changeUserMove",false,function(html){
				var json = eval("(" + html + ")");
				
				if(json.code != null && json.code != undefined)
				{
					if(json.code == '1')
					{
						getUserList(choose_appid,choose_orgid,pageid);
						gt('bootbox_btn_close').click();
					}
					alert(json.msg);
					return;
				}
         	},"&ids=" + JSON.stringify(r) + "&appid=" + choose_appid + "&userid=" + userid);
        }
        
        function move_user_click(userid){
			var msg = '';
			g_utils.load("/portal/web/user/getMoveOrgList",false,function(html){
				var json = eval("(" + html + ")");
				if(json.code != null && json.code != undefined)
				{
					alert(json.msg);
					return;
				}
				
				var content = '';
				var orgs = json.orgs;
				if(orgs != null && orgs.length > 0)
				{
					content += '<div class="dd shadowed" id="nestable"><input id="move_content" type="hidden" value=""></input>';
					
					content = loadMoveOrg(orgs,content);
					
					content += '</div>';
					content += '<button class="btn btn-warning btn-block btn-blue" onclick="saveMoveUser(\''+ userid +'\');">提  交</button>'
					bootbox.dialog({
						message: content,
						title: "用户转移",
						className: "modal-darkorange",
					});
					
		            $('.dd').nestable();
		            $('.dd-handle a').on('mousedown', function (e) {
		                e.stopPropagation();
		            });
		            $('#nestable').nestable().on('change', function(){ 
		                 var r = $('.dd').nestable('serialize'); 
		                 $("#move_content").value = JSON.stringify(r);
		            });
		            //$('#nestable').nestable().on('change', updateOutput);
				}
				
			
			},"&appid=" + choose_appid + "&userid=" + userid)
        }
        
        
        
        function orgUpload(){
            var msg = getUpload_msg('Org');
            bootbox.dialog({
                message:msg,
                title: "上传组织结构",
                className: "modal-darkorange",
            });
            $("#iconFile").uploadifive({
                'uploadScript':'/portal/web/user/importOrg',
                'buttonText':'选择Excel上传',
                'fileObjName':'iconFile',
                'queueSizeLimit':1,
                'removeCompleted':1,
                'fileType':['xls','xlsx'],
                'formData':{'appid' : choose_appid},
                'onUploadComplete': function(file, result) {
                   //alert(file);
                   var json = eval("(" + result + ")");
                   if(json.code != null && json.code != undefined)
                    {
                        if(json.code == '1'){
                            getOrgList();
                            gt('uploadResult').value = json.msg;
                            //gt('bootbox_btn_close').click();
                        }
                        //alert('上传完成');
                        return;
                    }
                   alert(result);
                },
                'onUploadError':function(file, data){
                   alert("error:"+data);
                }
            });
        }

        function downTemplate(type){
            g_utils.load("/portal/web/user/downTemplate",false,function(html){

            },"&type=" + type);
        }

        function userUpload(){
            var msg = getUpload_msg('User');
            bootbox.dialog({
                message:msg,
                title: "上传用户",
                className: "modal-darkorange",
            });
            $("#iconFile").uploadifive({
                'uploadScript':'/portal/web/user/importUser',
                'buttonText':'选择Excel上传',
                'fileObjName':'iconFile',
                'queueSizeLimit':1,
                'removeCompleted':1,
                'fileType':['xls','xlsx'],
                'formData':{'appid' : choose_appid},
                'onUploadComplete': function(file, result) {
                   //alert(file);
                   var json = eval("(" + result + ")");
                   if(json.code != null && json.code != undefined)
                    {
                        if(json.code == '1'){
                            getUserList(choose_appid,choose_orgid,pageid);
                            gt('uploadResult').value = json.msg;
                            //gt('bootbox_btn_close').click();
                        }
                        //alert('上传完成');
                        return;
                    }
                   alert(result);
                },
                'onUploadError':function(file, data){
                   alert("error:"+data);
                }
            });
        }
        
        
        window.onload = function(){
			getOrgList();
        }