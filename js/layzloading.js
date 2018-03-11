;
(function($){
	
	const layzLod = {
		"layzLoadings" : function (obj){
			//寻找元素
			var attrName = obj.attrName;
			var set = obj.attrSet;
			let doms = $('['+attrName+']');
			let ary = [];//定义空数组保存节点
			for(var i =0 ;i < doms.length ;i++){
				ary.push(doms[i]);
			}
			
			
			randerImg();
			
			//添加页面滚动事件
			$(obj.dom).bind('scroll',function (){
				if(ary.length==0){
					$(obj.dom).unbind("scroll");
				}
				//函数截流
				clearTimeout(setTime);
				var setTime = setTimeout(function (){
					randerImg();
				},50);
				
			});
			
			
			function randerImg(){//渲染图片
				
				for(var i = 0 ; i < ary.length ; i++){
					if(jugeView(ary[i])){
						if(set=='backgroundImage'){
							ary[i].style.backgroundImage = "url("+ary[i].getAttribute(attrName)+")";
						}
						else if(set =="src"){
							ary[i].src= ary[i].getAttribute(attrName);
						}
						ary.splice(i,1);
						i--;
					}
					else{
						return;
					}
				}
				
			}
			
			
			//判断是否在可视范围
			function jugeView(dom){
				
				//获取可视区域高度
				var viewHeight = $(window).height();
				
				//获取滚动条高度
				var scrollBar = $(window).scrollTop();
				
				//获取元素距离文档顶部高度
				var pageHeight = $(dom).offset().top;
				
				if(pageHeight - scrollBar <= viewHeight){
					return true;//在可视范围为
				}
				else{
					return false;	//不在可视范围
				}
				
			}
		}
		
	}
	 $.extend(layzLod);
})(jQuery)
