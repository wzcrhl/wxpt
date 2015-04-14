
var appperm_msg = '<div id="edit_appperm_msg">';
appperm_msg += '	<div class="row">';
appperm_msg += '		<div class="col-md-12">';
appperm_msg += '			<div class="form-group">';
appperm_msg += '				业务系统名称：';
appperm_msg += '				<input type="text" id="edit_app_name" name="edit_app_name" value="edit_app_name_VALUE" class="form-control" placeholder="业务系统名称" required="">';
appperm_msg += '			</div>';
appperm_msg += '			<div class="form-group">';
appperm_msg += '				业务系统简称：';
appperm_msg += '				<input type="text" id="edit_app_sname" name="edit_app_sname" value="edit_app_sname_VALUE" class="form-control" placeholder="业务系统简称" required="">';
appperm_msg += '			</div>';
appperm_msg += '			<div class="form-group">';
appperm_msg += '				业务系统地址：';
appperm_msg += '				<input type="text" id="edit_app_addr" name="edit_app_addr" value="edit_app_addr_VALUE" class="form-control" placeholder="业务系统地址(ip:port)" required="">';
appperm_msg += '			</div>';
appperm_msg += '			<div class="form-group">';
appperm_msg += '				<div class="clearfix">';
appperm_msg += '					<button class="btn btn-warning btn-block btn-blue" onclick="APP_SUBMIT_VALUE">提  交</button>';
appperm_msg += '				</div>';
appperm_msg += '			</div>';
appperm_msg += '		</div>';
appperm_msg += '	</div>';
appperm_msg += '</div>';
appperm_msg += '';
appperm_msg += '';
appperm_msg += '';

var appperm_msg2 = '<div id="edit_appperm_msg">';
appperm_msg2 += '	<div class="row">';
appperm_msg2 += '		<div class="col-md-12">';
appperm_msg2 += '			<div class="form-group">';
appperm_msg2 += '				权限模块名称：';
appperm_msg2 += '				<input type="text" id="edit_perm_name" name="edit_perm_name" value="edit_perm_name_VALUE" class="form-control" placeholder="权限模块名称" required="">';
appperm_msg2 += '			</div>';
appperm_msg2 += '			<div class="form-group">';
appperm_msg2 += '				模块接口地址：';
appperm_msg2 += '				<input type="text" id="edit_perm_src" name="edit_perm_src" value="edit_perm_src_VALUE" class="form-control" placeholder="模块接口地址(相对路径)" required="">';
appperm_msg2 += '			</div>';
appperm_msg2 += '			<div class="form-group">';
appperm_msg2 += '				模块服务ID：';
appperm_msg2 += '				<input type="text" id="edit_perm_sid" name="edit_perm_sid" value="edit_perm_sid_VALUE" class="form-control" placeholder="模块服务ID" required="">';
appperm_msg2 += '			</div>';
appperm_msg2 += '			<div class="form-group">';
appperm_msg2 += '				<div class="clearfix">';
appperm_msg2 += '					<button class="btn btn-warning btn-block btn-blue" onclick="PERM_SUBMIT_VALUE">提  交</button>';
appperm_msg2 += '				</div>';
appperm_msg2 += '			</div>';
appperm_msg2 += '		</div>';
appperm_msg2 += '	</div>';
appperm_msg2 += '</div>';
appperm_msg2 += '';
appperm_msg2 += '';
appperm_msg2 += '';

function getappperm_msg2(edit_perm_name_VALUE,edit_perm_src_VALUE,edit_perm_sid_VALUE,PERM_SUBMIT_VALUE)
{
	var msg = appperm_msg2;
	//开始处理
	if(edit_perm_name_VALUE != null && edit_perm_name_VALUE != undefined){
		msg = msg.replace(/edit_perm_name_VALUE/g,edit_perm_name_VALUE);
	}
	else{
		msg = msg.replace(/edit_perm_name_VALUE/g,"");
	}
	if(edit_perm_src_VALUE != null && edit_perm_src_VALUE != undefined){
		msg = msg.replace(/edit_perm_src_VALUE/g,edit_perm_src_VALUE);
	}else{
		msg = msg.replace(/edit_perm_src_VALUE/g,"");
	}
	if(edit_perm_sid_VALUE != null && edit_perm_sid_VALUE != undefined){
		msg = msg.replace(/edit_perm_sid_VALUE/g,edit_perm_sid_VALUE);
	}else{
		msg = msg.replace(/edit_perm_sid_VALUE/g,"");
	}
	if(PERM_SUBMIT_VALUE != null && PERM_SUBMIT_VALUE != undefined){
		msg = msg.replace(/PERM_SUBMIT_VALUE/g,PERM_SUBMIT_VALUE);
	}else{
		msg = msg.replace(/PERM_SUBMIT_VALUE/g,"");
	}
	
	return msg;
	
}
                                                
function getappperm_msg(edit_app_name_VALUE,edit_app_addr_VALUE,APP_SUBMIT_VALUE,edit_app_sname_VALUE)
{
	var msg = appperm_msg;
	//开始处理
	if(edit_app_name_VALUE != null && edit_app_name_VALUE != undefined){
		msg = msg.replace(/edit_app_name_VALUE/g,edit_app_name_VALUE);
	}
	else{
		msg = msg.replace(/edit_app_name_VALUE/g,"");
	}
	if(edit_app_addr_VALUE != null && edit_app_addr_VALUE != undefined){
		msg = msg.replace(/edit_app_addr_VALUE/g,edit_app_addr_VALUE);
	}else{
		msg = msg.replace(/edit_app_addr_VALUE/g,"");
	}
	if(edit_app_sname_VALUE != null && edit_app_sname_VALUE != undefined){
		msg = msg.replace(/edit_app_sname_VALUE/g,edit_app_sname_VALUE);
	}else{
		msg = msg.replace(/edit_app_sname_VALUE/g,"");
	}
	if(APP_SUBMIT_VALUE != null && APP_SUBMIT_VALUE != undefined){
		msg = msg.replace(/APP_SUBMIT_VALUE/g,APP_SUBMIT_VALUE);
	}else{
		msg = msg.replace(/APP_SUBMIT_VALUE/g,"");
	}
	
	return msg;
	
}
