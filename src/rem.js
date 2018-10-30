import Vue from 'vue'

;(function(designWidth, maxWidth) {
  var doc = document,
    win = window;
  var docEl = doc.documentElement;
  var tid;
  var rootItem,rootStyle;

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    if (!maxWidth) {
      maxWidth = 540;
    };
    if (width > maxWidth) {
      width = maxWidth;
    }
    //与淘宝做法不同，直接采用简单的rem换算方法1rem=100px
    var rem = width * 100 / designWidth;
    //兼容UC开始
    rootStyle="html{font-size:"+rem+'px !important}';
    rootItem = document.getElementById('rootsize') || document.createElement("style");
    if(!document.getElementById('rootsize')){
      document.getElementsByTagName("head")[0].appendChild(rootItem);
      rootItem.id='rootsize';
    }
    if(rootItem.styleSheet){
      rootItem.styleSheet.disabled||(rootItem.styleSheet.cssText=rootStyle)
    }else{
      try{rootItem.innerHTML=rootStyle}catch(f){rootItem.innerText=rootStyle}
    }
    //兼容UC结束
    docEl.style.fontSize = rem + "px";
  };
  refreshRem();

  win.addEventListener("resize", function() {
    clearTimeout(tid); //防止执行两次
    tid = setTimeout(refreshRem, 10);
  }, false);

  win.addEventListener("pageshow", function(e) {
    if (e.persisted) { // 浏览器后退的时候重新计算
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 10);
    }
  }, false);

  if (doc.readyState === "complete") {
    doc.body.style.fontSize = "16px";
  } else {
    doc.addEventListener("DOMContentLoaded", function(e) {
      doc.body.style.fontSize = "16px";
    }, false);
  }})(1080, 640);


//设置cookie
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;
//删除cookie
Vue.prototype.delCookie =(name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

