

        function choose_list(obj)
        {
            var list = $(".app_none.bg-azure");
            for(var i=0;i<list.length;i++)
            {
                list[i].className = "app_none";
            }
            obj.className="app_none bg-azure";
        }
        
        function msgClose()
        {
            //alert('123');
        }

        var appid = '';
        var appname = '';

        function getPermList(app_id,app_name){
            appid = app_id;
            appname = app_name;
            gt('perm_appname_show').innerText = appname;
            g_utils.load("/portal/web/app/getPermList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    alert(json.msg);
                    return;
                }

                //开始拼列表
                var content = '';

                var perms = json.perms;
                if(perms == null || perms == undefined)
                {
                    return;
                }
                for(var i=0;i<perms.length;i++){
                    var perm = perms[i];
                    if(perm == null || perm == undefined){
                        continue;
                    }

                    content += '<tr>';
                    content += '    <td>'+ perm.name +'</td>';
                    content += '    <td>'+ perm.src +'</td>';
                    content += '    <td>'+ perm.sid +'</td>';
                    content += '    <td>';
                    content += '        <a onclick="edit_perm_click(\''+ perm.name +'\',\''+ perm.src +'\',\''+ perm.sid +'\',\''+ perm.id +'\');" class="btn btn-info btn-xs edit"><i class="fa fa-edit"></i> 编辑</a>';
                    content += '        <a onclick="deletePerm(\''+ perm.id +'\',\''+ perm.name +'\')" class="btn btn-danger btn-xs delete"><i class="fa fa-edit"></i> 删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                }
                gt('perm_table').innerHTML = content;

            },"&appid=" + app_id);
        }


        function getAppList(){
            g_utils.load("/portal/web/app/getAppList",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(json.code != null && json.code != undefined)
                {
                    alert(json.msg);
                    return;
                }

                //开始拼列表
                var content = '';

                var apps = json.apps;
                if(apps == null || apps == undefined)
                {
                    return;
                }
                for(var i=0;i<apps.length;i++){
                    var app = apps[i];
                    if(app == null || app == undefined){
                        continue;
                    }

                    content += '<tr onclick="choose_list(this);getPermList(\''+ app.id +'\',\''+ app.name +'\');" class="app_none">';
                    content += '    <td>'+ app.name +'</td>';
                    content += '    <td>'+ app.sname +'</td>';
                    content += '    <td>'+ app.addr +'</td>';
                    content += '    <td>';
                    content += '        <a onclick="event.stopPropagation();edit_app_click(\''+ app.name +'\',\''+ app.addr +'\',\''+ app.id +'\',\''+ app.sname +'\');" class="btn btn-info btn-xs edit"><i class="fa fa-edit"></i> 编辑</a>';
                    content += '        <a onclick="event.stopPropagation();deleteApp(\''+ app.id +'\',\''+ app.name +'\')" class="btn btn-danger btn-xs delete"><i class="fa fa-edit"></i> 删除</a>';
                    content += '    </td>';
                    content += '</tr>';
                }
                gt('app_table').innerHTML = content;

                var listClick = $(".app_none");
                if(listClick != null && listClick != undefined && listClick.length > 0)
                {
                    listClick[0].click();
                }

            },"");
        }

        function addPerm(type,permid){
            var name = "";
            var src = "";
            var sid = "";
            if(type == 'add')
            {
                name = gt('perm_name').value;
                src = gt('perm_src').value;
                sid = gt('perm_sid').value;
            }else if(type =='edit'){
                name = gt('edit_perm_name').value;
                src = gt('edit_perm_src').value;
                sid = gt('edit_perm_sid').value;
            }
            
            g_utils.load("/portal/web/app/addPerm",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getPermList(appid,appname);
                    if(type == 'add')
                    {
                        gt('perm_name').value = '';
                        gt('perm_src').value = '';
                        gt('perm_sid').value = '';
                    }else if(type =='edit'){
                        gt('bootbox_btn_close').click();
                    }
                    
                }
                alert(json.msg);

            },"&permname=" + name + "&permsrc=" + src + "&type=" + type + "&permid=" + permid + "&appid=" + appid + "&sid=" + sid);

        }
        
        function addApp(type,appid){
            var name = "";
            var addr = "";
            var sname = "";
            if(type == 'add')
            {
                name = gt('app_name').value;
                addr = gt('app_addr').value;
                sname = gt('app_simple_name').value;
            }else if(type =='edit'){
                name = gt('edit_app_name').value;
                addr = gt('edit_app_addr').value;   
                sname = gt('edit_app_sname').value; 
            }
            
            g_utils.load("/portal/web/app/addApp",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getAppList();
                    if(type == 'add')
                    {
                        gt('app_name').value = '';
                        gt('app_addr').value = '';
                        gt('app_simple_name').value = '';
                    }else if(type =='edit'){
                        gt('bootbox_btn_close').click();
                    }
                    
                }
                alert(json.msg);

            },"&appname=" + name + "&appaddr=" + addr + "&type=" + type + "&appid=" + appid + "&appsname=" + sname);

        }

        function deletePerm(permid,permname)
        {
            bootbox.confirm("确定删除["+ permname +"]权限么?", function (result) {
                if (result) {
                    //确认删除.
                    g_utils.load("/portal/web/app/delPerm",false,function(html){
                        var json = eval("(" + html + ")");
                        var code = json.code;
                        if(code == 1)
                        {
                            getPermList(appid,appname);
                        }
                        alert(json.msg);
                    },"permid=" + permid);
                }
            });
        }

        function deleteApp(appid,appname)
        {
            bootbox.confirm("确定删除["+ appname +"]业务系统么?", function (result) {
                if (result) {
                    //确认删除.
                    g_utils.load("/portal/web/app/delApp",false,function(html){
                        var json = eval("(" + html + ")");
                        var code = json.code;
                        if(code == 1)
                        {
                            getAppList();
                        }
                        alert(json.msg);
                    },"appid=" + appid);
                }
            });
        }
        
        function edit_app_click(appname,appaddr,appid,appsname){
            //需要拼编辑界面....

            var msg = getappperm_msg(appname,appaddr,"addApp('edit','"+ appid +"')",appsname);
             bootbox.dialog({
                message: msg,
                title: "编辑业务系统",
                className: "modal-darkorange",
                
            });
        }

        function edit_perm_click(permname,permsrc,permsid,permid){
            //需要拼编辑界面....

            var msg = getappperm_msg2(permname,permsrc,permsid,"addPerm('edit','"+ permid +"')");
             bootbox.dialog({
                message: msg,
                title: "编辑业务权限模块",
                className: "modal-darkorange",
                
            });
        }

        window.onload = function(){
            getAppList();
        }
