;
(function($){
	var scrollImg = {
		"scrollImgs":function (obj){
			var page;//图片总数
			var player;//定时器
			var nowpage = 0;//初始化
			var mark = false;//代表用户是否已经点击导航按钮
			
			$.ajax({
				type:"GET",
				url:obj.urls,
				dataType:'json'
			}).done(function (data){
				var len = data.res.length;
				page = len;
				var div = '<div style="height:100%;width:'+(page*100)+'%;position: relative;left: 0%;transition: all 1s;" class="div1"></div>';
				div = $(div).appendTo($(obj.dom));
				for(var i = 0;i<len;i++){
					var img  = '<img src='+data.res[i].img+' style="width:'+(100/page)+'%;height:100%;display:inline-block;">';
					div.append(img);
					(function (i){
						$(img).data('index',i+1);
					})(i)
				}
				creatnav();
			}).fail(function (){
				console.log("失败");
			});
			
			//创建导航
			function creatnav(){
				var squer = '<div style="height:20px;width:'+25*page+'px;position:absolute;left:0;right:0;margin:auto;bottom:5%"></div>'
				var ul = '<ul style = "width:100%;height:100%;"></ul>'
				ul = $(ul).appendTo($(squer).appendTo($(obj.dom)));
				for(var i = 0;i<page;i++){
					var li = '<li style ="width:10px;height:10px;margin-right:5px;cursor:pointer;border-radius:5px;display:inline-block;list-style:none;background-color:"'+obj.colcor1+'></li>'
					li = $(li).appendTo(ul);
					(function (i){
						li.data('index',i+1)
					})(i);
				}
				changeColor();
				ul.children('li').unbind('click').bind('click',function (){
						nowpage = $(this).data('index')-1;
						$(obj.dom+' .div1').css({"left":($(this).data('index')-1)*(-100)+"%"});
						mark = true;
						changeColor();
					});
				ul.children('li').hover(function (){
						ul.children('li').css({"background-color":obj.color1});
						$(this).css({"background-color":obj.color2});
						clearInterval(player);
					},function (){
						if(!mark){
							$(this).css({"background-color":obj.color1});
							changeColor();
						}
						else{
							mark = false;
						}
						plays();
					}
				);
				
				plays();//调用定时器
			}
			function plays(){
				player = setInterval(function (){
					if(nowpage*100 == (page-1)*100){
						$(obj.dom+' .div1').css({"left":"0%"});
						nowpage=0;
					}
					else{
						nowpage++;
						$(obj.dom+' .div1').css({"left":(nowpage)*(-100)+"%"});
						
					}
					changeColor();
				},3000);
			}
			
			function changeColor(){
				$(obj.dom+' li').css({"background-color":obj.color1});
				$(obj.dom+' li:nth-child('+(nowpage+1)+')').css({"background-color":obj.color2});
			}
		}
		
	}
	
	$.extend(scrollImg);
})(jQuery)
			
