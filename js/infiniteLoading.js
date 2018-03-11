function infinteLoading(obj,callback){//无限加载
	
	
	$(obj.doms).bind("scroll",function (){
		clearTimeout(timer);
		var timer = setTimeout(function (){
			loading();
		},100);
	})
	
	loading();
	
	function loading(){
		if(juge()){
			callback();
		}
	}
	
	function juge(){//判断
		var viewHeight = $(window).height();
		var scrollHeight = $(window).scrollTop();
		var offsetHeight = $(obj.nodes).offset().top;
		if(offsetHeight - scrollHeight <= viewHeight){
			return true;
		}
		else{
			return false;
		}
	}
	
	
	
	
}
