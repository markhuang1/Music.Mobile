$(function (){
			
	var obj = {
			"attrName":"bacimg",
			"attrSet":"backgroundImage",
			"dom":"#main-container"
		}
//			$.scrollImgs(obj);//图片轮播
	
	var videoReady = false;//视屏加载完毕?false
	var radioReady = false;//电台加载完毕？false
	var urls = 'img.json';
	var marks = true;
	let arys=[];
	new AJAX(randers,urls,true);
	
	
	
	var nowPage=0;//记录当前页面
	
	var makes = true;
	
	paging();
	clickDom();
	moves();//页面滑动
	
	imgscrolls();
	
	
	
	function imgscrolls(){//图片滑动
		var swiper = new Swiper('.imgscroll',{
			autoplay:2500,
			pagination : '.swiper-pagination',
			paginationClickable :true
		});
	}
	
	function moves(){
		var swiper = new Swiper('.box',{
	    	onTransitionEnd: function(swiper){
	        	  listbingevent();
	    	}
//	    	,
//			onSlideNextStart: function(swiper){
//		      	randerHtmlDom();//回掉渲染节点
//		     }
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
			domli[i].setAttribute('bacimg',data[i].url);
//			domli[i].style.backgroundImage = 'url('+data[i].url+')';
			domtext[i].innerText = data[i].text;
		}
		$('.movies').css({"background-image":"url("+moves.moves.url+")"});
		$('.mov-text').text(moves.moves.text);
		$.layzLoadings(obj);
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
		randerHtmlDom();
	}
	
	function clickDom(){
		$('.music-class li').bind('click',function (event){
			
//			var dom;
//			if(e.target.tagName.toUpperCase()!='SPAN'){
//				dom = e.target.childNodes[0];
//			}
//			else{
//				dom = e.target;
//			}
//			var index = dom.getAttribute('index');
//			nowPage = index;

			var e = event;
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
			setTimeout(function (){
					randerHtmlDom();
				},100);
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
	function randers(data){//轮播图渲染
		var data = data.res;
		var img = $('.imgset img');
		var len = img.length;
		for(var i = 0;i<len;i++){
			img[i].setAttribute('src',data[i].img);
		}
		
	}
	
	function randerHtmlDom(){//渲染节点
		
		if(nowPage == 1){
			if(videoReady){
					return;
				}
			new AJAX(randerVideos,"video.json",true);
		}
		else if(nowPage == 2){
			if(radioReady){
					return;
				}
			new AJAX(randerRadio,"audoi.json",true);
		}
		else{
			return;
		}
	}
	
	function randerVideos(data){
		$('.videos .loading-img').remove();
		var data = data.res;
		var len = data.length;
		for(var i = 0 ; i < len ; i++){
				var HtmlDom = `
					<div class="video-demo"  videoimg="${data[i].contentimg}">
										
						<div class="img-head-infomation">
							
							<div class="head-image">
								<img src="" headimg="${data[i].headimg}"/>
								<span>${data[i].title}</span>
							</div>
							
							<div class="video-class">${data[i].class}</div>
							
						</div>
										
						<div class="img-imformation">${data[i].contentText}</div>
			
					</div>
				`
//			$(HtmlDom).appendTo($('.videos'));
			$(HtmlDom).appendTo($('.videos')).offset().top;
		}
		var obj = {
			"attrName":"videoimg",
			"attrSet":"backgroundImage",
			"dom":".videos"
		}
		$.layzLoadings(obj);
		obj = {
			"attrName":"headimg",
			"attrSet":"src",
			"dom":".videos"
		}
		$.layzLoadings(obj);
		videoReady = true;
	}

	function randerRadio(data){
		
		radioReady = true;
		$('.radios .loading-img').remove();
		var scrolls = `
			<div id="scorllimgs">
				<!--轮播图-->

				<div class="swiper-container imgscrolls">

					<div class="swiper-wrapper secondscroll">
					
					</div>

					<div class="swiper-pagination"></div>

				</div>

			</div>
		`
		$('.loading-gif').before(scrolls);
		var scrollimgs = data.res;
		for(let i = 0 ; i < scrollimgs.length ; i++){
			var img = `
				<div class="swiper-slide imgset">
					<img src="${scrollimgs[i].img}" />
				</div>
			`
			$('.secondscroll').append(img);
		}
		var swiper = new Swiper('.imgscrolls',{
			autoplay:2500,
			pagination : '.swiper-pagination',
			paginationClickable :true
		});
		
		var radioClass = `
			<ul class="radio-class">
				<li>电台分类</li>
				<li>电台排行</li>
			</ul>
			<div class="music-list radiose">

				<div class="video-list-title">

					<p>${data.pay.class} ></p>

				</div>

			</div>
		`
		$('.loading-gif').before(radioClass);
		var payaduio = data.pay.arc;
		for(let i = 0; i < payaduio.length ; i++){
			var dom = `
				<ul class="payproduct">
					<li class="product-img">
						
						<img src="${payaduio[i].img}" width="100%" >
						
					</li>
					<li class="product-information">
						<p>${payaduio[i].title}</p>
						<p>${payaduio[i].discrip}</p>
						<p>${payaduio[i].actor}</p>
						<p>${payaduio[i].pay}</p>
					</li>
				</ul>
			`
			$('.radiose').append(dom);
		}
		var ojso = {
			"doms":".radios",
			"nodes":".loading-gif"
		}
		new infinteLoading(ojso,cback);
		
	}
	
	function cback(){
		if(marks){
			new AJAX(randerLoading,"audoi.json",true);
			marks = false;
		}
		else{
			randerLoading(false);
		}
	}
	
	
	function randerLoading(data){
		if(data){
			let datas = data.audios;
			let len  = datas.length;
			
			for(let i = 0;i<len;i++){
				arys.push(datas[i]);
			}
		}
		if(arys.length==0){
			return;
		}
		
		let dom = `
			<div class="music-list radioses">

				<div class="music-list-title video-title">

					<span>${arys[0].class} ></span>

				</div>
				<div class="songs-list video-list">
				<ul>
		
		`
		
		for(let i =0;i<arys[0].arc.length;i++){
			dom = dom + 

					`<li>

						<div class="radio-img" style="background-image:url(${arys[0].arc[i].img})">

						</div>

						<div class="songs-describe">
							${arys[0].arc[i].discrip}
						</div>

					</li>`			
		}
		dom = dom+`
			</ul>
			</div>
			</div>
		`
		$('.loading-gif').before(dom);
		arys.splice(0,1);
	}
	
	function paging(){//切换页面
		
		$('.pageClass>li').on("click",function (){
			$('.homePage').removeClass("backmoves").addClass("moveHomePage");
			$('.secondPage').removeClass("backmovesi").addClass("moveSecondPage");
			$(".secondPage-box").children().remove();
			new loadPages($(this).attr("index"),".secondPage-box");
		});
		
		$('.SPH li:first-child').bind("click",function(){
			$('.secondPage').removeClass("moveSecondPage").addClass("backmovesi");
			$('.homePage').removeClass("moveHomePage").addClass("backmoves");
		});
		
	}
	
	bottomNavClick();
	
	function bottomNavClick(){
		$(".bottom-nav li").bind("click",function(event){
			
			$(".bottom-nav li").css({"color":"darkgray"})
			
			let dom;
			if(event.target.tagName.toUpperCase()!="LI"){
				dom = $(event.target).parent('li');
			}
			else{
				dom = event.target;
			}
			$(dom).css({"color":"white"});
			showMyPage(dom);
		})
	}
	
	function showMyPage(nodes){
		let texts = $(nodes).attr("index");
		if(texts=="find-music"){
			$(".addPage").hide();
			$('.find-music').show();
		}
		else{
			$(".find-music").hide();
			$(".addPage").show();
			$(".addPages").children().remove();
			new loadPages("mymusic",".addPages")
		}
	}
	
	
	
	
})
