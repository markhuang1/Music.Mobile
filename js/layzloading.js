;
(function($){
	
	const layzLod = {
		"layzLoadings" : function (obj){
			//寻找元素
			alert(111);
			var attrName = obj.attrName;
			let doms = $('['+attrName+']');
			let ary = [];//定义空数组保存节点
			for(var i =0 ;i < doms.length ;i++){
				ary.push(doms[i]);
			}
			
			
			randerImg();
			
			//添加页面滚动事件
//			$("#main-container")[0].addEventListener('scroll', mainscroll,true);
//			
//			function mainscroll(){
//				if(ary.length==0){
//					$("#main-container").removeEventListener("scroll",mainscroll,true);
//				}
//				clearTimeout(setTime);
//				var setTime = setTimeout(function (){
//					randerImg();
//					alert(1);
//				},500);
//			}
			
			$("#main-container").bind('scroll',function (){
				if(ary.length==0){
					$("#main-container").unbind("scroll");
				}
				//函数截流
				clearTimeout(setTime);
				var setTime = setTimeout(function (){
					randerImg();
				},500);
				
			});
			
			
			function randerImg(){//渲染图片
				
				for(var i = 0 ; i < ary.length ; i++){
					if(jugeView(ary[i])){
						ary[i].style.backgroundImage = "url("+ary[i].getAttribute('bacimg')+")";
						ary.splice(i,1);
						i--;
					}
					else{
						return;
					}
				}
				
				alert(ary[0].style.backgroundImage);
				
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
