
function loadPages(sign,dom){//加载页面
	if(sign==2){
		new AJAX(showPage,"everyday.json",true)
	}
	else if(sign==3){
		new AJAX(showPage,"everyday.json",true)
	}
	else if(sign==4){
		new AJAX(showPageList,"musiclist.json",true)
	}
	else if(sign =="mymusic"){
		new AJAX(showPages,"everyday.json",true)
	}
	else {
		return;
	}
	
	function showPage(data){
		
		let res = data.res;
		//设置标题
		$(".secondPage-title").text(res.title);
		
		let nodes = `
			<img src="${res.titleimg}" width="100%" class="scdpageimg"/>
			<div>
		`
		for(let i = 0 ; i < res.songs.length ; i++){
			nodes = nodes + 
				`
				<ul class="payproduct">
					<li class="product-img">
						
						<img src="" width="100%" imgsrc="${res.songs[i].img}">
						
					</li>
					<li class="product-information">
						<p>${res.songs[i].title}</p>
						<p>${res.songs[i].actor}</p>
					</li>
				</ul>
			
			`
		}
		
		nodes = nodes + `</div>`;
		$(dom).append(nodes);
		let obj = {
			"attrName":"imgsrc",
			"attrSet":"src",
			"dom":".secondPage-box"
		}
		$.layzLoadings(obj);
	}
	
	function showPages(data){
		
		let res = data.res;
		//设置标题
		$(".secondPage-title").text(res.title);
		
		let nodes = `
		<ul class="musiclist margin-set">
					<li class="list-img colorset">
						
						<i class="fa fa-music" aria-hidden="true"></i>
						
					</li>
					
					<li class="add-p">
						
						<p>本地音乐</p>
						
					</li>
					
					<li class="add-num">
						
						28 >
						
					</li>
					
				</ul>
				
				<ul class="musiclist">
					<li class="list-img colorset">
						
						<i class="fa fa-play-circle" aria-hidden="true"></i>
						
					</li>
					
					<li class="add-p">
						
						<p>最近播放</p>
						
					</li>
					
					<li class="add-num">
						
						100 >
						
					</li>
					
				</ul>
				
				<ul class="musiclist">
					<li class="list-img colorset">
						
						<i class="fa fa-play-circle" aria-hidden="true"></i>
						
					</li>
					
					<li class="add-p">
						
						<p>我当然电台</p>
						
					</li>
					
					<li class="add-num">
						
						2 >
						
					</li>
					
				</ul>
				
				<ul class="musiclist">
					<li class="list-img colorset">
						
						<i class="fa fa-puzzle-piece" aria-hidden="true"></i>
						
					</li>
					
					<li class="add-p">
						
						<p>我的收藏</p>
						
					</li>
					
					<li class="add-num">
						
						20 >
						
					</li>
					
				</ul>
			<div style="margin-top:.5rem">
		`
		for(let i = 0 ; i < res.songs.length ; i++){
			nodes = nodes + 
				`
				<ul class="payproduct">
					<li class="product-img">
						
						<img src="" width="100%" imgsrc="${res.songs[i].img}">
						
					</li>
					<li class="product-information">
						<p>${res.songs[i].title}</p>
						<p>${res.songs[i].actor}</p>
					</li>
				</ul>
			
			`
		}
		
		nodes = nodes + `</div>`;
		$(dom).append(nodes);
		let obj = {
			"attrName":"imgsrc",
			"attrSet":"src",
			"dom":".addPages"
		}
		$.layzLoadings(obj);
	}
	
	
	function showPageList(data){
		let res = data.res;
		//设置标题
		$(".secondPage-title").text(res.title);
		console.log(res.title);
		
		let nodes = `
			<img src="${res.titleimg}" width="100%" class="scdpageimg"/>
			<div>
		`
		for(let i = 0 ; i < res.songs.length ; i++){
			nodes = nodes + 
				`
				<ul class="musiclist">
					<li class="list-img">
						${i+1}
						
					</li>
					<li class="product-information list-order">
						<p>${res.songs[i].title}</p>
						<p>${res.songs[i].actor}</p>
					</li>
					<li>
						<i class="fa fa-play-circle-o" aria-hidden="true"></i>
					</li>
				</ul>
			
			`
		}
		
		nodes = nodes + `</div>`;
		$(dom).append(nodes);
	}
}

