		window.onload = function(){
			if(userid != null && userid != '')
			{
				gt('user_bind_add').style.display = "";
				g_utils.load("/portal/web/deviceBind/getUserInfo",false,function(html){
					//alert(html);
					var json = eval("(" + html + ")");
					if(json.code != null && json.code != undefined)
					{
						alert(json.msg);
						return;
					}
					gt('bind_appname').value = json.appname;
					gt('bind_username').value = json.username;
					
				},"&userid="+ userid +"&appid=" + appid);
			}
			else{
				gt('user_bind_add').style.display = "none";
			}
			
			
			//加载
			getBindList(pageid);
        }
        
        var pageid = 1;
        
        function changeStatus(id,type,index)
        {
			g_utils.load("/portal/web/deviceBind/changeDeviceStatus",false,function(html){
				var json = eval("(" + html + ")");
				var code = json.code;
				if(code == 1)
				{
					getBindList(pageid);
					//alert(json.msg);
				}else{
					//失败
					alert(json.msg);
				}
			},"bindid=" + id + "&index=" + index + "&type=" + type);
        }
        
        function getBindList(pageid_)
        {
			pageid = pageid_;
			g_utils.load("/portal/web/deviceBind/getBindList",false,function(html){
				var json = eval("(" + html + ")");
				if(json.code != null && json.code != undefined)
				{
					alert(json.msg);
					return;
				}
				
				var content = "";
				
				var binds = json.binds;
				var content = "";
				if(binds != null && binds != undefined && binds.length > 0)
				{
					for(var i=0;i<binds.length;i++)
					{
						var bind  = binds[i];
						if(bind != null && bind != undefined && bind.id != null)
						{
							//开始拼
							content += '<tr>';
							content += '	<td>'+ bind.appname +'</td>';
							content += '	<td>'+ bind.username +'</td>';
							content += '	<td>'+ bind.device_name +'</td>';
							content += '	<td>'+ bind.device_id +'</td>';
							content += '	<td>'+ bind.device_status +'</td>';
							content += '	<td>'+ bind.bind_status +'</td>';
							content += '	<td>';
							
							var devicestatus = bind.device_status == '已启用'?"禁用":"启用";
							var bindstatus = bind.bind_status == '未绑定'?"绑定":"解除绑定";
							
							var devicestatus_index = bind.device_status == '已启用'?"0":"1";
							var bindstatus_index = bind.bind_status == '未绑定'?"1":"0";
							
							var jsonStr = JSON.stringify(bind);
							jsonStr = jsonStr.replace(/\"/g,"&quot;");
							content += '		<a class="btn btn-success btn-xs edit" onclick="changeStatus(\''+ bind.id +'\',\'0\','+ devicestatus_index +');"><i class="fa fa-edit"></i> '+ devicestatus +'</a>';
							content += '		<a class="btn btn-info btn-xs edit" onclick="editBind_click(\''+ jsonStr +'\')"><i class="fa fa-edit"></i> 编辑</a>';
							content += '		<a class="btn btn-info btn-xs edit" onclick="changeStatus(\''+ bind.id +'\',\'1\','+ bindstatus_index +');"><i class="fa fa-edit"></i> '+ bindstatus +'</a>';
							content += '		<a class="btn btn-danger btn-xs delete" onclick="delBind(\''+ bind.id +'\',\''+ bind.device_name +'\')"><i class="fa fa-trash-o"></i> 删除</a>';
							content += '	</td>';
							content += '</tr>';
						}
					}
				}
				
				gt('user_bind_list').innerHTML = content;
				
				var pageContent = '共'+ json.total_count +'条数据,共'+ json.total_page +'页&nbsp;<ul class="pagination">';
				pageid = json.pageid;
				if(pageid == 1){
					pageContent += '<li class="prev disabled"><a href="#">首页</a></li>';
				}
				else{
					pageContent += '<li class="prev"><a onclick="getBindList(1);">首页</a></li>';
				}
				
				
				for(var i=1;i<=json.total_page;i++)
				{
					if(i == pageid){
						pageContent += '<li class="active"><a href="#">'+ i +'</a></li>';
					}else{
						pageContent += '<li><a onclick="getBindList('+ i +');">'+ i +'</a></li>';
					}
				}
				if(pageid == json.total_page){
					pageContent += '<li class="prev disabled"><a href="#">尾页</a></li></ul>';
				}else{
					pageContent += '<li class="prev" onclick="getBindList('+ json.total_page +');"><a>尾页</a></li></ul>';
				}
				
				gt('user_page').innerHTML = pageContent;
				
				
			},"&appid="+appid+"&userid="+userid + "&pageid=" + pageid);
        }
        
        function delBind(bindid,devicename)
        {
			bootbox.confirm("确定删除["+ devicename +"]设备么?", function (result) {
                if (result) {
					//确认删除.
						g_utils.load("/portal/web/deviceBind/delBind",false,function(html){
							var json = eval("(" + html + ")");
							var code = json.code;
							if(code == 1)
							{
								getBindList(pageid);
								alert(json.msg);
							}else{
								//失败
								alert(json.msg);
							}
						},"bindid=" + bindid);
                }
            });
        }
        
        function addBind(){
			g_utils.load("/portal/web/deviceBind/addBind",false,function(html){
				var json = eval("(" + html + ")");
				var code = json.code;
				if(code == 1)
				{
					gt('bind_devicename').value = "";
					gt('bind_deviceid').value = '';
					getBindList(pageid);
					alert(json.msg);
				}else{
					//失败
					alert(json.msg);
				}
				
			},"&appid="+appid+"&userid="+userid+"&devicename="+gt('bind_devicename').value+"&deviceid="+gt('bind_deviceid').value + "&type=add");
        }
        
        
        function editBind_click(bind)
        {
			bind = bind.replace(/&quot;/g,"\"");
			var json = JSON.parse(bind);
			
			var msg = getBind_msg(json.appid,json.appname,json.userid,json.username,json.device_name,json.device_id,json.device_status,json.bind_status,"editBind('"+ json.id +"')");
			bootbox.dialog({
				message:msg,
				title: "编辑设备",
				className: "modal-darkorange",
			});
        }
        
        
        function editBind(id)
        {
			var appid = gt('edit_bind_appid').value;
			var userid = gt('edit_bind_userid').value;
			var devicename = gt('edit_bind_devicename').value;
			var deviceid = gt('edit_bind_deviceid').value;
			var devicestatus = gt_radio('edit_bind_enabledevice').value;
			var bindstatus = gt_radio('edit_bind_binddevice').value;
        
			g_utils.load("/portal/web/deviceBind/addBind",false,function(html){
				var json = eval("(" + html + ")");
				var code = json.code;
				if(code == 1)
				{
					gt('bootbox_btn_close').click();
					getBindList(pageid);
					alert(json.msg);
				}else{
					//失败
					alert(json.msg);
				}
				
			},"&id="+ id +"&appid="+appid+"&userid="+userid+"&devicename="+ devicename +"&deviceid="+ deviceid + "&devicestatus=" + devicestatus + "&bindstatus=" + bindstatus + "&type=edit");
        }