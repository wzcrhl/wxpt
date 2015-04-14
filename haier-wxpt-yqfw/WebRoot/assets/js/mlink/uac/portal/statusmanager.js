
        var pageid = 1;
        
        window.onload = function(){
            //加载
            getStatusList(pageid);
        }
        
        function getStatusList(pageid_)
        {
            pageid = pageid_;
            g_utils.load("/portal/web/userStatus/getStatusList",false,function(html){
                var json = eval("(" + html + ")");
                if(json.code != null && json.code != undefined)
                {
                    alert(json.msg);
                    return;
                }
                
                var content = "";
                
                var list = json.list;
                var content = "";
                if(list != null && list != undefined && list.length > 0)
                {
                    for(var i=0;i<list.length;i++)
                    {
                        var status  = list[i];
                        if(status != null && status != undefined && status.id != null)
                        {
                            //开始拼
                            content += '<tr>';
                            content += '    <td>'+ status.appname +'</td>';
                            content += '    <td>'+ status.username +'</td>';
                            content += '    <td>'+ status.deviceid +'</td>';
                            content += '    <td>'+ status.token +'</td>';
                            content += '    <td>'+ status.expire +'</td>';
                            content += '    <td>'+ status.state +'</td>';
                            content += '    <td>';
                            
                            var showText = status.state == '有效'?"禁用":"启用";
                            
                            var showIndex = status.state == '有效'?"0":"1";
                            
                            content += '        <a class="btn btn-success btn-xs edit" onclick="changeStatusState(\''+ status.id +'\','+ showIndex +');"><i class="fa fa-edit"></i> '+ showText +'</a>';
                            content += '        <a class="btn btn-danger btn-xs delete" onclick="delStatus(\''+ status.id +'\',\''+ status.username +'\')"><i class="fa fa-trash-o"></i> 删除</a>';
                            content += '    </td>';
                            content += '</tr>';
                        }
                    }
                }
                
                gt('user_status_list').innerHTML = content;
                var pageContent = '共'+ json.total_count +'条数据,共'+ json.total_page +'页&nbsp;<ul class="pagination">';
                pageid = json.pageid;
                if(pageid == 1){
                    pageContent += '<li class="prev disabled"><a href="#">首页</a></li>';
                }
                else{
                    pageContent += '<li class="prev"><a onclick="getStatusList(1);">首页</a></li>';
                }
                
                for(var i=1;i<=json.total_page;i++)
                {
                    if(i == pageid){
                        pageContent += '<li class="active"><a href="#">'+ i +'</a></li>';
                    }else{
                        pageContent += '<li><a onclick="getStatusList('+ i +');">'+ i +'</a></li>';
                    }
                }
                if(pageid >= json.total_page){
                    pageContent += '<li class="prev disabled"><a href="#">尾页</a></li></ul>';
                }else{
                    pageContent += '<li class="prev" onclick="getStatusList('+ json.total_page +');"><a>尾页</a></li></ul>';
                }
                
                gt('status_page').innerHTML = pageContent;
                
                
            },"&pageid=" + pageid);
        }

        function changeStatusState(id,index)
        {
            g_utils.load("/portal/web/userStatus/changeState",false,function(html){
                var json = eval("(" + html + ")");
                var code = json.code;
                if(code == 1)
                {
                    getStatusList(pageid);
                    //alert(json.msg);
                }else{
                    //失败
                    alert(json.msg);
                }
            },"statusid=" + id + "&index=" + index );
        }
        
        function delStatus(statusid,username)
        {
            bootbox.confirm("确定删除["+ username +"]用户状态么?", function (result) {
                if (result) {
                    //确认删除.
                        g_utils.load("/portal/web/userStatus/delStatus",false,function(html){
                            var json = eval("(" + html + ")");
                            var code = json.code;
                            if(code == 1)
                            {
                                getStatusList(pageid);
                                alert(json.msg);
                            }else{
                                //失败
                                alert(json.msg);
                            }
                        },"statusid=" + statusid);
                }
            });
        }