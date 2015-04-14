
var bind_msg = '<div id="edit_bind_msg">';
bind_msg += '	<div class="row">';
bind_msg += '		<div class="col-md-12">';
bind_msg += '			<div class="form-group">';
bind_msg += '				业务系统：<input type="text" id="edit_bind_appid" name="edit_bind_appid" value="edit_bind_appid_VALUE" class="form-control" placeholder="Subject" required="" style="display:none">';
bind_msg += '					<input type="text" id="edit_bind_appname" name="edit_bind_appname" value="edit_bind_appname_VALUE" class="form-control" placeholder="业务系统" readonly="readonly" >';
bind_msg += '			</div>';
bind_msg += '			<div class="form-group">';
bind_msg += '				绑定用户名：<input type="text" id="edit_bind_userid" name="edit_bind_userid" value="edit_bind_userid_VALUE" class="form-control" placeholder="Subject" required="" style="display:none">';
bind_msg += '					<input type="text" id="edit_bind_username" value="edit_bind_username_VALUE" name="edit_bind_username" class="form-control" readonly="readonly" placeholder="绑定用户名" >';
bind_msg += '			</div>';
bind_msg += '			<div class="form-group">';
bind_msg += '				设备名称：';
bind_msg += '				<input type="text" id="edit_bind_devicename" name="edit_bind_devicename" value="edit_bind_devicename_VALUE" class="form-control" placeholder="" required="">';
bind_msg += '			</div>';
bind_msg += '			<div class="form-group">';
bind_msg += '				设备唯一标识：';
bind_msg += '				<input type="text" id="edit_bind_deviceid" name="edit_bind_deviceid" value="edit_bind_deviceid_VALUE" class="form-control" placeholder="" required="">';
bind_msg += '			</div>';
bind_msg += '			<div class="form-group">';
bind_msg += '				是否启用该设备：';
bind_msg += '				<div class="radio"><label><input id="edit_bind_enabledevice_y" name="edit_bind_enabledevice" value="1" type="radio" edit_bind_enabledevice_y_VALUE><span class="text">启用</span></label></div>';
bind_msg += '				<div class="radio"><label><input id="edit_bind_enabledevice_n" name="edit_bind_enabledevice" value="0" type="radio" edit_bind_enabledevice_n_VALUE><span class="text">禁用</span></label></div>';
bind_msg += '			</div>';
bind_msg += '			<div class="form-group">';
bind_msg += '				是否绑定该设备：';
bind_msg += '				<div class="radio"><label><input id="edit_bind_binddevice_y" name="edit_bind_binddevice" value="1" type="radio" edit_bind_binddevice_y_VALUE><span class="text">绑定</span></label></div>';
bind_msg += '				<div class="radio"><label><input id="edit_bind_binddevice_n" name="edit_bind_binddevice" value="0" type="radio" edit_bind_binddevice_n_VALUE><span class="text">不绑定</span></label></div>';
bind_msg += '			</div>';
bind_msg += '			<div class="form-group">';
bind_msg += '				<div class="clearfix">';
bind_msg += '					<button class="btn btn-warning btn-block btn-blue" onclick="BIND_SUBMIT_VALUE">提  交</button>';
bind_msg += '				</div>';
bind_msg += '			</div>';
bind_msg += '		</div>';
bind_msg += '	</div>';
bind_msg += '</div>';
bind_msg += '';
bind_msg += '';
bind_msg += '';

                                                
function getBind_msg(edit_bind_appid_VALUE,edit_bind_appname_VALUE,edit_bind_userid_VALUE,edit_bind_username_VALUE,edit_bind_devicename_VALUE,edit_bind_deviceid_VALUE,
				edit_bind_enabledevice_VALUE,edit_bind_binddevice_VALUE,BIND_SUBMIT_VALUE)
{
	var msg = bind_msg;
	//开始处理
	if(edit_bind_appid_VALUE != null && edit_bind_appid_VALUE != undefined){
		msg = msg.replace(/edit_bind_appid_VALUE/g,edit_bind_appid_VALUE);
	}
	else{
		msg = msg.replace(/edit_bind_appid_VALUE/g,"");
	}
	if(edit_bind_appname_VALUE != null && edit_bind_appname_VALUE != undefined){
		msg = msg.replace(/edit_bind_appname_VALUE/g,edit_bind_appname_VALUE);
	}else{
		msg = msg.replace(/edit_bind_appname_VALUE/g,"");
	}
	if(edit_bind_userid_VALUE != null && edit_bind_userid_VALUE != undefined){
		msg = msg.replace(/edit_bind_userid_VALUE/g,edit_bind_userid_VALUE);
	}else{
		msg = msg.replace(/edit_bind_userid_VALUE/g,"");
	}
	if(edit_bind_username_VALUE != null && edit_bind_username_VALUE != undefined){
		msg = msg.replace(/edit_bind_username_VALUE/g,edit_bind_username_VALUE);
	}else{
		msg = msg.replace(/edit_bind_username_VALUE/g,"");
	}
	if(edit_bind_devicename_VALUE != null && edit_bind_devicename_VALUE != undefined){
		msg = msg.replace(/edit_bind_devicename_VALUE/g,edit_bind_devicename_VALUE);
	}else{
		msg = msg.replace(/edit_bind_devicename_VALUE/g,"");
	}
	if(edit_bind_deviceid_VALUE != null && edit_bind_deviceid_VALUE != undefined){
		msg = msg.replace(/edit_bind_deviceid_VALUE/g,edit_bind_deviceid_VALUE);
	}else{
		msg = msg.replace(/edit_bind_deviceid_VALUE/g,"");
	}
	
	
	
	if(edit_bind_enabledevice_VALUE != null && edit_bind_enabledevice_VALUE != undefined){
		if(edit_bind_enabledevice_VALUE == '已禁用')
		{
			msg = msg.replace(/edit_bind_enabledevice_y_VALUE/g,"");
			msg = msg.replace(/edit_bind_enabledevice_n_VALUE/g,"checked=\"checked\"");
		}
		else{
			msg = msg.replace(/edit_bind_enabledevice_y_VALUE/g,"checked=\"checked\"");
			msg = msg.replace(/edit_bind_enabledevice_n_VALUE/g,"");
		}
	}else{
		msg = msg.replace(/edit_bind_enabledevice_y_VALUE/g,"checked=\"checked\"");
		msg = msg.replace(/edit_bind_enabledevice_n_VALUE/g,"");
	}
	
	if(edit_bind_binddevice_VALUE != null && edit_bind_binddevice_VALUE != undefined){
		if(edit_bind_binddevice_VALUE == '已绑定')
		{
			msg = msg.replace(/edit_bind_binddevice_y_VALUE/g,"checked=\"checked\"");
			msg = msg.replace(/edit_bind_binddevice_n_VALUE/g,"");
		}
		else{
			msg = msg.replace(/edit_bind_binddevice_y_VALUE/g,"");
			msg = msg.replace(/edit_bind_binddevice_n_VALUE/g,"checked=\"checked\"");
		}
	}else{
		msg = msg.replace(/edit_bind_binddevice_y_VALUE/g,"");
		msg = msg.replace(/edit_bind_binddevice_n_VALUE/g,"checked=\"checked\"");
	}
	
	
	if(BIND_SUBMIT_VALUE != null && BIND_SUBMIT_VALUE != undefined){
		msg = msg.replace(/BIND_SUBMIT_VALUE/g,BIND_SUBMIT_VALUE);
	}else{
		msg = msg.replace(/BIND_SUBMIT_VALUE/g,"");
	}
	return msg;
	
}
