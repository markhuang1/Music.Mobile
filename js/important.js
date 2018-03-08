
	fontSize();//执行设置字体大小
	
	function fontSize(){//自动计算字体大小
		;(function (doc, win, undefined) {//rem动态计算代码 于https://www.cnblogs.com/tangshiwei/p/5959998.html复制
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in win? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (clientWidth === undefined) return;
              if($(win).width()>852) {
              	docEl.style.fontSize = 53.1875+'px';
              	return;
              };
              docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
            };
          if (doc.addEventListener === undefined) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false)
        })(document, window);
	}