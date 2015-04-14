
var org_msg = '<div id="org_msg">';
org_msg += '	<div class="row">';
org_msg += '		<div class="col-md-12">';
org_msg += '			<div class="form-group">';
org_msg += '				组织名称：<input type="text" id="edit_org_name" name="edit_org_name" value="edit_org_name_VALUE" class="form-control" placeholder="组织名称" >';
org_msg += '			</div>';
org_msg += '			<div class="form-group">';
org_msg += '				组织简称：<input type="text" id="edit_org_simple_name" value="edit_org_simple_name_VALUE" name="edit_org_simple_name" class="form-control" placeholder="组织简称" >';
org_msg += '			</div>';
org_msg += '			<div class="form-group">';
org_msg += '				业务系统：<input type="text" id="edit_org_app_id" name="edit_org_app_id" value="edit_org_app_id_VALUE" class="form-control" placeholder="Subject" required="" style="display:none">';
org_msg += '				<input type="text" id="edit_org_app_name" name="edit_org_app_name" value="edit_org_app_name_VALUE" class="form-control" readonly="readonly" placeholder="" required="">';
org_msg += '			</div>';
org_msg += '			<div class="form-group">';
org_msg += '				父级组织：<input type="text" id="edit_org_parent_id" name="edit_org_parent_id" value="edit_org_parent_id_VALUE" class="form-control" placeholder="Subject" required="" style="display:none">';
org_msg += '				<input type="text" id="edit_org_parent_name" name="edit_org_parent_name" value="edit_org_parent_name_VALUE" class="form-control" readonly="readonly" placeholder="" required="">';
org_msg += '			</div>';
org_msg += '			<div class="form-group">';
org_msg += '				是否允许创建子组织：';
org_msg += '				<label><input class="checkbox-slider colored-blue yesno" id="edit_org_enableexpand" name="edit_org_enableexpand" value="1" type="checkbox" edit_org_enableexpand_VALUE><span class="text" style="margin-top:5px;"></span></label>';
org_msg += '			</div>';
org_msg += '			<div class="form-group">';
org_msg += '				<div class="clearfix">';
org_msg += '					<button class="btn btn-warning btn-block btn-blue" onclick="ORG_SUBMIT_VALUE">提  交</button>';
org_msg += '				</div>';
org_msg += '			</div>';
org_msg += '		</div>';
org_msg += '	</div>';
org_msg += '</div>';
org_msg += '';
org_msg += '';
org_msg += '';




function listpick(obj){
	if(obj == null || obj == undefined)
	{
		return;
	}
	
	var list = getlistpick_y();
    for(var i=0;i<list.length;i++)
    {
    	list[i].className = "dd2-content";
    }
    obj.className="dd2-content bg-azure no-hover";
}

function getlistpick_y()
{
	return $(".dd2-content.bg-azure.no-hover");
}
function getlistpick_b()
{
	return $(".dd2-content");
}


function getOrg_msg(edit_org_name_VALUE,edit_org_simple_name_VALUE,edit_org_app_id_VALUE,edit_org_app_name_VALUE,edit_org_parent_id_VALUE,edit_org_parent_name_VALUE,edit_org_enableexpand_VALUE,ORG_SUBMIT_VALUE)
{
	var msg = org_msg;
	//开始处理
	if(edit_org_name_VALUE != null && edit_org_name_VALUE != undefined){
		msg = msg.replace(/edit_org_name_VALUE/g,edit_org_name_VALUE);
	}
	else{
		msg = msg.replace(/edit_org_name_VALUE/g,"");
	}
	if(edit_org_simple_name_VALUE != null && edit_org_simple_name_VALUE != undefined){
		msg = msg.replace(/edit_org_simple_name_VALUE/g,edit_org_simple_name_VALUE);
	}else{
		msg = msg.replace(/edit_org_simple_name_VALUE/g,"");
	}
	if(edit_org_app_id_VALUE != null && edit_org_app_id_VALUE != undefined){
		msg = msg.replace(/edit_org_app_id_VALUE/g,edit_org_app_id_VALUE);
	}else{
		msg = msg.replace(/edit_org_app_id_VALUE/g,"");
	}
	if(edit_org_app_name_VALUE != null && edit_org_app_name_VALUE != undefined){
		msg = msg.replace(/edit_org_app_name_VALUE/g,edit_org_app_name_VALUE);
	}else{
		msg = msg.replace(/edit_org_app_name_VALUE/g,"");
	}
	if(edit_org_parent_id_VALUE != null && edit_org_parent_id_VALUE != undefined){
		msg = msg.replace(/edit_org_parent_id_VALUE/g,edit_org_parent_id_VALUE);
	}else{
		msg = msg.replace(/edit_org_parent_id_VALUE/g,"");
	}
	if(edit_org_parent_name_VALUE != null && edit_org_parent_name_VALUE != undefined){
		msg = msg.replace(/edit_org_parent_name_VALUE/g,edit_org_parent_name_VALUE);
	}else{
		msg = msg.replace(/edit_org_parent_name_VALUE/g,"");
	}
	if(edit_org_enableexpand_VALUE != null && edit_org_enableexpand_VALUE != undefined && edit_org_enableexpand_VALUE != ''){
		if(edit_org_enableexpand_VALUE == 'true')
		{
			msg = msg.replace(/edit_org_enableexpand_VALUE/g,"checked");
		}
		else{
			msg = msg.replace(/edit_org_enableexpand_VALUE/g,"");
		}
	}else{
		msg = msg.replace(/edit_org_enableexpand_VALUE/g,"checked");
	}
	if(ORG_SUBMIT_VALUE != null && ORG_SUBMIT_VALUE != undefined){
		msg = msg.replace(/ORG_SUBMIT_VALUE/g,ORG_SUBMIT_VALUE);
	}else{
		msg = msg.replace(/ORG_SUBMIT_VALUE/g,"");
	}
	return msg;
	
}

function getUser_msg(edit_user_name_VALUE,edit_user_pass_VALUE,edit_user_truename_VALUE,edit_user_appid_VALUE,edit_user_appname_VALUE,edit_user_orgname_VALUE,edit_user_orgid_VALUE,edit_user_addr_VALUE,edit_user_phone_VALUE,USER_SUBMIT_VALUE)
{

	var msg = user_msg;
	//开始处理
	if(edit_user_name_VALUE != null && edit_user_name_VALUE != undefined){
		msg = msg.replace(/edit_user_name_VALUE/g,edit_user_name_VALUE);
	}
	else{
		msg = msg.replace(/edit_user_name_VALUE/g,"");
	}
	if(edit_user_pass_VALUE != null && edit_user_pass_VALUE != undefined){
		msg = msg.replace(/edit_user_pass_VALUE/g,edit_user_pass_VALUE);
	}else{
		msg = msg.replace(/edit_user_pass_VALUE/g,"");
	}
	if(edit_user_truename_VALUE != null && edit_user_truename_VALUE != undefined){
		msg = msg.replace(/edit_user_truename_VALUE/g,edit_user_truename_VALUE);
	}else{
		msg = msg.replace(/edit_user_truename_VALUE/g,"");
	}
	if(edit_user_appid_VALUE != null && edit_user_appid_VALUE != undefined){
		msg = msg.replace(/edit_user_appid_VALUE/g,edit_user_appid_VALUE);
	}else{
		msg = msg.replace(/edit_user_appid_VALUE/g,"");
	}
	if(edit_user_appname_VALUE != null && edit_user_appname_VALUE != undefined){
		msg = msg.replace(/edit_user_appname_VALUE/g,edit_user_appname_VALUE);
	}else{
		msg = msg.replace(/edit_user_appname_VALUE/g,"");
	}
	
	
	if(edit_user_orgname_VALUE != null && edit_user_orgname_VALUE != undefined){
		msg = msg.replace(/edit_user_orgname_VALUE/g,edit_user_orgname_VALUE);
	}else{
		msg = msg.replace(/edit_user_orgname_VALUE/g,"");
	}
	if(edit_user_orgid_VALUE != null && edit_user_orgid_VALUE != undefined){
		msg = msg.replace(/edit_user_orgid_VALUE/g,edit_user_orgid_VALUE);
	}else{
		msg = msg.replace(/edit_user_orgid_VALUE/g,"");
	}	
	if(edit_user_addr_VALUE != null && edit_user_addr_VALUE != undefined){
		msg = msg.replace(/edit_user_addr_VALUE/g,edit_user_addr_VALUE);
	}else{
		msg = msg.replace(/edit_user_addr_VALUE/g,"");
	}
	if(edit_user_phone_VALUE != null && edit_user_phone_VALUE != undefined){
		msg = msg.replace(/edit_user_phone_VALUE/g,edit_user_phone_VALUE);
	}else{
		msg = msg.replace(/edit_user_phone_VALUE/g,"");
	}	
	
	
	if(USER_SUBMIT_VALUE != null && USER_SUBMIT_VALUE != undefined){
		msg = msg.replace(/USER_SUBMIT_VALUE/g,USER_SUBMIT_VALUE);
	}else{
		msg = msg.replace(/USER_SUBMIT_VALUE/g,"");
	}
	return msg;
	
}
               
                    
//edit_org_name_VALUE,edit_org_simple_name_VALUE,edit_org_app_id_VALUE,edit_org_app_name_VALUE,edit_org_parent_id_VALUE,edit_org_parent_name_VALUE,edit_org_enableexpand_VALUE,SUBMIT_VALUE

                            
//edit_user_name_VALUE,edit_user_pass_VALUE,edit_user_truename_VALUE,edit_user_type_VALUE,edit_user_appid_VALUE,edit_user_appname_VALUE,edit_user_orgname_VALUE,edit_user_orgid_VALUE,edit_user_addr_VALUE,edit_user_phone_VALUE,USER_SUBMIT_VALUE

                                
var user_msg = '<div id="user_msg">';
user_msg += '	<div class="row">';
user_msg += '		<div class="col-md-12">';
user_msg += '			<div class="form-group">';
user_msg += '				用户名：<input type="text" id="edit_user_name" name="edit_user_name" value="edit_user_name_VALUE" class="form-control" placeholder="登录用户名" required="">';
user_msg += '			</div>';
user_msg += '			<div class="form-group">';
user_msg += '				密  码：<input type="password" id="edit_user_pass" name="edit_user_pass" value="edit_user_pass_VALUE" class="form-control" placeholder="登录密码" required="">';
user_msg += '			</div>';
user_msg += '			<div class="form-group">';
user_msg += '				真实姓名：<input type="text" id="edit_user_truename" name="edit_user_truename" value="edit_user_truename_VALUE" class="form-control" placeholder="用户真实姓名" required="">';
user_msg += '			</div>';
user_msg += '			<div class="form-group">';
user_msg += '				业务系统：<input type="text" id="edit_user_appid" name="edit_user_appid" class="form-control" value="edit_user_appid_VALUE" placeholder="Subject" required="" style="display:none"><input type="text" id="edit_user_appname" name="edit_user_appname" value="edit_user_appname_VALUE" class="form-control" readonly="readonly" placeholder="" required="">';
user_msg += '			</div>';
user_msg += '			<div class="form-group">';
user_msg += '				组织结构：<input type="text" id="edit_user_orgid" name="edit_user_orgid" class="form-control" value="edit_user_orgid_VALUE" placeholder="Subject" required="" style="display:none"><input type="text" id="edit_user_orgname" name="edit_user_orgname" value="edit_user_orgname_VALUE" class="form-control" readonly="readonly" placeholder="" required="">';
user_msg += '			</div>';
user_msg += '			<div class="form-group">';
user_msg += '				家庭住址：<input type="text" id="edit_user_addr" name="edit_user_addr" value="edit_user_addr_VALUE" class="form-control" placeholder="用户家庭地址" required="">';
user_msg += '			</div>';
user_msg += '			<div class="form-group">';
user_msg += '				联系电话：<input type="text" id="edit_user_phone" name="edit_user_phone" value="edit_user_phone_VALUE" class="form-control" placeholder="用户联系电话" required="">';
user_msg += '			</div>';
user_msg += '			<div class="form-group">';
user_msg += '				<div class="clearfix">';
user_msg += '					<button class="btn btn-warning btn-block btn-blue" onclick="USER_SUBMIT_VALUE">提  交</button>';
user_msg += '				</div>';
user_msg += '			</div>';
user_msg += '		</div>';
user_msg += '	</div>';
user_msg += '</div>';








var upload_msg = '<div>';
upload_msg += '	<div class="row">';
upload_msg += '		<div class="col-md-12">';
upload_msg += '			<div class="form-group">';
upload_msg += '				选择文件：&nbsp;&nbsp;&nbsp;<a href="/portal/web/user/downDOWN_TYPE_VALUETemplate" target="_blank">下载模板</a><input id="iconFile" name="iconFile" type="file" size="20" > ';
upload_msg += '			</div>';
upload_msg += '			<div class="form-group">';
upload_msg += '				上传结果：<textarea class="form-control" rows="10" placeholder="Content" id="uploadResult" readonly="readonly"></textarea> ';
upload_msg += '			</div>';
upload_msg += '		</div>';
upload_msg += '	</div>';
upload_msg += '</div>';

function getUpload_msg(DOWN_TYPE_VALUE)
{
	var msg = upload_msg;
	if(DOWN_TYPE_VALUE != null && DOWN_TYPE_VALUE != undefined){
		msg = msg.replace(/DOWN_TYPE_VALUE/g,DOWN_TYPE_VALUE);
	}else{
		msg = msg.replace(/DOWN_TYPE_VALUE/g,"");
	}
	return msg;
}
