$(function (){
	var obj = {
				"urls":"img.json",
				"dom":"#scorllimg",
				"color1":"rgb(212,60,51)",
				"color2":"rgba(255,255,255,0.5)"
			}
			$.scrollImgs(obj);//图片轮播
	
	
	
	
	var nowPage=0;//记录当前页面
	
	var makes = true;
	
	clickDom();
	moves();
	
	function moves(){
		var swiper = new Swiper('.swiper-container',{
	    	onTransitionEnd: function(swiper){
	        	  listbingevent();
	    	}
		});
	}
	
	setHeight();//设置歌单列表高度
	
	AjaxResponse();//请求数据
	
	window.onresize = function (){
		setHeight();
		moves();
	}
	
	listbingevent();//点解列表跳转
	function setHeight(){
		var width = document.documentElement.clientWidth;
		if(width>850) return;
		var listHeight = (width*0.33*0.5)*3;
		$('.songs-list li').height(listHeight+"px");
		$('.songs-list').height(listHeight*2+20+"px");
		$('.back-img').height(listHeight/3*2+"px");
		$('.songs-describe').height(listHeight/3+"px");
	}
	
	function AjaxResponse(){//Ajax请求获取数据
		$.ajax({
			'type':'GET',
			'url':'songs.json',
			'dataType':'json',
			'timeout':2000
		}).done(rander).fail(function (){
			console.log('请求失败');
		})
	}
	
	function rander(data){//渲染图片
		var moves = data;
		data  =data.res;
		var domli = document.querySelectorAll('.songs-list li>.back-img');
		var domtext = document.querySelectorAll('.songs-list li>.songs-describe');
		var len = domli.length;
		for(var i = 0;i<len;i++){
			domli[i].style.backgroundImage = 'url('+data[i].url+')';
			domtext[i].innerText = data[i].text;
		}
		$('.movies').css({"background-image":"url("+moves.moves.url+")"});
		$('.mov-text').text(moves.moves.text);
	}
	
	function listbingevent(){
		
		var num = $('.swiper-wrapper').css('transform').replace(/[^0-9\-,]/g,"").split(",")[4];
		if(num<0){
			num = -num;
		}
		var width = $(window).width();
		nowPage = num/width;
		makes = true;
		$('span[index='+(nowPage+1)+']').click();
	
	}
	
	function clickDom(){
		$('.music-class li').bind('click',function (){
			
//			var dom;
//			if(e.target.tagName.toUpperCase()!='SPAN'){
//				dom = e.target.childNodes[0];
//			}
//			else{
//				dom = e.target;
//			}
//			var index = dom.getAttribute('index');
//			nowPage = index;

			var e = e||window.event;
			e.stopPropagation();
			if(!makes){
				var doms;
				if(e.target.tagName.toUpperCase()!='SPAN'){
					doms = e.target.childNodes[0];
				}
				else{
					doms = e.target;
				}
				nowPage= doms.getAttribute('index')-1;
			}
			var dom =$('span[index]');
			for(var i =1;i<=dom.length;i++){
				$('span[index='+i+']').css({"border-bottom":"0.1rem solid white"});
			};
			$('span[index='+(nowPage+1)+']').css({"border-bottom":"0.1rem solid red"});
			$('.swiper-wrapper')[0].style.cssText = 'transition-duration: 300ms;transform:translate3d('+(-nowPage)*$(window).width()+'px, 0px, 0px);';
			makes = false;
		});
	}
	
//	drag();
//	
//	function drag(){//拖动界面事件
//	
//	var jude = null;//记录鼠标位置
//	var mousedownSet = null;
//	var offsetTemp = null;
//		$('.box').mousedown(function (){
//				jude = event.pageX;
//				console.log(jude);
//				$('.box').unbind('mousemove').bind('mousemove',function (){
//					mousedownSet = event.pageX;
//					var width = $(window).width();
//					var lefts = $('.box').offset().left;
//					offsetTemp = (mousedownSet-jude+lefts)/width*100;
//					console.log(offsetTemp);
//					$('#main-container').css({"left":offsetTemp+"%"});
//				});
//		});
//		$('.box').bind('mouseup',function (){
//			$('.box').unbind("mousemove");
////			if(offsetTemp>=50){
////				
////			}
////			else{
////				
////			}
//		})
//	}
	
	
})
