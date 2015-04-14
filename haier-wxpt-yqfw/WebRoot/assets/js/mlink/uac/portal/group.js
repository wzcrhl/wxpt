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
        
        
        
var group_msg = '<div id="edit_group_msg">';
group_msg += '	<div class="row">';
group_msg += '		<div class="col-md-12">';
group_msg += '			<div class="form-group">';
group_msg += '				分组名称：';
group_msg += '				<input type="text" id="edit_group_name" name="edit_group_name" value="edit_group_name_VALUE" class="form-control" placeholder="分组名称" required="">';
group_msg += '			</div>';
group_msg += '			<div class="form-group">';
group_msg += '				<div class="clearfix">';
group_msg += '					<button class="btn btn-warning btn-block btn-blue" onclick="GROUP_SUBMIT_VALUE">提  交</button>';
group_msg += '				</div>';
group_msg += '			</div>';
group_msg += '		</div>';
group_msg += '	</div>';
group_msg += '</div>';
group_msg += '';
group_msg += '';
group_msg += '';


function getgroup_msg(edit_group_name_VALUE,GROUP_SUBMIT_VALUE)
{
	var msg = group_msg;
	//开始处理
	if(edit_group_name_VALUE != null && edit_group_name_VALUE != undefined){
		msg = msg.replace(/edit_group_name_VALUE/g,edit_group_name_VALUE);
	}
	else{
		msg = msg.replace(/edit_group_name_VALUE/g,"");
	}
	if(GROUP_SUBMIT_VALUE != null && GROUP_SUBMIT_VALUE != undefined){
		msg = msg.replace(/GROUP_SUBMIT_VALUE/g,GROUP_SUBMIT_VALUE);
	}else{
		msg = msg.replace(/GROUP_SUBMIT_VALUE/g,"");
	}
	return msg;
	
}

