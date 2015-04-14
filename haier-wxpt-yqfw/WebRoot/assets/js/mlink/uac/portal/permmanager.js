
        var app_id = '';
        var perm_name = '';
        var perm_id = '';

        function saveOrgList(){
            if(perm_id == '')
            {
                alert('请选择权限模块!');
                return;
            }
            var orgs = document.getElementsByName('orgs');
            if(orgs == null || orgs.length <=0){
                alert('提交失败!');
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
            g_utils.load("/portal/web/perm/saveOrgPerm",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getOrgList(perm_id,app_id,perm_name);
                    alert(json.msg);
                }else{
                    //失败
                    alert(json.msg);
                }
            },"&checkid=" + params + "&appid=" + app_id + "&permid=" + perm_id);

        }


        function getOrgList(permid,appid,permname){
            gt('org_perm_list').innerHTML = '';
            gt('org_permname_show').innerText = permname;
            g_utils.load("/portal/web/perm/getPermOrgList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    return;
                }
                app_id = appid;
                perm_id = permid;
                perm_name = permname;

                //开始拼列表
                var content = '<div class="dd dd-draghandle bordered">';
                var orgs = json.orgs;
                if(orgs == null || orgs == undefined)
                {
                    return;
                }
                content += showOrgList(orgs,'check');

                content += '</div>';
                gt('org_perm_list').innerHTML = content;


                $('.dd').nestable();
                $('.dd-handle a').on('mousedown', function (e) {
                    e.stopPropagation();
                }); 
            },"&permid=" + permid + "&appid=" + appid);

            getExceptUser(permid,appid,permname);
        }

        function getExceptUser(permid,appid,permname){
            gt('exceptuser_list').innerHTML = '';
            gt('exceptuser_permname_show').innerText = perm_name;
             g_utils.load("/portal/web/perm/getExceptUser",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    return;
                }


                //开始拼列表
                var content = '';
                var users = json.users;
                if(users == null || users == undefined && users.length <= 0)
                {
                    return;
                }

                for(var i=0;i<users.length;i++){
                    var user = users[i];
                    if(user == null || user == undefined){
                        continue;
                    }

                    var showText = '';
                    var showText2 = '';
                    var showId = '';
                    if(user.status == '0'){
                        //当前不可用.
                        showText = "可用";
                        showText2 = "不可用";
                        showId = '1';
                    }else{
                        showText = "不可用";
                        showText2 = "可用";
                        showId = '0';
                    }
                    content += '<tr>';
                    content += '    <td>'+ user.name +'</td>';
                    content += '    <td>'+ user.orgname +'</td>';
                    content += '    <td>'+ showText2 +'</td>';
                    content += '    <td>';

                    content += '        <a class="btn btn-info btn-xs edit" onclick="authExceptUser(\''+ user.userid +'\',\''+ showId +'\',\''+ user.id +'\');"><i class="fa fa-edit"></i> '+ showText +'</a>';
                    content += '        <a class="btn btn-danger btn-xs delete" onclick="deleteExceptUser(\''+ user.userid +'\',\''+ user.id +'\',\''+ user.name +'\');"><i class="fa fa-edit"></i> 删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                }
                gt('exceptuser_list').innerHTML = content;


                //还要分页

            },"&permid=" + permid + "&appid=" + appid);
        }

        function authExceptUser(userid,userstatus,permid){
            g_utils.load("/portal/web/perm/authExceptUser",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getExceptUser(perm_id,app_id,perm_name);
                }else{
                    alert(json.msg);
                }
            },"userstatus=" + userstatus + "&userid=" + userid + "&permid=" + permid);
        }

        function deleteExceptUser(userid,permid,username)
        {
            bootbox.confirm("确定删除["+ username +"]用户例外么?", function (result) {
                if (result) {
                    //确认删除.
                    g_utils.load("/portal/web/perm/deleteExceptUser",false,function(html){
                        var json = eval("(" + html + ")");
                        var code = json.code;
                        if(code == 1)
                        {
                            getExceptUser(perm_id,app_id,perm_name);
                        }
                        alert(json.msg);
                    },"permid=" + permid + "&userid=" + userid);
                }
            });
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
                content += '        <div class="checkbox org_checkbox_mg"><label>';
                
                if(org.isOrg == 'true'){
					if(org.checked == 'true'){
	                    content += '<input type="checkbox" class="inverted" onclick="changecheck(this);" checked name="orgs" value="'+ org.id +'" id="'+ checkId +'"><span class="text"></span>';
	                }else{
	                    content += '<input type="checkbox" class="inverted" onclick="changecheck(this);" name="orgs" value="'+ org.id +'" id="'+ checkId +'"><span class="text"></span>';
	                }                
                }
                
                
                content += '        </label></div>';
                content += '    </div>';
                
                content += '    <div class="dd2-content">'+ org.name +'</div>';
                
                index ++;

                var childs = org.orgs;
                if(childs != null && childs != undefined && childs.length > 0)
                {
                    content += showOrgList(childs,checkId);
                }
                //加载子级.
                //content += getPermList(perm.id,perm.name);

                content += '</li>';

            }
            content += '</ol>';
            return content;

        }



        function getAppList(){
            //先获取应用列表,作为根节点;
            //然后根据appid获取权限列表,没有递归.app_perm_list
            g_utils.load("/portal/web/perm/showPermList",false,function(html){
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
                content += showPermList(perms);

                content += '</div>';
                gt('app_perm_list').innerHTML = content;


                $('.dd').nestable();
                $('.dd-handle a').on('mousedown', function (e) {
                    e.stopPropagation();
                });

                var listClick = $(".perm-none.dd2-content");
                if(listClick != null && listClick != undefined && listClick.length > 0)
                {
                    listClick[0].click();
                }

            },"");
        }

        function showPermList(perms){
            var content = '<ol class="dd-list">';
            for(var i=0;i<perms.length;i++){
                var perm = perms[i];
                if(perm == null || perm == undefined){
                    continue;
                }

                content += '<li class="dd-item dd2-item" data-id="1">';
                if(perm.click == 'true'){
                    content += '    <div class="ico-border-style-active dd2-handle">';
                }else{
                    content += '    <div class="ico-border-style dd2-handle">';
                }
                
                content += '        <i class="normal-icon fa fa-android"></i><i class="drag-icon fa fa-arrows-alt "></i>';
                content += '    </div>';
                if(perm.click == 'true'){
                    content += '    <div class="perm-none dd2-content" onclick="listpick(this);getOrgList(\''+ perm.id +'\',\''+ perm.appid +'\',\''+ perm.name +'\');">'+ perm.name +'</div>';
                }else{
                    content += '    <div class="dd2-content">'+ perm.name +'</div>';
                }
                

                var childs = perm.perms;
                if(childs != null && childs != undefined && childs.length > 0)
                {
                    content += showPermList(childs);
                }
                //加载子级.
                //content += getPermList(perm.id,perm.name);

                content += '</li>';

            }
            content += '</ol>';
            return content;
        }


        window.onload = function(){
            getAppList();
        }