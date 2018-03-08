function AJAX(callback){
	
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest;
	}
	else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.open('GET','img.json',true);
	xhr.send(null);
	
	xhr.onreadystatechange = function (){
		if(xhr.readyState ==4 && xhr.status == 200){
			var jso = xhr.responseText;
			if(typeof jso != 'object'){
				jso = JSON.parse(jso);
			}
			callback(jso);
		}
	}
	
}
